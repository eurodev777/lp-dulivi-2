import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Store,
  Mail,
  Lock,
  Phone,
  CreditCard,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Loader2,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  MessageCircle,
  Menu,
  X,
  Plus,
  Compass,
  FileSpreadsheet,
  FileText,
  Clock,
} from "lucide-react";

import SvgLogo from "./svg/SvgLogo";

import { StorePreview } from "./components/StorePreview";
import { ContactForm } from "./components/ContactForm";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { AboutUs } from "./components/AboutUs";
import { Blog } from "./components/Blog";
import { FormData, ToastMessage } from "./types";

export default function App() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    name: "Dulivi Burger",
    accentColor: "dulivi",
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSuccessModal, setActiveSuccessModal] = useState<string | null>(
    null,
  );

  // Toast adder
  const addToast = (
    title: string,
    description: string,
    variant: "default" | "destructive" | "success" = "default",
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleSuccess = (storeName: string) => {
    setActiveSuccessModal(storeName);
  };

  // Smooth scroll handler
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* GLOBAL HEADER HEADER */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-1.5 min-w-[210px]">
            <SvgLogo width={28} height={28} />
            <h3 className="text-3xl font-bold text-primary mb-1">Dulivi</h3>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, "hero")}
              className="hover:text-slate-900 transition-colors"
            >
              Início
            </a>
            <a
              href="#features"
              onClick={(e) => handleScrollTo(e, "features")}
              className="hover:text-slate-900 transition-colors"
            >
              Funcionalidades
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScrollTo(e, "pricing")}
              className="hover:text-slate-900 transition-colors"
            >
              Planos
            </a>
            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, "about")}
              className="hover:text-slate-900 transition-colors"
            >
              Sobre nós
            </a>
            <a
              href="#blog"
              onClick={(e) => handleScrollTo(e, "blog")}
              className="hover:text-slate-900 transition-colors"
            >
              Blog
            </a>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://painel.dulivi.com.br"
              target="_blank"
              onClick={(e) => handleScrollTo(e, "contact-form-section")}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              Fazer login
            </a>
            <a
              href="#contact-form-section"
              onClick={(e) => handleScrollTo(e, "contact-form-section")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Criar cardápio grátis</span>
              <span className="bg-blue-500 text-white text-[9px] px-1 rounded-sm">
                15 dias
              </span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 absolute top-16 left-0 right-0 z-40 shadow-xl"
          >
            <nav className="flex flex-col gap-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
              <a
                href="#hero"
                onClick={(e) => handleScrollTo(e, "hero")}
                className="hover:text-slate-950"
              >
                Início
              </a>
              <a
                href="#features"
                onClick={(e) => handleScrollTo(e, "features")}
                className="hover:text-slate-950"
              >
                Funcionalidades
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleScrollTo(e, "pricing")}
                className="hover:text-slate-950"
              >
                Planos
              </a>
              <a
                href="#about"
                onClick={(e) => handleScrollTo(e, "about")}
                className="hover:text-slate-950"
              >
                Sobre nós
              </a>
              <a
                href="#blog"
                onClick={(e) => handleScrollTo(e, "blog")}
                className="hover:text-slate-950"
              >
                Blog
              </a>
            </nav>
            <div className="h-px bg-slate-100 my-4" />
            <div className="flex flex-col gap-3">
              <a
                href="#contact-form-section"
                onClick={(e) => handleScrollTo(e, "contact-form-section")}
                className="text-center py-2 text-sm font-bold text-slate-600 hover:text-slate-900"
              >
                Fazer login
              </a>
              <a
                href="#contact-form-section"
                onClick={(e) => handleScrollTo(e, "contact-form-section")}
                className="bg-blue-600 text-white text-center py-3 text-sm font-bold rounded-xl shadow-md"
              >
                Criar cardápio grátis (15 dias)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION CONTAINER */}
      <section
        id="hero"
        className="relative py-12 md:py-24 bg-radial-at-t from-blue-50/70 via-white to-white overflow-hidden"
      >
        {/* Background visual detail */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
              <Sparkles size={12} className="animate-pulse" />
              <span>Plataforma Delivery 2.0</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">
              Crie <span className="text-blue-600">grátis</span> seu Cardápio
              Digital para Delivery
            </h1>

            <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-xl font-medium">
              Pedidos formatados direto no WhatsApp com atendente virtual
              integrado por inteligência artificial. Crie o seu canal de vendas
              sem taxas abusivas e com link próprio.
            </p>

            {/* Checklist of strong features */}
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5 text-xs md:text-sm text-slate-700 font-bold">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-[10px]">
                  ✓
                </span>
                <span>Atendimento humanizado no WhatsApp com IA</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs md:text-sm text-slate-700 font-bold">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-[10px]">
                  ✓
                </span>
                <span>Canal de vendas próprio sem taxas de marketplace</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs md:text-sm text-slate-700 font-bold">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-[10px]">
                  ✓
                </span>
                <span>
                  Atraia mais clientes locais com anúncios simplificados
                </span>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#contact-form-section"
                onClick={(e) => handleScrollTo(e, "contact-form-section")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold h-12 px-8 rounded-xl shadow-lg shadow-blue-600/15 hover:shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Criar cardápio grátis</span>
                <Send size={14} />
              </a>
              <a
                href="https://menu.dulivi.com.br/dulivi-burger"
                target="_blank"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold h-12 px-8 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <span>Ver demonstração</span>
              </a>
            </div>
          </div>

          {/* Hero Right Visual Column (Interactive Device) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <StorePreview formData={formData} />
          </div>
        </div>
      </section>

      {/* TRUST BENEFITS ROW */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100/80 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold select-none">
                <DollarSign />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs">
                  15 dias grátis
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  Instalação gratuita sem custos iniciais.
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100/80 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold select-none">
                <FileText />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs">
                  Sem multa rescisória
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  Cancele quando quiser, sem enrolação.
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100/80 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold select-none">
                <Clock />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs">
                  Suporte 24/7 WhatsApp
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  Prontos para te atender a qualquer hora.
                </p>
              </div>
            </div>

            <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100/80 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-xl font-bold select-none">
                <Sparkles />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs">
                  Ativação em minutos
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  Seu menu online pronto na mesma hora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS BLOCK */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Background gradient layout */}
        <div className="absolute inset-0 bg-radial-at-b from-blue-600/20 via-slate-950 to-slate-950 opacity-90" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Dulivi em Números
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-black mt-4 tracking-tight max-w-2xl mx-auto">
            Resultados extraordinários alcançados pelos nossos clientes
          </h2>

          <p className="text-slate-400 mt-3 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Nossos parceiros reduzem o tempo operacional e conquistam
            independência dos grandes marketplaces locais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16 max-w-4xl mx-auto">
            <div className="bg-slate-950/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl space-y-1.5">
              <span className="text-4xl md:text-5xl font-display font-black text-blue-400 block font-mono">
                +120M
              </span>
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Faturados por parceiros
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Volume transacionado dentro da nossa plataforma própria.
              </p>
            </div>

            <div className="bg-slate-950/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl space-y-1.5">
              <span className="text-4xl md:text-5xl font-display font-black text-blue-400 block font-mono">
                +1.000
              </span>
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Restaurantes Ativos
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Parceiros vendendo todos os dias em todo o Brasil.
              </p>
            </div>

            <div className="bg-slate-950/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl space-y-1.5">
              <span className="text-4xl md:text-5xl font-display font-black text-blue-400 block font-mono">
                +2M
              </span>
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Pedidos Processados
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Comunicação inteligente e rápida via WhatsApp e CRM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEATURES MODULE */}
      <Features />

      {/* INTERACTIVE PRICING MODULE */}
      <Pricing />

      {/* ABOUT US STORY MODULE */}
      <AboutUs />

      {/* INTERACTIVE BLOG / ARTICLES MODULE */}
      <Blog />

      {/* SANDBOX SETUP FORM SECTION */}
      <section
        id="contact-form-section"
        className="py-20 bg-slate-50 border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Split Left - The interactive contact form */}
            <div className="lg:col-span-7">
              <ContactForm
                onFormChange={handleFormChange}
                onSuccess={handleSuccess}
                addToast={addToast}
              />
            </div>

            {/* Split Right - Live mobile preview which synchronizes changes */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <div className="space-y-3 max-w-sm">
                <h3 className="text-xl font-display font-black text-slate-900 tracking-tight leading-tight">
                  Seu Cardápio Ganha Vida na Hora!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Conforme você preenche o formulário ao lado o mockup ao lado
                  demonstra fielmente o design moderno que seus clientes vão
                  experimentar.
                </p>
                <div className="h-px bg-slate-200/60 my-2" />
                <div className="flex gap-2 text-[10px] font-bold text-slate-400">
                  <span className="bg-white border border-slate-200 p-1 rounded-sm">
                    ✓ Domínio Dulivi Grátis
                  </span>
                  <span className="bg-white border border-slate-200 p-1 rounded-sm">
                    ✓ Hospedagem Inclusa
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <StorePreview formData={formData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL WHY DULIVI CARD GRID */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="bg-blue-50 text-blue-700 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Segurança & Estrutura
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight">
            Por que milhares escolhem a Dulivi?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                  🌐
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base">
                  Hospedagem inclusa
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sua marca em um endereço profissional Dulivi sem pagar por
                  servidores adicionais. Velocidade total com CDN integrada para
                  não perder vendas.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
                  💬
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base">
                  WhatsApp Automatizado
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Os pedidos dos clientes chegam formatados e prontos
                  diretamente no seu número de suporte. Sem atrito operacional
                  ou perda de informações.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
                  📈
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base">
                  Aumento de Vendas em 40%
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Clientes compram mais através de menus modernos, otimizados
                  com categorizações e sugestões inteligentes de adicionais
                  automáticos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Left Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="/" className="flex items-center gap-1.5 min-w-[210px]">
              <SvgLogo width={28} height={28} />
              <h3 className="text-3xl font-bold text-primary mb-1">Dulivi</h3>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-semibold">
              Cardápio Digital para Delivery - Sistema completo que revoluciona
              a gestão do seu restaurante. Mais vendas, menos operacional, mais
              tempo livre para você.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/5513999999999"
                target="_blank"
                rel="referrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                <MessageCircle size={15} />
                <span>Fale conosco via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-black uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo(e, "about")}
                  className="hover:text-white transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleScrollTo(e, "features")}
                  className="hover:text-white transition-colors"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => handleScrollTo(e, "blog")}
                  className="hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact-form-section"
                  onClick={(e) => handleScrollTo(e, "contact-form-section")}
                  className="hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Fale Conosco Right Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white text-xs font-black uppercase tracking-wider">
              Fale com a gente
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2.5">
                <span className="text-lg">📧</span>
                <span className="font-semibold">contato@dulivi.com.br</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-lg">📍</span>
                <span className="font-semibold">Santos, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-bold">
          <p>© 2026 Dulivi. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING SUCCESS MODAL OVERLAY */}
      <AnimatePresence>
        {activeSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border border-slate-100 p-8 text-center max-w-sm w-full space-y-6 shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                🎉
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-display font-black text-slate-900 leading-tight">
                  Parabéns!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  O cardápio digital para o estabelecimento{" "}
                  <b className="text-slate-800">{activeSuccessModal}</b> foi
                  criado e está em processo de provisionamento na nuvem!
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left text-xs text-slate-600 space-y-1.5 leading-relaxed font-mono">
                <p className="text-blue-600 font-bold font-sans uppercase text-[10px]">
                  Próximas etapas:
                </p>
                <p>1. Verifique seu e-mail comercial</p>
                <p>2. Acesse seu painel administrativo</p>
                <p>3. Ative seu robô inteligente no WhatsApp</p>
              </div>

              <button
                onClick={() => setActiveSuccessModal(null)}
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                Entrar no Gerenciador
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TOAST NOTIFICATION STACK */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4 rounded-2xl shadow-xl border flex gap-3.5 items-start backdrop-blur-md ${
                toast.variant === "destructive"
                  ? "bg-rose-50/95 border-rose-100 text-rose-900"
                  : toast.variant === "success"
                    ? "bg-emerald-50/95 border-emerald-100 text-emerald-900"
                    : "bg-white/95 border-slate-100 text-slate-800"
              }`}
            >
              {toast.variant === "success" ? (
                <span className="text-lg">✅</span>
              ) : toast.variant === "destructive" ? (
                <span className="text-lg">❌</span>
              ) : (
                <span className="text-lg">ℹ️</span>
              )}

              <div className="flex-1 space-y-0.5">
                <h4 className="font-extrabold text-xs">{toast.title}</h4>
                <p className="text-[10px] opacity-90 leading-relaxed font-semibold">
                  {toast.description}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
