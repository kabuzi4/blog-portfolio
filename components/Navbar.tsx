"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home",    href: "/" },
  { label: "Sobre",   href: "/sobre" },
  { label: "Blog",    href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-base font-bold text-gray-900 tracking-tight leading-tight">
            Guilherme Reis
          </span>
          <span className="hidden sm:block text-xs text-gray-400 leading-tight">
            Gerente de TI & Desenvolvimento
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-0.5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
