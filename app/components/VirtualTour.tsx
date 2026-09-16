"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Compass, Maximize2, Minimize2, Minus, Move, Plus } from "lucide-react";
import type { Viewer } from "@photo-sphere-viewer/core";
import type { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import type { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";

const ROOMS = [
  { id: "sala", name: "Sala" },
  { id: "dorm1", name: "Dormitorio 1" },
  { id: "dorm2", name: "Dormitorio 2" },
] as const;

type RoomId = (typeof ROOMS)[number]["id"];

const ROOM_NAME: Record<string, string> = {
  sala: "Sala",
  dorm1: "Dormitorio 1",
  dorm2: "Dormitorio 2",
};

export default function VirtualTour({ subtitle }: { subtitle?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const tourRef = useRef<VirtualTourPlugin | null>(null);
  const gyroRef = useRef<GyroscopePlugin | null>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [currentNode, setCurrentNode] = useState<RoomId>("sala");
  const [hint, setHint] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [gyroOn, setGyroOn] = useState(false);
  const [gyroAvailable, setGyroAvailable] = useState(false);

  const hintRef = useRef(true);
  const dismissHint = useCallback(() => {
    if (!hintRef.current) return;
    hintRef.current = false;
    setHint(false);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let viewer: Viewer | null = null;

    const start = async () => {
      const [{ Viewer: PSV }, { VirtualTourPlugin: Tour }, { GyroscopePlugin: Gyro }] =
        await Promise.all([
          import("@photo-sphere-viewer/core"),
          import("@photo-sphere-viewer/virtual-tour-plugin"),
          import("@photo-sphere-viewer/gyroscope-plugin"),
        ]);
      if (cancelled || !containerRef.current) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      viewer = new PSV({
        container: containerRef.current,
        navbar: false,
        loadingTxt: "Cargando tour...",
        defaultZoomLvl: 35,
        minFov: 40,
        maxFov: 90,
        defaultYaw: "100deg",
        defaultPitch: "-8deg",
        moveSpeed: 1.15,
        mousewheel: true,
        mousemove: true,
        touchmoveTwoFingers: false,
        canvasBackground: "#1a1a1a",
        keyboard: "always",
        lang: {
          loadError: "No se pudo cargar el tour virtual.",
        },
        plugins: [
          [Gyro, { touchmove: true, moveMode: "smooth" }],
          Tour.withConfig({
            renderMode: "3d",
            positionMode: "manual",
            startNodeId: "sala",
            preload: true,
            showLinkTooltip: true,
            transitionOptions: {
              showLoader: false,
              speed: reduceMotion ? 0 : "20rpm",
              effect: reduceMotion ? "none" : "fade",
              rotation: !reduceMotion,
            },
            arrowStyle: {
              size: { width: 90, height: 90 },
            },
            getLinkTooltip: (_content, link) =>
              `<strong>${ROOM_NAME[link.nodeId] ?? ""}</strong>`,
            nodes: [
              {
                id: "sala",
                name: "Sala",
                caption: "Sala",
                panorama: "/lumen/tour/t1-360-sala.jpg",
                links: [
                  { nodeId: "dorm1", position: { yaw: "118deg", pitch: "-22deg" } },
                  { nodeId: "dorm2", position: { yaw: "132deg", pitch: "-22deg" } },
                ],
              },
              {
                id: "dorm1",
                name: "Dormitorio 1",
                caption: "Dormitorio 1",
                panorama: "/lumen/tour/t1-360-dorm-1.jpg",
                links: [
                  { nodeId: "sala", position: { yaw: "108deg", pitch: "-16deg" } },
                ],
              },
              {
                id: "dorm2",
                name: "Dormitorio 2",
                caption: "Dormitorio 2",
                panorama: "/lumen/tour/t1-360-dorm-2.jpg",
                links: [
                  { nodeId: "sala", position: { yaw: "-22deg", pitch: "-20deg" } },
                ],
              },
            ],
          }),
        ],
      });

      const tour = viewer.getPlugin<VirtualTourPlugin>(Tour);
      const gyro = viewer.getPlugin<GyroscopePlugin>(Gyro);

      viewerRef.current = viewer;
      tourRef.current = tour;
      gyroRef.current = gyro;

      viewer.addEventListener("ready", () => {
        if (!cancelled) setReady(true);
      });
      viewer.addEventListener("click", dismissHint);
      viewer.addEventListener("position-updated", dismissHint);
      viewer.addEventListener("panorama-error", () => {
        if (!cancelled) setError(true);
      });

      tour.addEventListener("node-changed", ({ node }) => {
        if (cancelled) return;
        if (node.id === "sala" || node.id === "dorm1" || node.id === "dorm2") {
          setCurrentNode(node.id);
        }
      });

      const supported = await gyro.isSupported();
      if (!cancelled) setGyroAvailable(supported);
    };

    start().catch(() => {
      if (!cancelled) setError(true);
    });

    return () => {
      cancelled = true;
      viewer?.destroy();
      viewerRef.current = null;
      tourRef.current = null;
      gyroRef.current = null;
    };
  }, [dismissHint]);

  useEffect(() => {
    const onFs = () => {
      const active = document.fullscreenElement === wrapperRef.current;
      setFullscreen(active);
      viewerRef.current?.needsUpdate();
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const goToRoom = (id: RoomId) => {
    dismissHint();
    setCurrentNode(id);
    void tourRef.current?.setCurrentNode(id);
  };

  const toggleFullscreen = async () => {
    const el = wrapperRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await el.requestFullscreen();
    }
  };

  const toggleGyro = async () => {
    const gyro = gyroRef.current;
    if (!gyro) return;
    try {
      await gyro.toggle();
      setGyroOn(gyro.isEnabled());
    } catch {
      setGyroOn(false);
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={wrapperRef}
        className={`virtual-tour relative overflow-hidden bg-[#1a1a1a] ${
          fullscreen ? "rounded-none" : "rounded-2xl"
        }`}
      >
        <div
          ref={containerRef}
          className={`w-full ${fullscreen ? "h-[100dvh]" : "h-[min(70vh,560px)] min-h-[380px]"}`}
        />

        {!ready && !error && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a1a] text-white/70 text-sm">
            Cargando tour virtual...
          </div>
        )}

        {error && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a1a] px-6 text-center text-white/80 text-sm">
            No se pudo cargar el tour. Recarga la página e inténtalo de nuevo.
          </div>
        )}

        {ready && !error && (
          <>
            <div className="absolute top-3 left-3 right-3 z-20 flex items-start justify-between gap-3 pointer-events-none">
              <div className="flex flex-wrap gap-1.5 pointer-events-auto">
                {ROOMS.map((room) => {
                  const active = currentNode === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => goToRoom(room.id)}
                      className={`min-h-11 px-3.5 rounded-full text-sm font-semibold transition-colors ${
                        active
                          ? "bg-accent text-white"
                          : "bg-black/45 text-white border border-white/20 hover:bg-black/60"
                      }`}
                    >
                      {room.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-1.5 pointer-events-auto">
                <button
                  type="button"
                  aria-label="Alejar"
                  onClick={() => viewerRef.current?.zoomOut(10)}
                  className="h-11 w-11 rounded-full bg-black/45 text-white border border-white/20 hover:bg-black/60 flex items-center justify-center"
                >
                  <Minus size={18} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  aria-label="Acercar"
                  onClick={() => viewerRef.current?.zoomIn(10)}
                  className="h-11 w-11 rounded-full bg-black/45 text-white border border-white/20 hover:bg-black/60 flex items-center justify-center"
                >
                  <Plus size={18} strokeWidth={2} />
                </button>
                {gyroAvailable && (
                  <button
                    type="button"
                    aria-label="Giroscopio"
                    aria-pressed={gyroOn}
                    onClick={() => void toggleGyro()}
                    className={`h-11 w-11 rounded-full border flex items-center justify-center ${
                      gyroOn
                        ? "bg-accent text-white border-accent"
                        : "bg-black/45 text-white border-white/20 hover:bg-black/60"
                    }`}
                  >
                    <Compass size={18} strokeWidth={2} />
                  </button>
                )}
                <button
                  type="button"
                  aria-label={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                  onClick={() => void toggleFullscreen()}
                  className="h-11 w-11 rounded-full bg-black/45 text-white border border-white/20 hover:bg-black/60 flex items-center justify-center"
                >
                  {fullscreen ? <Minimize2 size={18} strokeWidth={2} /> : <Maximize2 size={18} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {hint && (
              <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-4 pointer-events-none">
                <p className="inline-flex items-center gap-2 rounded-full bg-black/55 text-white text-sm font-medium px-4 py-2.5 border border-white/15">
                  <Move size={16} strokeWidth={2} />
                  Arrastra para mirar · Toca las flechas del piso para entrar
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <p className="text-xs text-secondary leading-relaxed">
        {subtitle ? `${subtitle}. ` : null}
        Recorre el departamento piloto en 360°. Arrastra para mirar a tu alrededor y haz clic en las flechas del piso para pasar de la sala a los dormitorios.
      </p>
    </div>
  );
}
