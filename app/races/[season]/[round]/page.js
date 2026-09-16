import Link from "next/link";
import { notFound } from "next/navigation";
import { getRaceResults, getRaceSchedule } from "@/lib/api";
import { formatDateLong } from "@/lib/format";
import { countryCode } from "@/lib/flags";
import NumBadge from "@/components/NumBadge";
import FlagImage from "@/components/FlagImage";
import ResultsTable from "@/components/ResultsTable";

export const revalidate = 1800;

const sessionLabels = {
  FirstPractice: "Treino livre 1",
  SecondPractice: "Treino livre 2",
  ThirdPractice: "Treino livre 3",
  Sprint: "Sprint",
  Qualifying: "Classificação",
  Race: "Corrida",
};

function formatSessionDate(session) {
  if (!session?.date) return "Data a confirmar";

  const parts = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(new Date(`${session.date}T00:00:00Z`));
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.day} ${values.month} ${values.year}`;
}

function formatSessionTime(session) {
  if (!session?.date || !session?.time) return "Horário a confirmar";

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(`${session.date}T${session.time}`));
}

function getSessions(race) {
  return [
    "FirstPractice",
    "SecondPractice",
    "ThirdPractice",
    "Sprint",
    "Qualifying",
  ]
    .filter((sessionName) => race[sessionName])
    .map((sessionName) => ({
      name: sessionLabels[sessionName],
      session: race[sessionName],
    }))
    .concat({
      name: sessionLabels.Race,
      session: { date: race.date, time: race.time },
    });
}

export default async function RaceDetailPage({ params }) {
  const { season, round } = await params;
  const [resultsRace, scheduleRace] = await Promise.all([
    getRaceResults(season, round),
    getRaceSchedule(season, round),
  ]);
  const race = scheduleRace ?? resultsRace;

  if (!race) notFound();

  const results = resultsRace?.Results ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <Link href="/races" className="text-xs uppercase tracking-widest text-muted hover:text-accent">
        ← Corridas
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <NumBadge value={String(race.round).padStart(2, "0")} size="lg" tone="accent" />
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black uppercase tracking-tight text-text sm:text-4xl">
            <FlagImage
              code={countryCode(race.Circuit.Location.country)}
              label={race.Circuit.Location.country}
              size="md"
            />
            {race.raceName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {race.Circuit.circuitName} · {race.Circuit.Location.locality},{" "}
            {race.Circuit.Location.country} · {formatDateLong(race.date)}
          </p>
        </div>
      </div>

      {results.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Resultado</h2>
          <div className="mt-4">
            <ResultsTable results={results} />
          </div>
        </section>
      ) : (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            Programação
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {getSessions(race).map(({ name, session }) => (
              <div
                key={name}
                className="flex items-center justify-between gap-4 border border-line bg-surface p-4"
              >
                <div>
                  <p
                    className="font-mono text-lg font-black uppercase tracking-tight text-accent sm:text-xl"
                  >
                    {name}
                  </p>
                  <p className="mt-1 text-base text-muted">{formatSessionDate(session)}</p>
                </div>
                <p className="shrink-0 text-right font-mono text-base tabular-nums text-text">
                  {formatSessionTime(session)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
