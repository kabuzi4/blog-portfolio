import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
};

// ─── Cores das categorias ─────────────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  "Liderança":                "bg-purple-50 text-purple-700 border-purple-100",
  "Gestão Ágil":              "bg-blue-50   text-blue-700   border-blue-100",
  "Dados & BI":               "bg-teal-50   text-teal-700   border-teal-100",
  "Ferramentas para Líderes": "bg-amber-50  text-amber-700  border-amber-100",
};

const CATEGORIAS = ["Todos", "Liderança", "Gestão Ágil", "Dados & BI", "Ferramentas para Líderes"];

// ─── Busca posts do Sanity — filtra por categoria se informada ────────────────
async function getPosts(categoria?: string): Promise<Post[]> {
  const filter = categoria && categoria !== "Todos"
    ? `*[_type == "post" && category == $categoria]`
    : `*[_type == "post"]`;

  return client.fetch(
    `${filter} | order(publishedAt desc) {
      _id, title, slug, category, excerpt, publishedAt, readTime,
      mainImage { asset, alt }
    }`,
    { categoria: categoria ?? "" },
    { next: { revalidate: 60 } }
  );
}

// ─── Formata data ─────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── Página Blog ──────────────────────────────────────────────────────────────
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categoriaAtiva = categoria ?? "Todos";
  const posts = await getPosts(categoriaAtiva);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HEADER ── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-white pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">Blog</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Artigos & Reflexões</h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            Liderança, cultura ágil, dados e transformação digital — ideias e aprendizados da prática em gestão de TI.
          </p>
        </div>
      </section>

      {/* ── FILTROS — links que mudam a URL ── */}
      <div className="border-b border-gray-100 sticky top-16 bg-white z-40">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIAS.map((cat) => {
            const isActive = cat === categoriaAtiva;
            const href = cat === "Todos" ? "/blog" : `/blog?categoria=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full border transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── LISTA DE POSTS ── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-xs text-gray-400 mb-6">
          {posts.length} {posts.length === 1 ? "artigo" : "artigos"}
          {categoriaAtiva !== "Todos" ? ` em "${categoriaAtiva}"` : " publicados"}
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm">Nenhum artigo encontrado nesta categoria.</p>
            <Link href="/blog" className="text-xs text-blue-600 hover:underline font-medium">
              Ver todos os artigos →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const tagColor = TAG_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-100";
              const imageUrl = post.mainImage?.asset
                ? urlForImage(post.mainImage).width(600).height(340).url()
                : null;

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                >
                  {imageUrl ? (
                    <div className="relative w-full h-40 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={post.mainImage?.alt ?? post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      Imagem do artigo
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border w-fit ${tagColor}`}>
                      {post.category}
                    </span>
                    <h2 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-xs text-gray-400">
                        {post.publishedAt ? formatDate(post.publishedAt) : ""}
                      </span>
                      <span className="text-xs text-gray-400">{post.readTime} de leitura</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}