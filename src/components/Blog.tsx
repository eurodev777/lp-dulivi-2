import React from 'react'
import { Calendar, User, Clock, ArrowUpRight } from 'lucide-react'

interface Post {
  id: string
  title: string
  category: string
  date: string
  readTime: string
  imageEmoji: string
  excerpt: string
}

export const Blog: React.FC = () => {
  const posts: Post[] = [
    {
      id: 'p1',
      title: 'Como aumentar as vendas do seu delivery em até 40% usando cardápio digital',
      category: 'Vendas',
      date: '24 Jun, 2026',
      readTime: '5 min de leitura',
      imageEmoji: '🚀',
      excerpt: 'Descubra como estruturar seu cardápio com descrições apetitosas, opcionais e combos estratégicos para turbinar o ticket médio do seu restaurante.'
    },
    {
      id: 'p2',
      title: 'Robôs de IA para WhatsApp: O segredo para não perder mais nenhum pedido',
      category: 'Automação',
      date: '18 Jun, 2026',
      readTime: '7 min de leitura',
      imageEmoji: '🤖',
      excerpt: 'Como o atendimento automatizado e instantâneo por WhatsApp evita que clientes desistam da compra e melhora a experiência do usuário.'
    },
    {
      id: 'p3',
      title: 'Guia definitivo de Tráfego Pago local para pizzarias e hamburguerias',
      category: 'Marketing',
      date: '12 Jun, 2026',
      readTime: '6 min de leitura',
      imageEmoji: '🎯',
      excerpt: 'Aprenda a investir a partir de R$ 10 por dia no Facebook e Instagram focando estritamente em clientes que moram próximos ao seu estabelecimento.'
    }
  ]

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <span className="bg-blue-50 text-blue-700 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
              Conteúdo de Valor
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mt-4 tracking-tight">
              Dulivi Blog
            </h2>
            <p className="text-slate-500 mt-2 text-xs md:text-sm max-w-xl leading-relaxed">
              Dicas de gestão, marketing digital e automações criadas por especialistas para acelerar o crescimento do seu restaurante.
            </p>
          </div>
          <button 
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer w-fit"
            onClick={() => alert('Em breve! O blog oficial está em fase de migração.')}
          >
            <span>Ver todos os artigos</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-slate-50/50 rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col justify-between group hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => alert(`Artigo "${post.title}" abrirá em breve.`)}
            >
              <div>
                {/* Simulated Image Header */}
                <div className="bg-slate-900 h-44 flex items-center justify-center text-5xl select-none relative">
                  <div className="absolute inset-0 bg-radial-at-t from-blue-600/20 to-slate-950 opacity-90" />
                  <span className="relative transform group-hover:scale-110 transition-transform duration-300">{post.imageEmoji}</span>
                </div>

                {/* Article Info */}
                <div className="p-5">
                  <span className="bg-blue-100 text-blue-800 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                    {post.category}
                  </span>

                  <h3 className="font-extrabold text-slate-800 text-sm md:text-base mt-3 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Meta Info footer */}
              <div className="p-5 pt-0 border-t border-slate-100 bg-transparent flex justify-between items-center text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar size={11} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={11} />
                  <span>{post.readTime}</span>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
