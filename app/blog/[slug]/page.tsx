import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ALL_POSTS } from "../page";

// ─── Conteúdo mock dos posts ──────────────────────────────────────────────────
const POST_CONTENT: Record<string, { intro: string; body: string[]; tips: string[] }> = {
  "cultura-alta-performance": {
    intro:
      "Cultura de alta performance não se decreta — se constrói. E é construída todos os dias, na forma como líderes se comunicam, tomam decisões, reconhecem esforços e desenvolvem pessoas.",
    body: [
      "Nos últimos anos liderando times de TI, aprendi que a diferença entre um time mediano e um time de alta performance raramente está na capacidade técnica. Está na cultura — nos rituais, nas conversas difíceis que acontecem (ou não), na clareza sobre o que importa e no senso de pertencimento que cada pessoa sente.",
      "Alta performance começa com segurança psicológica. Quando as pessoas têm medo de errar, de discordar ou de pedir ajuda, a criatividade e a colaboração desaparecem. O papel do líder é criar um ambiente onde o risco calculado é encorajado e o erro é tratado como aprendizado.",
      "Rituais são o esqueleto da cultura. Dailies que servem para resolver bloqueios, não para reportar status. Retrospectivas onde as pessoas falam o que realmente pensam. 1:1s que desenvolvem a carreira, não apenas acompanham tarefas. Cada ritual é uma oportunidade de reforçar os valores do time.",
    ],
    tips: [
      "Comece com segurança psicológica: crie espaços onde o time pode discordar sem consequências",
      "Defina e comunique expectativas claras — o time precisa saber o que é 'bom' para o seu contexto",
      "Invista em feedback contínuo: não espere a avaliação semestral para dar um retorno importante",
      "Meça o que importa: OKRs, KPIs de entrega e indicadores de saúde do time",
      "Celebre conquistas — grandes e pequenas. Reconhecimento é combustível de cultura",
    ],
  },
  "okrs-times-ti": {
    intro:
      "OKRs funcionam — mas apenas quando são usados com leveza e propósito, não como mais uma ferramenta de cobrança.",
    body: [
      "A maioria das implementações de OKR falha não por causa da metodologia, mas pela forma como é introduzida. Quando OKRs viram uma obrigação burocrática em vez de uma bússola estratégica, o time os ignora ou os joga para satisfazer quem cobra.",
      "A chave está na simplicidade: 1 a 3 objetivos por ciclo, cada um com 2 a 4 resultados-chave mensuráveis. O objetivo responde 'onde queremos chegar?', os key results respondem 'como saberemos que chegamos?'.",
      "Ciclos trimestrais funcionam bem para times de TI: tempo suficiente para entregar resultados reais, curto o bastante para manter o foco e corrigir a rota quando necessário.",
    ],
    tips: [
      "Comece com no máximo 2 objetivos no primeiro ciclo — simplicidade gera adesão",
      "Key results precisam ser mensuráveis: 'melhorar a qualidade' não é um KR, 'reduzir bugs em produção em 30%' é",
      "Revise os OKRs semanalmente em no máximo 15 minutos — não deixe virar reunião longa",
      "Separe OKRs de avaliação de desempenho — isso mata a honestidade do time",
      "Comemore os 70% — OKRs ambiciosos alcançados pela metade ainda geram mais resultado que metas fáceis",
    ],
  },
  "rituais-ageis": {
    intro:
      "Rituais ágeis mal executados consomem tempo sem gerar valor. Bem executados, são a maior alavanca de performance de um time.",
    body: [
      "A daily não é uma reunião de status — é um ritual de sincronização e desbloqueio. Quando cada pessoa responde 'o que fiz, o que farei e o que me bloqueia', o objetivo não é informar o gestor: é expor impedimentos para que o time possa agir.",
      "A retrospectiva é o ritual mais poderoso e mais desperdiçado do ágil. Times que fazem retros superficiais perdem a chance de criar mudanças reais. A pergunta certa não é 'o que foi ruim', mas 'o que podemos fazer diferente amanhã'.",
      "O 1:1 semanal entre líder e liderado é onde a confiança é construída. Não é espaço para status de tarefas — é espaço para desenvolvimento, alinhamento de expectativas e conversas que não acontecem em grupo.",
    ],
    tips: [
      "Daily em pé, máximo 15 minutos — quem sentar, reunião cresce",
      "Retrospectiva com facilitador diferente a cada sprint — evita viés e desenvolve liderança",
      "1:1 semanal de 30 minutos: 20 minutos para o liderado falar, 10 para o líder",
      "Planning com critérios de aceite claros — sem isso, 'pronto' significa coisas diferentes para cada pessoa",
      "Review com stakeholders reais — demo apenas para o gestor direto não conta como review",
    ],
  },
};

