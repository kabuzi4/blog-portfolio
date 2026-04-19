import Link from "next/link";

// ─── Dados do perfil ────────────────────────────────────────────────────────
const PROFILE = {
  name: "Guilherme C. Q. Reis",
  title: "Gerente de TI & Desenvolvimento",
  subtitle:
    "Líder de Times de Alta Performance | BI & Engenharia de Dados | Cultura Ágil | Transformação Digital",
  location: "Paulínia, SP",
  bio: "Gerente de TI e Desenvolvimento de Software com mais de 10 anos de experiência em tecnologia, telecomunicações e saúde. Atuo na interseção entre liderança estratégica, profundidade técnica e gestão de pessoas — garantindo que tecnologia, produto e negócio avancem de forma integrada, com previsibilidade, qualidade e alta performance.",
  linkedin: "https://www.linkedin.com/in/guilherme-reis-ti",
  github: "https://github.com/",
};

// ─── Artigos em destaque (mock — depois virão do CMS) ───────────────────────
const FEATURED_POSTS = [
  {
    slug: "cultura-alta-performance",
    tag: "Liderança",
    title: "Como construir uma cultura de alta performance",
    excerpt:
      "Cultura não se decreta — se constrói com rituais, feedback contínuo e líderes que desenvolvem pessoas.",
    date: "10 Abr 2025",
    readTime: "7 min",
  },
  {
    slug: "okrs-times-ti",
    tag: "Gestão Ágil",
    title: "OKRs na prática: aplicando em times de TI",
    excerpt:
      "Como transformar objetivos estratégicos em resultados concretos usando OKRs de forma leve e eficaz.",
    date: "02 Abr 2025",
    readTime: "8 min",
  },
  {
    slug: "rituais-ageis",
    tag: "Gestão Ágil",
    title: "Rituais ágeis que realmente funcionam",
    excerpt:
      "Dailies, retrospectivas e 1:1s — como tornar cada cerimônia uma alavanca de performance real.",
    date: "25 Mar 2025",
    readTime: "6 min",
  },
];

// ─── Áreas de atuação ────────────────────────────────────────────────────────
const AREAS = [
  { label: "Liderança & Pessoas", icon: "👥" },
  { label: "Cultura Ágil & OKRs", icon: "⚡" },
  { label: "Engenharia de Dados", icon: "📊" },
  { label: "Transformação Digital", icon: "🚀" },
];

// ─── Componente: Badge de categoria ─────────────────────────────────────────
function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
      {label}
    </span>
  );
}

// ─── Componente: Card de post ────────────────────────────────────────────────
function PostCard({
  post,
}: {
  post: (typeof FEATURED_POSTS)[0];
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all duration-200"
    >
      {/* Imagem placeholder — substituir por next/image depois */}
      <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Imagem do artigo
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <CategoryBadge label={post.tag} />

        <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-xs text-gray-400">{post.date}</span>
          <span className="text-xs text-gray-400">{post.readTime} de leitura</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Página: Home ─────────────────────────────────────────────────────────────
export default function Home() {
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
            {["Home", "Sobre", "Blog", "Contato"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`text-sm transition-colors ${
                  item === "Home"
                    ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-0.5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-white pt-20 pb-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Texto */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-blue-600 tracking-wide uppercase">
                Blog & Portfólio
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Olá, sou{" "}
                <span className="text-blue-600">Guilherme Reis</span>
              </h1>
              <p className="text-base text-gray-500 leading-relaxed max-w-lg">
                {PROFILE.subtitle}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-lg text-sm">
              {PROFILE.bio}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/blog"
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver artigos
              </Link>
              <Link
                href="/sobre"
                className="px-5 py-2.5 border border-blue-200 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sobre mim
              </Link>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Avatar placeholder */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
              Sua foto aqui
            </div>
          </div>
        </div>
      </section>

      {/* ── ÁREAS DE ATUAÇÃO ── */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AREAS.map((area) => (
              <div
                key={area.label}
                className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3"
              >
                <span className="text-xl">{area.icon}</span>
                <span className="text-sm font-medium text-blue-800">
                  {area.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTIGOS EM DESTAQUE ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Artigos em destaque
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Liderança, ágil, dados e transformação digital — na prática
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm text-blue-600 hover:underline font-medium hidden sm:block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_POSTS.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Ver todos os artigos →
          </Link>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            Vamos trocar experiências?
          </h2>
          <p className="text-blue-100 text-sm max-w-md">
            Se você atua em TI, lidera times ou está em processo de transformação
            digital, conecte-se comigo no LinkedIn.
          </p>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3 bg-white text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Conectar no LinkedIn
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>
            © 2025 · Guilherme C. Q. Reis · Gerente de TI & Desenvolvimento
          </span>
          <div className="flex gap-5">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
