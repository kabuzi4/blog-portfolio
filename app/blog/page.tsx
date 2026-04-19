import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
};

const TAG_COLORS: Record<string, string> = {
  "Liderança":                "bg-purple-50 text-purple-700 border-purple-100",
  "Gestão Ágil":              "bg-blue-50   text-blue-700   border-blue-100",
  "Dados & BI":               "bg-teal-50   text-teal-700   border-teal-100",
  "Ferramentas para Líderes": "bg-amber-50  text-amber-700  border-amber-100",
};

const CATEGORIAS = ["Todos", "Liderança", "Gestão Ágil", "Dados & BI", "Ferramentas para Líderes"];

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, category, excerpt, publishedAt, readTime
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-blue-50 via-white to-white pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">Blog</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Artigos & Reflexões</h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            Liderança, cultura ágil, dados e transformação digital — ideias e aprendizados da prática em gestão de TI.
          </p>
        </div>
      </section>

      <div className="border-b border-gray-100 sticky top-16 bg-white z-40">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIAS.map((cat) => (
            <span key={cat} className={`flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full border cursor-pointer transition-colors ${
              cat === "Todos"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-600"
            }`}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-xs text-gray-400 mb-6">{posts.length} artigos publicados</p>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">Nenhum artigo publicado ainda.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const tagColor = TAG_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-100";
              return (
                <Link key={post._id} href={`/blog/${post.slug.current}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                    Imagem do artigo
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border w-fit ${tagColor}`}>
                      {post.category}
                    </span>
                    <h2 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-xs text-gray-400">{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
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
