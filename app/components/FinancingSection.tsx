"use client";
import { useState } from "react";
import { formatNumber } from "../lib/utils";
import { withUtm } from "../lib/utm";

export default function FinancingSection() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate] = useState(8.5); // Tasa de interés aproximada

  // Calcular cuota mensual usando fórmula de amortización
  const monthlyPayment = loanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, loanTerm * 12) / (Math.pow(1 + interestRate / 100 / 12, loanTerm * 12) - 1);

  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <section id="financiamiento" className="py-16 lg:py-24 bg-gradient-to-br from-accent-light via-white to-sand">
      <div className="container-page">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-accent text-white text-sm font-medium rounded-full mb-4">
            💰 Financiamiento
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Haz realidad tu sueño con nuestro financiamiento
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Te ayudamos a financiar tu departamento con las mejores condiciones del mercado.
            Aprobación rápida y cuotas que se adaptan a tu presupuesto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Calculadora de financiamiento */}
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Calculadora de Crédito Hipotecario
            </h3>

            <div className="space-y-6">
              {/* Monto del préstamo */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Monto del préstamo: <span className="font-bold text-accent">S/ {formatNumber(loanAmount)}</span>
                </label>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>S/ 50,000</span>
                  <span>S/ 1,000,000</span>
                </div>
              </div>

              {/* Plazo */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Plazo: <span className="font-bold text-accent">{loanTerm} años</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-secondary mt-1">
                  <span>5 años</span>
                  <span>30 años</span>
                </div>
              </div>

              {/* Resultados */}
              <div className="bg-accent-light p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent">
                      S/ {formatNumber(monthlyPayment)}
                    </div>
                    <div className="text-sm text-secondary">Cuota mensual</div>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-sand rounded-lg">
              <p className="text-xs text-secondary text-center">
                * Cálculo aproximado con tasa de interés del {interestRate}%. Los valores reales pueden variar según evaluación crediticia.
              </p>
            </div>
          </div>

          {/* Common Areas List and Images - Page 7 PDF */}
          <div className="lg:col-span-2 mt-12">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-neutral-100">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-6">Amenidades Exclusivas</h3>
                  <p className="text-secondary mb-8">Disfruta de áreas sociales diseñadas para brindar comodidad, modernidad, confort y recreación en un solo lugar.</p>
                  <ul className="space-y-4">
                    {[
                      "ZONA PET FRIENDLY",
                      "GIMNASIO EQUIPADO",
                      "TERRAZA SOCIAL & BBQ",
                      "ESTACIONAMIENTO",
                      "ZONAS DE PARRILLAS",
                      "SSHH",
                      "ZONA DE TENDALES",
                      "LAVANDERIA"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-secondary font-bold text-sm tracking-widest">
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                    <img src="/building/common-areas.png" alt="Amenidades" className="object-cover w-full h-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-40 rounded-2xl overflow-hidden shadow-md">
                      <img src="/building/build1-1.png" alt="Amenidad 1" className="object-cover w-full h-full" />
                    </div>
                    <div className="relative h-40 rounded-2xl overflow-hidden shadow-md">
                      <img src="/building/build1-2.png" alt="Amenidad 2" className="object-cover w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-soft max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              ¿Quieres conocer tu capacidad de crédito?
            </h3>
            <p className="text-secondary mb-6">
              Nuestros asesores financieros te ayudarán a determinar cuánto puedes financiar
              y cuál es la mejor opción para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={withUtm("#contacto")}
                className="btn-primary text-lg px-8 py-4"
              >
                Solicitar asesoría financiera
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+51964247545"
                className="btn-secondary text-lg px-8 py-4"
              >
                Llamar ahora: +51 964 247 545
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
