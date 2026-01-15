"use client";
import { useState } from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { formatNumber } from "../lib/utils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function FinanciamientoPage() {
    // Calculator state
    const [propertyPrice, setPropertyPrice] = useState(350000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTerm, setLoanTerm] = useState(20);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Calculations
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;

    // French amortization formula (cuota francesa)
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - loanAmount;

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-br from-accent-light via-white to-sand">
                <div className="container-page">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-2 bg-accent text-white text-sm font-medium rounded-full mb-4">
                            💰 Financiamiento
                        </span>
                        <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
                            Calcula tu Crédito Hipotecario
                        </h1>
                        <p className="text-secondary text-lg">
                            Utiliza nuestra calculadora para estimar tu cuota mensual y conoce las opciones de financiamiento disponibles para tu nuevo hogar.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 lg:py-24 bg-white">
                <div className="container-page">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Calculator */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card p-6 lg:p-8"
                        >
                            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                                Calculadora de Crédito Hipotecario
                            </h2>

                            <div className="space-y-6">
                                {/* Property Price */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Precio del inmueble: <span className="font-bold text-accent">S/ {formatNumber(propertyPrice)}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="150000"
                                        max="1200000"
                                        step="10000"
                                        value={propertyPrice}
                                        onChange={(e) => setPropertyPrice(Number(e.target.value))}
                                        className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-xs text-secondary mt-1">
                                        <span>S/ 150,000</span>
                                        <span>S/ 1,200,000</span>
                                    </div>
                                </div>

                                {/* Down Payment */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Cuota inicial: <span className="font-bold text-accent">{downPaymentPercent}% (S/ {formatNumber(downPayment)})</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="50"
                                        step="5"
                                        value={downPaymentPercent}
                                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                        className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-xs text-secondary mt-1">
                                        <span>10%</span>
                                        <span>50%</span>
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">
                                        Tasa de interés anual: <span className="font-bold text-accent">{interestRate}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="15"
                                        step="0.5"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between text-xs text-secondary mt-1">
                                        <span>5%</span>
                                        <span>15%</span>
                                    </div>
                                </div>

                                {/* Loan Term */}
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

                                {/* Results */}
                                <div className="bg-gradient-to-r from-accent to-accent/80 p-6 rounded-xl text-white">
                                    <div className="text-center mb-4">
                                        <div className="text-sm opacity-90 mb-1">Tu cuota mensual sería</div>
                                        <div className="text-4xl font-bold">
                                            S/ {formatNumber(monthlyPayment)}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                                        <div className="text-center">
                                            <div className="text-xl font-bold">
                                                S/ {formatNumber(loanAmount)}
                                            </div>
                                            <div className="text-sm opacity-90">Monto a financiar</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl font-bold">
                                                S/ {formatNumber(totalInterest)}
                                            </div>
                                            <div className="text-sm opacity-90">Interés total</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-sand rounded-lg">
                                    <p className="text-xs text-secondary text-center">
                                        * Este cálculo es referencial utilizando el sistema de cuota francesa.
                                        Los valores reales pueden variar según la evaluación crediticia del banco.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="card p-6 lg:p-8">
                                <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                                    Solicita Asesoría Financiera
                                </h2>

                                {submitSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-primary mb-2">¡Mensaje enviado!</h3>
                                        <p className="text-secondary mb-4">
                                            Nuestro equipo se pondrá en contacto contigo pronto.
                                        </p>
                                        <button
                                            onClick={() => setSubmitSuccess(false)}
                                            className="btn-secondary"
                                        >
                                            Enviar otro mensaje
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                                                placeholder="tu@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors"
                                                placeholder="+51 999 999 999"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                                                Mensaje (opcional)
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleFormChange}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors resize-none"
                                                placeholder="¿Tienes alguna pregunta específica?"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-primary w-full justify-center text-lg py-4"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    Solicitar asesoría
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Benefits */}
                            <div className="space-y-4">
                                {[
                                    { icon: "✓", title: "Aprobación rápida", desc: "Respuesta en menos de 48 horas" },
                                    { icon: "✓", title: "Mejores tasas", desc: "Trabajamos con los principales bancos" },
                                    { icon: "✓", title: "Sin costos ocultos", desc: "Total transparencia en el proceso" },
                                    { icon: "✓", title: "Asesoría personalizada", desc: "Te acompañamos en todo momento" },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                                        className="flex items-start gap-4 p-4 bg-accent-light rounded-lg"
                                    >
                                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary">{item.title}</h4>
                                            <p className="text-sm text-secondary">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Contact Info Block */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-sand/30 rounded-xl p-6 space-y-4"
                            >
                                <h3 className="font-bold text-primary mb-4">Información de Contacto</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-accent shadow-sm">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary font-medium">Llámanos</p>
                                        <a href="tel:+51964247545" className="text-primary font-bold hover:text-accent transition-colors">+51 964 247 545</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-accent shadow-sm">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary font-medium">Escríbenos</p>
                                        <a href="mailto:gerencia@inmobiliariafabre.com" className="text-primary font-bold hover:text-accent transition-colors">gerencia@inmobiliariafabre.com</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-accent shadow-sm">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary font-medium">Horario</p>
                                        <p className="text-primary font-bold">Lun - Dom: 9am - 7pm</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
