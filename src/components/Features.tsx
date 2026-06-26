import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Bot, 
  Megaphone, 
  MessageSquareShare, 
  LayoutTemplate, 
  BarChart3, 
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react'

interface FeatureDetail {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  bgLight: string
  badgeText: string
  checkpoints: string[]
  previewContent: React.ReactNode
}

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('atendimento')

  const features: FeatureDetail[] = [
    {
      id: 'atendimento',
      title: 'Atendimento por Inteligência Artificial',
      subtitle: 'Atendimento humanizado, personalizado e disponível 24h para converter conversas em vendas.',
      icon: <Bot className="w-5 h-5" />,
      color: 'text-blue-600 border-blue-600 bg-blue-50',
      bgLight: 'bg-blue-50/50',
      badgeText: 'Atendente Virtual IA',
      checkpoints: [
        'Respostas e orçamentos em menos de 5 segundos',
        'Personalização avançada (treinado com suas regras de negócio)',
        'Integração nativa com WhatsApp Business',
        'Upsell automatizado (sugere adicionais e combos)'
      ],
      previewContent: (
        <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-300 space-y-3 shadow-inner border border-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-[10px] text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 font-semibold text-slate-400">Atendimento WhatsApp Inteligente</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex gap-2">
              <span className="bg-slate-800 px-2 py-1 rounded text-slate-400 text-[10px]">Cliente</span>
              <p className="bg-slate-800 text-white rounded-lg p-2 rounded-tl-none font-sans leading-normal">
                Boa noite! Vocês têm pizza de calabresa de tamanho grande para entrega? Quanto fica o frete para o Centro?
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-2 flex-row-reverse"
            >
              <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-[10px] self-start border border-blue-500/20">Dulivi IA</span>
              <div className="bg-blue-600 text-white rounded-lg p-2.5 rounded-tr-none font-sans leading-normal space-y-1.5 max-w-[80%]">
                <p>Olá! Temos sim! 🍕 Nossa Pizza Grande de Calabresa com Catupiry está por <b>R$ 42,00</b>.</p>
                <p>Para o Centro, a entrega fica por apenas <b>R$ 5,00</b> e chega em 30-40 min!</p>
                <p className="text-[11px] text-blue-100 italic">💡 Deseja adicionar uma Coca-Cola geladinha por apenas R$ 6,00 adicionais?</p>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'trafego',
      title: 'Anúncios Online (Tráfego Pago)',
      subtitle: 'Atraia novos clientes locais de forma constante enquanto você foca na cozinha e no atendimento.',
      icon: <Megaphone className="w-5 h-5" />,
      color: 'text-emerald-600 border-emerald-600 bg-emerald-50',
      bgLight: 'bg-emerald-50/50',
      badgeText: 'Facebook, Instagram & Google',
      checkpoints: [
        'Configuração descomplicada de campanhas regionais',
        'Foco em pessoas famintas num raio de 5km',
        'Otimização inteligente de orçamento diário',
        'Dashboard simplificado (sem gerentes de anúncios complexos)'
      ],
      previewContent: (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Desempenho de Anúncios</span>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              Campanha Ativa
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Visualizações</span>
              <span className="text-lg font-black text-slate-800 font-mono">14.820</span>
              <span className="text-[9px] text-emerald-600 block mt-0.5 font-semibold">↑ 18% esta semana</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 block uppercase">Novos Clientes</span>
              <span className="text-lg font-black text-slate-800 font-mono">+186</span>
              <span className="text-[9px] text-emerald-600 block mt-0.5 font-semibold">Custo por clique: R$ 0,38</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2.5 items-start">
            <span className="text-lg">🎯</span>
            <p className="text-[11px] text-blue-800 leading-snug font-medium">
              Dulivi identificou que os melhores horários para seus anúncios são de <b>quinta a domingo entre 18:00 e 21:30</b>. Otimização aplicada automaticamente!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'disparos',
      title: 'Disparos Inteligentes por WhatsApp',
      subtitle: 'Comunique-se de forma personalizada e segmentada para incentivar a recorrência sem parecer chato.',
      icon: <MessageSquareShare className="w-5 h-5" />,
      color: 'text-amber-600 border-amber-600 bg-amber-50',
      bgLight: 'bg-amber-50/50',
      badgeText: 'Fidelização & CRM',
      checkpoints: [
        'Disparo para clientes inativos há mais de 15 dias',
        'Mensagens personalizadas com o primeiro nome do cliente',
        'Promoções e cupons automáticos em aniversários',
        'Relatórios de entrega e taxa de conversão em vendas'
      ],
      previewContent: (
        <div className="space-y-3.5">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <h5 className="font-extrabold text-slate-800 text-xs mb-3 flex items-center gap-1.5">
              <span>🚀 Gatilho de Automação:</span>
              <span className="bg-amber-100 text-amber-800 text-[9px] px-2 py-0.5 rounded-full font-bold">Clientes Sumidos</span>
            </h5>
            <div className="bg-white border border-slate-200/60 rounded-xl p-3 text-slate-600 text-xs space-y-1.5 leading-relaxed shadow-3xs">
              <p>Olá, <b>[Nome do Cliente]</b>! Que saudade de você! 😍</p>
              <p>Faz tempo que não vemos você por aqui. Para matar a saudade, preparamos um presente especial:</p>
              <p className="bg-amber-50 border border-dashed border-amber-300 p-2 rounded-lg text-amber-800 font-bold text-center text-xs">
                CUPOM: VOLTOU15 (15% OFF)
              </p>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">Disparar para: 142 clientes • Canal: WhatsApp</p>
            </div>
          </div>
          <div className="flex justify-between items-center bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 px-3 text-xs text-emerald-800 font-bold">
            <span>✅ 98,4% das mensagens entregues</span>
            <span className="font-mono text-[11px]">+R$ 1.840 faturados</span>
          </div>
        </div>
      )
    },
    {
      id: 'cardapio',
      title: 'Cardápio Digital Otimizado',
      subtitle: 'Uma experiência visual limpa, super rápida e intuitiva que estimula o cliente a adicionar mais itens.',
      icon: <LayoutTemplate className="w-5 h-5" />,
      color: 'text-violet-600 border-violet-600 bg-violet-50',
      bgLight: 'bg-violet-50/50',
      badgeText: 'Interface Mobile-First',
      checkpoints: [
        'Carregamento ultra-rápido mesmo em redes 3G/4G',
        'Layout projetado cientificamente para aumentar o ticket médio',
        'Categorização impecável e opcionais fáceis de configurar',
        'URL própria sem taxas abusivas de marketplaces'
      ],
      previewContent: (
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
          <div className="flex gap-2.5">
            <div className="flex-1 bg-white border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍟</span>
                <div>
                  <span className="text-[11px] font-bold text-slate-800 block">Combo Batata + Refri</span>
                  <span className="text-[10px] text-emerald-600 font-bold">+ R$ 12,90</span>
                </div>
              </div>
              <span className="text-[10px] bg-slate-100 p-1 px-2 rounded-lg text-slate-600 font-bold">Sugerido</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs space-y-2">
            <span className="text-[10px] font-black text-slate-400 block uppercase">Adicionais Mais Vendidos</span>
            <div className="flex justify-between items-center text-xs text-slate-700">
              <span className="font-semibold">Bacon Extra Cruzeta</span>
              <span className="font-mono font-bold text-slate-500">+ R$ 4,50</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-700">
              <span className="font-semibold">Cheddar Cremoso Injetado</span>
              <span className="font-mono font-bold text-slate-500">+ R$ 5,00</span>
            </div>
          </div>
          <p className="text-[10px] text-center text-slate-400 font-semibold italic">⭐ Aumenta o ticket médio em até 40% com sugestões cruzadas</p>
        </div>
      )
    },
    {
      id: 'relatorios',
      title: 'Relatórios & Dashboard Completo',
      subtitle: 'Tenha insights de altíssimo valor e clareza sobre o faturamento, produtos mais vendidos e clientes.',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'text-rose-600 border-rose-600 bg-rose-50',
      bgLight: 'bg-rose-50/50',
      badgeText: 'Inteligência de Vendas',
      checkpoints: [
        'Faturamento bruto, líquido e taxas integradas',
        'Indicador de clientes recorrentes vs. novos clientes',
        'Ranking de pratos e horários mais produtivos',
        'Exportação rápida para contabilidade ou planilhas'
      ],
      previewContent: (
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Métricas de Faturamento</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">Junho 2026</span>
          </div>
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                <span>Meta Mensal de Vendas</span>
                <span className="font-mono">85% batida</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Total Faturado</span>
                <span className="font-bold text-slate-800 font-mono">R$ 42.840,00</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Pedidos Concluídos</span>
                <span className="font-bold text-slate-800 font-mono">928</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const activeFeature = features.find(f => f.id === activeTab) || features[0]

  return (
    <section id="features" className="py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-blue-50 text-blue-700 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Super Recursos
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight">
            Como a Dulivi pode ajudar o seu negócio?
          </h2>
          <p className="text-slate-500 mt-4 text-sm md:text-base leading-relaxed">
            Conheça as funcionalidades que vão transformar o seu delivery, agilizar o seu operacional e multiplicar seu faturamento.
          </p>
        </div>

        {/* Tab & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tab Selection List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {features.map((feature) => {
              const isActive = activeTab === feature.id
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`text-left p-4 rounded-2xl transition-all border flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                    isActive 
                      ? 'bg-white border-blue-500 shadow-md ring-4 ring-blue-50' 
                      : 'bg-transparent border-transparent hover:bg-white hover:border-slate-100 hover:shadow-2xs'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      {feature.badgeText}
                    </span>
                    <h3 className="font-extrabold text-slate-800 text-sm md:text-base mt-0.5 leading-snug">
                      {feature.id === 'atendimento' ? 'Atendimento' : 
                       feature.id === 'trafego' ? 'Tráfego Pago' : 
                       feature.id === 'disparos' ? 'Disparos' : 
                       feature.id === 'cardapio' ? 'Cardápio' : 'Relatórios'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-normal">
                      {feature.subtitle}
                    </p>
                  </div>
                  <ChevronRight size={16} className={`text-slate-400 self-center transition-transform ${isActive ? 'translate-x-1 text-blue-600' : 'group-hover:translate-x-1'}`} />
                </button>
              )
            })}
          </div>

          {/* Tab Details and Mockup Preview Box */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-8 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {activeFeature.badgeText}
                    </span>
                    <Sparkles size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 leading-tight">
                    {activeFeature.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-slate-500 mt-3 leading-relaxed">
                    {activeFeature.subtitle}
                  </p>

                  {/* Checklist */}
                  <ul className="mt-6 space-y-2.5">
                    {activeFeature.checkpoints.map((pt, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold leading-normal">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live Mock Interactive Sandbox */}
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                    Visualização Interativa do Recurso:
                  </span>
                  {activeFeature.previewContent}
                </div>

                {/* Form Link Button inside feature details */}
                <div className="mt-6 flex justify-end">
                  <a 
                    href="#contact-form-section"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <span>Iniciar gratuitamente →</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
