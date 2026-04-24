import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

// ─── Dados ────────────────────────────────────────────────────────────────────
const EXPERIENCIAS = [
  {
    cargo: "Gerente de TI & Desenvolvimento de Software",
    empresa: "Posição Atual",
    periodo: "2019 – presente · +5 anos",
    descricao:
      "Liderança de times multidisciplinares de TI, reestruturação de áreas, implantação de processos escaláveis e condução de projetos de alta complexidade — desde arquiteturas e engenharia de dados até modernização de sistemas e culturas organizacionais.",
    destaques: [
      "Reestruturação completa de área de TI com +20 pessoas",
      "Implantação de OKRs, Kanban e rituais de alta performance",
      "Projetos de engenharia de dados e BI em produção",
      "Atuação como ponte entre diretoria, stakeholders e tecnologia",
    ],
  },
  {
    cargo: "Líder Técnico & Analista de TI Sênior",
    empresa: "Experiência Anterior",
    periodo: "2014 – 2019 · 5 anos",
    descricao:
      "Coordenação de squads ágeis, implantação de Scrum e Kanban em times multidisciplinares, arquitetura de soluções de dados e modernização de sistemas legados em empresas de tecnologia, telecomunicações e saúde.",
    destaques: [
      "Liderança técnica de squads de 5 a 12 pessoas",
      "Migração de sistemas legados para arquiteturas modernas",
      "Implantação de práticas DevOps e CI/CD",
    ],
  },
];

const FORMACOES = [
  {
    titulo: "MBA em Gestão de Projetos",
    instituicao: "Pós-graduação · Concluído",
    icon: "🎓",
  },
  {
    titulo: "MBA em Gestão de Pessoas",
    instituicao: "Pós-graduação · Concluído",
    icon: "🎓",
  },
  {
    titulo: "Pós-graduação em Inteligência Artificial",
    instituicao: "Especialização · Concluído",
    icon: "🤖",
  },
  {
    titulo: "Gestão Estratégica para Líderes",
    instituicao: "Especialização · Concluído",
    icon: "📈",
  },
];

const COMPETENCIAS = [
  { area: "Liderança & Pessoas", items: ["Gestão de times", "Desenvolvimento de lideranças", "Feedback & performance", "1:1s e rituais"] },
  { area: "Cultura Ágil", items: ["Scrum & Kanban", "OKRs & KPIs", "Retrospectivas", "Squads & tribos"] },
  { area: "Dados & BI", items: ["Engenharia de dados", "Business Intelligence", "Decisões orientadas a dados", "Arquitetura de dados"] },
  { area: "Gestão & Estratégia", items: ["Transformação digital", "Governança de TI", "Gestão de stakeholders", "Orçamento & recursos"] },
];

// ─── Página Sobre ─────────────────────────────────────────────────────────────
export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-gray-900 tracking-tight">
              Guilherme Reis
            </span>
            <span className="hidden sm:inline text-xs text-gray-400 ml-3">
              Gerente de TI & Desenvolvimento
            </span>
          </div>
          <nav className="flex items-center gap-7">
            {[
              { label: "Home", href: "/" },
              { label: "Sobre", href: "/sobre" },
              { label: "Blog", href: "/blog" },
              { label: "Contato", href: "/contato" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors ${
                  item.label === "Sobre"
                    ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-0.5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HEADER DA PÁGINA ── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-white pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">
            Sobre mim
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Conheça minha trajetória
          </h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            Mais de 10 anos conectando liderança estratégica, profundidade técnica
            e gestão de pessoas para transformar tecnologia em resultado de negócio.
          </p>
        </div>
      </section>

      {/* ── PERFIL ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* Avatar + links */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <Image
                src="/foto-perfil.jpg"
                alt="Guilherme C. Q. Reis — Gerente de TI & Desenvolvimento"
                width={200}
                height={200}
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border border-gray-200"
              />
            <div className="flex flex-col gap-2 w-full">
              <a
                href="https://www.linkedin.com/in/guilherme-reis-ti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs font-medium px-4 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                LinkedIn
              </a>
              <Link
                href="/blog"
                className="text-center text-xs font-medium px-4 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Ver artigos
              </Link>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-5 flex-1">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Guilherme C. Q. Reis
              </h2>
              <p className="text-blue-600 font-medium text-sm mt-1">
                Gerente de TI & Desenvolvimento · Paulínia, SP
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">
              Sou Gerente de TI e Desenvolvimento de Software, com mais de 10 anos
              de experiência em empresas dos setores de tecnologia, telecomunicações
              e saúde. Atuo na interseção entre liderança estratégica, profundidade
              técnica e gestão de pessoas, garantindo que tecnologia, produto e
              negócio avancem de forma integrada, com previsibilidade, qualidade e
              alta performance.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Minha trajetória é marcada por reestruturação de áreas de TI,
              aceleração de times, implantação de processos escaláveis e condução
              de projetos complexos — desde arquiteturas e engenharia de dados até
              modernização de sistemas, processos e culturas organizacionais.
            </p>

            {/* O que faço muito bem */}
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-sm font-semibold text-blue-800 mb-3">
                O que faço muito bem
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                {[
                  "Lidero times multidisciplinares e formo lideranças",
                  "Estruturo áreas de TI, squads e governança",
                  "Entrego previsibilidade em ambientes complexos",
                  "Atuo como ponte entre diretoria e tecnologia",
                  "Tomo decisões técnicas orientadas por dados",
                  "Conduzo mudanças organizacionais com foco em performance",
                  "Crio rituais de alta performance (Scrum, Kanban, OKRs)",
                  "Transformo caos em processo e processo em resultado",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-blue-700">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVISOR ── */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* ── EXPERIÊNCIA ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Experiência profissional
        </h2>
        <div className="flex flex-col gap-8">
          {EXPERIENCIAS.map((exp, i) => (
            <div key={i} className="flex gap-5">
              {/* Linha lateral */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-blue-200" />
                {i < EXPERIENCIAS.length - 1 && (
                  <div className="w-px flex-1 bg-blue-100 min-h-[80px]" />
                )}
              </div>
              {/* Conteúdo */}
              <div className="flex-1 pb-2">
                <h3 className="text-base font-semibold text-gray-900">
                  {exp.cargo}
                </h3>
                <p className="text-sm text-blue-600 font-medium mt-0.5">
                  {exp.empresa}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 mb-3">{exp.periodo}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {exp.descricao}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {exp.destaques.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="text-blue-400 flex-shrink-0 mt-0.5">→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVISOR ── */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* ── COMPETÊNCIAS ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Áreas de expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPETENCIAS.map((comp) => (
            <div
              key={comp.area}
              className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {comp.area}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {comp.items.map((item) => (
                  <li key={item} className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVISOR ── */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* ── FORMAÇÃO ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Formação acadêmica
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FORMACOES.map((f) => (
            <div
              key={f.titulo}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
            >
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{f.titulo}</p>
                <p className="text-xs text-gray-400 mt-0.5">{f.instituicao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            Vamos conversar?
          </h2>
          <p className="text-blue-100 text-sm max-w-md">
            Se você quer trocar experiências sobre liderança, ágil ou transformação
            digital, me encontre no LinkedIn.
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
