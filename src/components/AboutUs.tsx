import React from "react";
import {
  Calendar,
  Users,
  Target,
  Landmark,
  Award,
  ShieldAlert,
  ArrowRight,
  Bot,
  Menu,
  SquareMenu,
  Send,
} from "lucide-react";

export const AboutUs: React.FC = () => {
  const pillars = [
    {
      id: "p1",
      title: "Cardápio Digital",
      desc: "Sua marca em um endereço profissional Dulivi sem pagar por servidores ou taxas de corretagem.",
      icon: <SquareMenu size={28} />,
    },
    {
      id: "p2",
      title: "Atendimento com IA",
      desc: "Os pedidos dos clientes chegam formatados e prontos diretamente no seu número de WhatsApp de suporte.",
      icon: <Bot size={28} />,
    },
    {
      id: "p3",
      title: "Disparos Inteligentes",
      desc: "Campanhas personalizadas automáticas de fidelização e recompra baseadas em comportamento de consumo.",
      icon: <Send size={28} />,
    },
    {
      id: "p4",
      title: "Tráfego Pago com IA",
      desc: "Clientes compram mais através de anúncios otimizados e menus projetados cientificamente.",
      icon: <Target size={28} />,
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-slate-50/40 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Presentation / Team Placeholder Left */}
          <div className="lg:col-span-5 space-y-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-video lg:aspect-square bg-slate-900 flex items-center justify-center text-center p-8 text-white">
              {/* Abstract decorative geometric layout */}
              <div className="absolute inset-0 bg-radial-at-t from-blue-600/30 via-slate-950 to-slate-950 opacity-90" />
              <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-blue-500/20 rounded-full blur-2xl" />

              <div className="relative space-y-4">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit mx-auto tracking-wider">
                  Nossa Missão
                </span>
                <p className="text-xl md:text-2xl font-display font-black leading-tight max-w-sm">
                  “Acreditamos que donos de restaurantes devem ter liberdade
                  financeira, operacional e estratégica.”
                </p>
                <div className="h-px bg-white/20 w-16 mx-auto my-3" />
                <p className="text-xs text-slate-400 font-mono">
                  Fundada em 2023 • Santos, SP
                </p>
              </div>
            </div>

            {/* Quick Metrics of trust */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs">
                <span className="text-2xl font-black text-blue-600 font-mono block">
                  2023
                </span>
                <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase">
                  Fundação oficial
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs">
                <span className="text-2xl font-black text-blue-600 font-mono block">
                  +1.000
                </span>
                <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase">
                  Parceiros em todo o Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Texts Right */}
          <div className="lg:col-span-7 space-y-6">
            <span className="bg-blue-50 text-blue-700 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
              Quem Somos
            </span>

            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
              Por que a Dulivi existe?
            </h2>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Nós existimos porque acreditamos que os donos de restaurantes
              devem ter mais liberdade, seja ela financeira, do operacional ou
              de algum marketplace. Nós fazemos isso otimizando o tempo do dono
              de restaurante e aumentando muito o faturamento do seu negócio.
            </p>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              A Dulivi foi fundada nesse formato em 2023 e surgiu da união de
              pessoas que viveram as dores e os desafios de se ter um negócio
              próprio, seja através da família ou com a própria experiência
              prática no segmento de alimentação.
            </p>

            {/* Core Pillars Grid */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                Os 4 Pilares da Dulivi que Tornam Isso Possível:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pil) => (
                  <div
                    key={pil.id}
                    className="bg-white p-4 rounded-2xl border border-slate-100/80 shadow-3xs flex gap-3.5 items-start"
                  >
                    <span className="text-2xl select-none">{pil.icon}</span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs">
                        {pil.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                        {pil.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <a
                href="#features"
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Ver funcionalidades</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
