import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Dados mock — depois virão do Sanity CMS ─────────────────────────────────
export const ALL_POSTS = [   // ← precisa ter "export"
  {
    slug: "cultura-alta-performance",
    tag: "Liderança",
    title: "Como construir uma cultura de alta performance",
    excerpt:
      "Cultura não se decreta — se constrói com rituais, feedback contínuo e líderes que desenvolvem pessoas todos os dias.",
    date: "10 Abr 2025",
    readTime: "7 min",
  },
  {
    slug: "okrs-times-ti",
    tag: "Gestão Ágil",
    title: "OKRs na prática: aplicando em times de TI",
    excerpt:
      "Como transformar objetivos estratégicos em resultados concretos usando OKRs de forma leve e eficaz em times de tecnologia.",
    date: "02 Abr 2025",
    readTime: "8 min",
  },
  {
    slug: "rituais-ageis",
    tag: "Gestão Ágil",
    title: "Rituais ágeis que realmente funcionam",
    excerpt:
      "Dailies, retrospectivas e 1:1s — como tornar cada cerimônia uma alavanca de performance real para o seu time.",
    date: "25 Mar 2025",
    readTime: "6 min",
  },
  {
    slug: "lideranca-tecnica-vs-pessoas",
    tag: "Liderança",
    title: "Liderança técnica vs. liderança de pessoas",
    excerpt:
      "Qual a diferença entre um tech lead e um gestor de pessoas? Como transitar entre os dois papéis sem perder efetividade.",
    date: "18 Mar 2025",
    readTime: "6 min",
  },
  {
    slug: "engenharia-dados-por-onde-comecar",
    tag: "Dados & BI",
    title: "Engenharia de dados: por onde começar?",
    excerpt:
      "Um guia prático para gestores de TI que querem estruturar uma área de dados — sem precisar virar engenheiro.",
    date: "10 Mar 2025",
    readTime: "9 min",
  },
  {
    slug: "feedback-transforma-pessoas",
    tag: "Ferramentas para Líderes",
    title: "Como dar feedback que realmente transforma pessoas",
    excerpt:
      "Feedback não é crítica — é uma das ferramentas mais poderosas de desenvolvimento que um líder tem. Veja como usar bem.",
    date: "03 Mar 2025",
    readTime: "5 min",
  },
];

const CATEGORIAS = ["Todos", "Liderança", "Gestão Ágil", "Dados & BI", "Ferramentas para Líderes"];

const TAG_COLORS: Record<string, string> = {
  "Liderança":               "bg-purple-50 text-purple-700 border-purple-100",
  "Gestão Ágil":             "bg-blue-50   text-blue-700   border-blue-100",
  "Dados & BI":              "bg-teal-50   text-teal-700   border-teal-100",
  "Ferramentas para Líderes":"bg-amber-50  text-amber-700  border-amber-100",
};

function CategoryBadge({ label }: { label: string }) {
  const color = TAG_COLORS[label] ?? "bg-gray-50 text-gray-600 border-gray-100";
  return (
    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${color}`}>
      {label}
    </span>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HEADER ── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-white pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">
            Blog
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Artigos & Reflexões
          </h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            Liderança, cultura ágil, dados e transformação digital — ideias e
            aprendizados da prática em gestão de TI.
          </p>
        </div>
      </section>

      {/* ── FILTROS ── */}
      <div className="border-b border-gray-100 sticky top-16 bg-white z-40">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIAS.map((cat) => (
            <span
              key={cat}
              className={`flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full border cursor-pointer transition-colors ${
                cat === "Todos"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── LISTA DE POSTS ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-xs text-gray-400 mb-6">{ALL_POSTS.length} artigos publicados</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all duration-200"
            >
              {/* Imagem placeholder */}
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                Imagem do artigo
              </div>

              <div className="flex flex-col flex-1 p-5 gap-3">
                <CategoryBadge label={post.tag} />

                <h2 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h2>

                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400">{post.readTime} de leitura</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
