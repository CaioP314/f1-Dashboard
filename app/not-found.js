import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-6xl font-black text-accent">404</p>
      <h1 className="mt-4 text-xl font-bold uppercase tracking-tight text-text">Fora da pista</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Essa página não existe, ou o piloto/corrida que você procurava não foi encontrado.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-sm border border-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