const DEFAULT_CONTENT = {
  intro:
    "Este artigo explora um tema que aparece constantemente na prática da gestão de TI — e que faz diferença real no dia a dia de quem lidera times e projetos.",
  body: [
    "A gestão de TI moderna exige que líderes equilibrem aspectos técnicos, humanos e estratégicos de forma integrada. Não basta ser bom tecnicamente — é preciso desenvolver pessoas, criar processos e entregar resultados de negócio.",
    "Ao longo da minha trajetória, desenvolvi a visão de que a excelência em TI passa necessariamente pela excelência das pessoas. Times de alta performance são construídos com intencionalidade, processos claros e cultura forte.",
  ],
  tips: [
    "Mapeie os pontos de atrito do seu processo atual antes de propor soluções",
    "Envolva o time na construção da solução — quem executa sabe onde dói",
    "Implemente de forma incremental e meça os resultados antes de escalar",
    "Comunique o porquê antes do como — contexto gera comprometimento",
  ],
};

// ─── Cores das tags ───────────────────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  "Liderança":                "bg-purple-50 text-purple-700 border-purple-100",
  "Gestão Ágil":              "bg-blue-50   text-blue-700   border-blue-100",
  "Dados & BI":               "bg-teal-50   text-teal-700   border-teal-100",
  "Ferramentas para Líderes": "bg-amber-50  text-amber-700  border-amber-100",
};

// ─── Geração estática das rotas ───────────────────────────────────────────────
export async function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }));
}

// ─── Página do artigo ─────────────────────────────────────────────────────────
// Next.js 15: params é uma Promise — precisa de await
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = ALL_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = POST_CONTENT[post.slug] ?? DEFAULT_CONTENT;
  const tagColor = TAG_COLORS[post.tag] ?? "bg-gray-50 text-gray-600 border-gray-100";

  const related = ALL_POSTS
    .filter((p) => p.slug !== post.slug && p.tag === post.tag)
    .slice(0, 3);
  const others = ALL_POSTS
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3 - related.length);
  const sidebar = [...related, ...others];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HEADER DO ARTIGO ── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-white pt-12 pb-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
          </div>

          <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-4 ${tagColor}`}>
            {post.tag}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight max-w-3xl mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} de leitura</span>
            <span>·</span>
            <span>Por <span className="text-gray-600 font-medium">Guilherme C. Q. Reis</span></span>
          </div>
        </div>
      </section>

      {/* ── IMAGEM DE CAPA ── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="w-full h-64 sm:h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm border border-gray-200">
          Imagem de capa do artigo
        </div>
      </div>

      {/* ── CONTEÚDO + SIDEBAR ── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Artigo */}
          <article className="flex-1 min-w-0">
            <p className="text-base font-medium text-gray-700 leading-relaxed mb-8 pb-8 border-b border-gray-100">
              {content.intro}
            </p>

            <div className="flex flex-col gap-5 mb-10">
              {content.body.map((paragraph, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 mb-10">
              <h2 className="text-base font-semibold text-blue-900 mb-4">
                Dicas práticas para aplicar no seu time
              </h2>
              <ul className="flex flex-col gap-3">
                {content.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-blue-800">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
              <span className="text-xs text-gray-400">Tags:</span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColor}`}>
                {post.tag}
              </span>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://guilhermereis.dev/blog/${post.slug}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs text-blue-600 hover:underline font-medium"
              >
                Compartilhar no LinkedIn →
              </a>
            </div>

            <div className="mt-8 flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                Foto
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Guilherme C. Q. Reis</p>
                <p className="text-xs text-blue-600 mt-0.5">Gerente de TI & Desenvolvimento</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Compartilhando aprendizados sobre liderança, cultura ágil,
                  engenharia de dados e transformação digital — da prática em gestão de TI.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Artigos relacionados
                </h3>
                <div className="flex flex-col gap-3">
                  {sidebar.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="group p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
                    >
                      <p className="text-xs font-medium text-gray-800 leading-snug group-hover:text-blue-700 transition-colors mb-1">
                        {rel.title}
                      </p>
                      <p className="text-xs text-gray-400">{rel.readTime} de leitura</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-blue-600 rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold text-white mb-1">Vamos nos conectar?</p>
                <p className="text-xs text-blue-100 mb-3 leading-relaxed">
                  Sigo compartilhando conteúdo sobre TI e liderança no LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/in/guilherme-reis-ti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs font-semibold bg-white text-blue-600 rounded-lg py-2 hover:bg-blue-50 transition-colors"
                >
                  Seguir no LinkedIn
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ── CONTINUE LENDO ── */}
      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Continue lendo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {sidebar.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <p className="text-xs font-medium text-blue-600 mb-2">{rel.tag}</p>
                <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors mb-2">
                  {rel.title}
                </p>
                <p className="text-xs text-gray-400">{rel.readTime} de leitura</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
