import React, { useState } from "react";
import {
  Check,
  Info,
  Calculator,
  ShieldCheck,
  Percent,
  HelpCircle,
} from "lucide-react";

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  // Calculator states
  const [ticketSize, setTicketSize] = useState<number>(45);
  const [ordersPerMonth, setOrdersPerMonth] = useState<number>(300);
  const [marketplaceCommission, setMarketplaceCommission] =
    useState<number>(15); // IFood typically takes 12-23%

  const discountFactor = 0.8; // 20% discount for annual

  const plans = [
    {
      id: "start",
      name: "Start",
      tagline: "Pequenas lojas",
      priceMonthly: 75,
      popular: false,
      features: [
        "Cardápio digital",
        "Robô com IA para Whatsapp",
        "CRM (gerenciamento de pedidos)",
        "Pagamento Online (Rápido e Seguro)",
        "Sem limite de pedidos",
        "Suporte todos os dias, inclusive feriados e fds",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "Lojas com delivery e automações",
      priceMonthly: 139.9,
      popular: true,
      features: [
        "Tudo do plano anterior",
        "Relatórios de vendas",
        "Cupons de desconto",
        "Disparo de mensagens",
        "Taxas de entrega por bairro",
        "Agendamento de Pedidos",
      ],
    },
    {
      id: "turbo",
      name: "Turbo",
      tagline: "Restaurantes maiores com anúncios",
      priceMonthly: 249.9,
      popular: false,
      features: [
        "Tudo do plano anterior",
        "Notas fiscais (NFC-e)",
        "Anúncios no FB, IG e Google (Créditos à parte)",
        "Programa de fidelidade",
        "Cashback",
        "Recuperador de Vendas",
      ],
    },
  ];

  // Calculator calculations
  const monthlyRevenue = ticketSize * ordersPerMonth;
  const marketplaceFees = monthlyRevenue * (marketplaceCommission / 100);

  // Dulivi flat fee in comparison
  const duliviFee = billingCycle === "monthly" ? 139.9 : 139.9 * discountFactor;
  const monthlySavings = Math.max(0, marketplaceFees - duliviFee);
  const annualSavings = monthlySavings * 12;

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-blue-50 text-blue-700 text-sm px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Preços Claros
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight">
            Escolha o plano ideal para o seu negócio
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base leading-relaxed">
            Planos flexíveis sem multas de cancelamento que crescem junto com o
            seu delivery.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-100 border border-slate-200/60 p-1 rounded-full mt-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>Anual</span>
              <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase leading-none">
                -20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {plans.map((plan) => {
            const currentPrice =
              billingCycle === "monthly"
                ? plan.priceMonthly
                : plan.priceMonthly * discountFactor;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl border p-6 md:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? "bg-white border-blue-500 shadow-xl ring-4 ring-blue-50/70 scale-102 z-10"
                    : "bg-slate-50/50 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black tracking-widest px-4 py-1 rounded-full uppercase shadow-md animate-pulse">
                    Mais Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-display font-black text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 leading-normal">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-slate-500">
                        R$
                      </span>
                      <span className="text-4xl font-display font-black text-slate-900 font-mono tracking-tight">
                        {currentPrice.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-sm font-bold text-slate-400">
                        /mês
                      </span>
                    </div>
                    {billingCycle === "annual" && (
                      <span className="text-[10px] font-semibold text-emerald-600 block mt-1">
                        Equivalente a R${" "}
                        {(plan.priceMonthly * 12 * discountFactor)
                          .toFixed(2)
                          .replace(".", ",")}{" "}
                        por ano
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-200/60 my-6" />

                  {/* Features Checklist */}
                  <ul className="space-y-3">
                    {plan.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-slate-700 font-medium leading-relaxed"
                      >
                        <Check
                          size={14}
                          className="text-blue-600 flex-shrink-0 mt-0.5"
                          strokeWidth={3}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to action button */}
                <div className="mt-8">
                  <a
                    href="#contact-form-section"
                    className={`w-full py-3 px-4 rounded-xl sm:text-base text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 hover:shadow-lg"
                        : "bg-slate-900 hover:bg-slate-800 text-white hover:shadow-md"
                    }`}
                  >
                    <span>Começar delivery grátis</span>
                  </a>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    15 dias de teste grátis • Sem fidelidade
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMMISSION CALCULATOR BENTO BLOCK */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 md:p-10 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          {/* Neon Glow accents */}
          <div className="absolute -left-16 -top-16 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Calculator Inputs Left */}
          <div className="lg:col-span-5 space-y-5 relative">
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-wider">
              <Calculator size={11} />
              <span>Simulador de Economia</span>
            </div>

            <h3 className="text-xl md:text-2xl font-display font-black leading-tight tracking-tight">
              Quanto você deixa de pagar em taxas de marketplace?
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              Diferente de iFood e Rappi, a Dulivi cobra apenas uma{" "}
              <b>mensalidade fixa</b>. Simule seus ganhos abaixo e veja o lucro
              retornar para o seu caixa.
            </p>

            {/* Range inputs with labels */}
            <div className="space-y-4 pt-3">
              {/* Range 1: Ticket size */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-300">
                    Ticket Médio por Pedido
                  </span>
                  <span className="font-mono text-blue-400 font-extrabold">
                    R$ {ticketSize}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="150"
                  value={ticketSize}
                  onChange={(e) => setTicketSize(Number(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-800 h-1 rounded-full cursor-pointer"
                />
              </div>

              {/* Range 2: Orders per month */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-300">
                    Pedidos Concluídos por Mês
                  </span>
                  <span className="font-mono text-blue-400 font-extrabold">
                    {ordersPerMonth} pedidos
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={ordersPerMonth}
                  onChange={(e) => setOrdersPerMonth(Number(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-800 h-1 rounded-full cursor-pointer"
                />
              </div>

              {/* Range 3: Commission rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-300">
                    Taxa cobrada pelo marketplace atual
                  </span>
                  <span className="font-mono text-blue-400 font-extrabold">
                    {marketplaceCommission}%
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="25"
                  value={marketplaceCommission}
                  onChange={(e) =>
                    setMarketplaceCommission(Number(e.target.value))
                  }
                  className="w-full accent-blue-500 bg-slate-800 h-1 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Calculator Outputs Right */}
          <div className="lg:col-span-7 bg-slate-950/40 rounded-2xl border border-slate-800/80 p-4 py-6 md:p-6 lg:space-y-6 space-y-4 relative">
            {/* Split Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Faturamento Mensal
                </span>
                <span className="text-sm md:text-base font-black text-slate-100 font-mono block mt-1">
                  R${" "}
                  {monthlyRevenue.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block text-rose-400">
                  Taxas pagas hoje
                </span>
                <span className="text-sm md:text-base font-black text-rose-400 font-mono block mt-1">
                  R${" "}
                  {marketplaceFees.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Main callout */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-4 items-center">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-emerald-500/10 flex-shrink-0 font-bold select-none">
                $
              </div>
              <div>
                <span className="text-[10px] text-slate-300 font-bold block uppercase tracking-wider">
                  Economia com Dulivi Pro
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono leading-none mt-1 block">
                  R${" "}
                  {monthlySavings.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-[10px] text-slate-400 font-bold">
                    / mês
                  </span>
                </span>
              </div>
            </div>

            {/* Meta values */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-6 text-sm text-slate-400 justify-between items-start sm:items-center pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="text-emerald-500" size={15} />
                <span>
                  Economia anual estimada de{" "}
                  <b className="text-emerald-400 font-mono">
                    R${" "}
                    {annualSavings.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </b>
                </span>
              </div>
              <a
                href="#contact-form-section"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-[10px] px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 uppercase select-none cursor-pointer"
              >
                <span>Fidelizar Lucro</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
