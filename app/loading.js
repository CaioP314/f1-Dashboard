export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 items-center justify-center px-4 py-24">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="h-2 w-2 animate-ping rounded-full bg-accent" />
        Carregando dados da pista...
      </div>
    </div>
  );
}
