export function formatDateLong(dateStr) {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateStr}T00:00:00Z`));
}

const STATUS_LABELS = {
  Finished: "Completou",
  Retired: "Abandonou",
  Accident: "Acidente",
  Collision: "Colisão",
  Engine: "Motor",
  Gearbox: "Câmbio",
  Disqualified: "Desclassificado",
  "Did not qualify": "Não classificou",
  "Did not start": "Não largou",
  Withdrawn: "Desistiu",
};

export function statusLabel(status) {
  if (!status) return "";
  if (status.startsWith("+")) {
    return status.replace("Laps", "Voltas").replace("Lap", "Volta");
  }
  return STATUS_LABELS[status] ?? status;
}
