import Link from "next/link";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/races", label: "Corridas" },
  { href: "/drivers", label: "Pilotos" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-black tracking-tight text-text">
          <span className="h-2 w-2 rounded-full bg-accent" />
          F1<span className="text-accent">HUB</span>
        </Link>

        <nav className="flex gap-1 text-xs font-semibold uppercase tracking-widest">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
