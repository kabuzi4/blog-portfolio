import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Página de Contato ────────────────────────────────────────────────────────
export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HEADER ── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-white pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">
            Contato
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Vamos conversar?
          </h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            Se você quer trocar experiências sobre liderança, ágil ou transformação
            digital — ou tem uma oportunidade para compartilhar — fique à vontade
            para entrar em contato.
          </p>
        </div>
      </section>

      {/* ── CONTEÚDO ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── FORMULÁRIO ── */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Envie uma mensagem
            </h2>

            <form
              action="https://formsubmit.co/guilhermecqreis@outlook.com"
              method="POST"
              className="flex flex-col gap-5"
            >
              {/* Campos ocultos do FormSubmit */}
              <input type="hidden" name="_subject" value="Nova mensagem — Blog Guilherme Reis" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://blog-portfolio-bhzd.vercel.app/contato?enviado=true" />
              <input type="text" name="_honey" className="hidden" />

              {/* Nome */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700" htmlFor="name">
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                />
              </div>

              {/* Assunto */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700" htmlFor="assunto">
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Oportunidade profissional">Oportunidade profissional</option>
                  <option value="Parceria ou colaboração">Parceria ou colaboração</option>
                  <option value="Troca de experiências">Troca de experiências</option>
                  <option value="Dúvida sobre um artigo">Dúvida sobre um artigo</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Mensagem */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700" htmlFor="mensagem">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={5}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all resize-none"
                />
              </div>

              {/* Botão */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
              >
                Enviar mensagem
              </button>

              <p className="text-xs text-gray-400 text-center">
                Respondo em até 48 horas úteis.
              </p>
            </form>
          </div>

          {/* ── SIDEBAR DE CONTATO ── */}
          <div className="lg:w-72 flex-shrink-0 flex flex-col gap-6">

            {/* Sobre a resposta */}
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                Sobre o tempo de resposta
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Costumo responder em até 48 horas úteis. Para assuntos urgentes,
                o LinkedIn é o canal mais rápido.
              </p>
            </div>

            {/* Links diretos */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Canais diretos
              </p>
              <div className="flex flex-col gap-3">

                <a
                  href="https://www.linkedin.com/in/guilherme-reis-ti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                      LinkedIn
                    </p>
                    <p className="text-xs text-gray-400">guilherme-reis-ti</p>
                  </div>
                </a>

                <a
                  href="mailto:guilhermecqreis@outlook.com"
                  className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                      E-mail
                    </p>
                    <p className="text-xs text-gray-400">guilhermecqreis@outlook.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/kabuzi4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                      GitHub
                    </p>
                    <p className="text-xs text-gray-400">kabuzi4</p>
                  </div>
                </a>

              </div>
            </div>

            {/* Localização */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Localização</p>
                <p className="text-xs text-gray-500 mt-0.5">Paulínia, SP — Brasil</p>
                <p className="text-xs text-gray-400 mt-1">Disponível para remoto</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-blue-700 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            Prefere se conectar diretamente?
          </h2>
          <p className="text-blue-100 text-sm max-w-md">
            Me adicione no LinkedIn — é onde estou mais ativo e respondo mais rápido.
          </p>
          <a
            href="https://www.linkedin.com/in/guilherme-reis-ti"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3 bg-white text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Conectar no LinkedIn
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
