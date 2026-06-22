export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line py-8">
      <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted sm:px-6">
        Dados fornecidos pela{" "}
        <a
          href="https://jolpi.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Jolpica F1 API
        </a>
        . Projeto pessoal, sem vínculo com a Formula 1.
      </p>
    </footer>
  );
}
