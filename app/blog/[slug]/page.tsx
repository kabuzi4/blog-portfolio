import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
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
  body: unknown[];
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
};

// ─── Cores das tags ───────────────────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  "Liderança":                "bg-purple-50 text-purple-700 border-purple-100",
  "Gestão Ágil":              "bg-blue-50   text-blue-700   border-blue-100",
  "Dados & BI":               "bg-teal-50   text-teal-700   border-teal-100",
  "Ferramentas para Líderes": "bg-amber-50  text-amber-700  border-amber-100",
};

// ─── Queries ──────────────────────────────────────────────────────────────────
async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, category, excerpt, publishedAt, readTime, body,
      mainImage { asset, alt }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

async function getRelated(slug: string, category: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && slug.current != $slug && category == $category] | order(publishedAt desc)[0...3] {
      _id, title, slug, category, readTime
    }`,
    { slug, category },
    { next: { revalidate: 60 } }
  );
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "post"] { "slug": slug.current }`
  );
  return slugs.map((s) => ({ slug: s.slug }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

// ─── Componentes do PortableText ──────────────────────────────────────────────
const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-lg font-bold text-gray-900 mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-base font-semibold text-gray-900 mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-300 bg-blue-50 px-5 py-3 rounded-r-xl my-5 text-sm text-blue-800 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-none flex flex-col gap-2 mb-5">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-5 flex flex-col gap-2 mb-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2 text-sm text-gray-600">
        <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-sm text-gray-600 leading-relaxed">{children}</li>
    ),
  },
};

// ─── Página do artigo ─────────────────────────────────────────────────────────
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelated(slug, post.category);
  const tagColor = TAG_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-100";

  const coverImageUrl = post.mainImage?.asset
    ? urlForImage(post.mainImage).width(1200).height(630).url()
    : null;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HEADER ── */}
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
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight max-w-3xl mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            <span>·</span>
            <span>{post.readTime} de leitura</span>
            <span>·</span>
            <span>Por <span className="text-gray-600 font-medium">Guilherme C. Q. Reis</span></span>
          </div>
        </div>
      </section>

      {/* ── IMAGEM DE CAPA ── */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        {coverImageUrl ? (
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200">
            <Image
              src={coverImageUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-64 sm:h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm border border-gray-200">
            Imagem de capa do artigo
          </div>
        )}
      </div>

      {/* ── CONTEÚDO + SIDEBAR ── */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Artigo */}
          <article className="flex-1 min-w-0">
            <p className="text-base font-medium text-gray-700 leading-relaxed mb-8 pb-8 border-b border-gray-100">
              {post.excerpt}
            </p>

            {post.body && post.body.length > 0 ? (
              <div className="mb-10">
                <PortableText
                  value={post.body as Parameters<typeof PortableText>[0]["value"]}
                  components={ptComponents}
                />
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic mb-10">
                O conteúdo completo deste artigo está sendo preparado.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
              <span className="text-xs text-gray-400">Tags:</span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColor}`}>
                {post.category}
              </span>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://blog-portfolio-bhzd.vercel.app/blog/${post.slug.current}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs text-blue-600 hover:underline font-medium"
              >
                Compartilhar no LinkedIn →
              </a>
            </div>

            {/* Autor */}
            <div className="mt-8 flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                Foto
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Guilherme C. Q. Reis</p>
                <p className="text-xs text-blue-600 mt-0.5">Gerente de TI & Desenvolvimento</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Compartilhando aprendizados sobre liderança, cultura ágil, engenharia de dados e transformação digital.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              {related.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Artigos relacionados
                  </h3>
                  <div className="flex flex-col gap-3">
                    {related.map((rel) => (
                      <Link key={rel._id} href={`/blog/${rel.slug.current}`}
                        className="group p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                        <p className="text-xs font-medium text-gray-800 leading-snug group-hover:text-blue-700 transition-colors mb-1">
                          {rel.title}
                        </p>
                        <p className="text-xs text-gray-400">{rel.readTime} de leitura</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-700 rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold text-white mb-1">Vamos nos conectar?</p>
                <p className="text-xs text-blue-100 mb-3 leading-relaxed">
                  Sigo compartilhando conteúdo sobre TI e liderança no LinkedIn.
                </p>
                <a href="https://www.linkedin.com/in/guilherme-reis-ti" target="_blank" rel="noopener noreferrer"
                  className="block text-xs font-semibold bg-white text-blue-600 rounded-lg py-2 hover:bg-blue-50 transition-colors">
                  Seguir no LinkedIn
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ── CONTINUE LENDO ── */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Continue lendo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link key={rel._id} href={`/blog/${rel.slug.current}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-sm transition-all">
                  <p className="text-xs font-medium text-blue-600 mb-2">{rel.category}</p>
                  <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors mb-2">
                    {rel.title}
                  </p>
                  <p className="text-xs text-gray-400">{rel.readTime} de leitura</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}