import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span>© 2025 · Guilherme C. Q. Reis · Gerente de TI & Desenvolvimento</span>
        <div className="flex gap-5">
          <a
            href="https://www.linkedin.com/in/guilherme-reis-ti"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          /*
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors" 
            >
              GitHub
            </a>
          */
        </div>
      </div>
    </footer>
  );
}
