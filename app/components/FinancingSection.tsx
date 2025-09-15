"use client";
import { useState } from "react";

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
                  Monto del préstamo: <span className="font-bold text-accent">S/ {loanAmount.toLocaleString()}</span>
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
                      S/ {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-secondary">Cuota mensual</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">
                      S/ {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-secondary">Interés total</div>
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

          {/* Beneficios del financiamiento */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Aprobación exprés</h4>
                  <p className="text-secondary text-sm">Respuesta en menos de 48 horas con nuestro proceso simplificado.</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Mejores tasas del mercado</h4>
                  <p className="text-secondary text-sm">Negociamos directamente con bancos para obtener las mejores condiciones.</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Sin costos ocultos</h4>
                  <p className="text-secondary text-sm">Transparencia total: todos los costos incluidos en la cuota mensual.</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Asesoría personalizada</h4>
                  <p className="text-secondary text-sm">Te acompañamos en todo el proceso hasta obtener tu llave.</p>
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
                href="#contacto"
                className="btn-primary text-lg px-8 py-4"
              >
                Solicitar asesoría financiera
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+51978724704"
                className="btn-secondary text-lg px-8 py-4"
              >
                Llamar ahora: +51 978 724 604
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
