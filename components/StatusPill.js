const STYLES = {
  done: "border-line text-muted",
  next: "border-accent text-accent",
  upcoming: "border-line text-text",
};

const LABELS = {
  done: "Concluída",
  next: "Próxima",
  upcoming: "Em breve",
};

export default function StatusPill({ status }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
        STYLES[status] ?? STYLES.upcoming
      }`}
    >
      {LABELS[status] ?? LABELS.upcoming}
    </span>
  );
}
