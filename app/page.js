import Link from "next/link";
import { getCurrentSeasonRaces, getRaceResults } from "@/lib/api";
import { formatDateLong } from "@/lib/format";
import { countryCode, nationalityCode } from "@/lib/flags";
import CountdownTimer from "@/components/CountdownTimer";
import NumBadge from "@/components/NumBadge";
import FlagImage from "@/components/FlagImage";

export const revalidate = 1800;

function getRaceDateTime(race) {
  const time = race.time ?? "00:00:00Z";
  return new Date(`${race.date}T${time}`);
}

export default async function Home() {
  const races = await getCurrentSeasonRaces();
  const now = new Date();

  const withDates = races.map((race) => ({ race, dateTime: getRaceDateTime(race) }));
  const past = withDates.filter((r) => r.dateTime < now);
  const nextEntry = withDates.find((r) => r.dateTime >= now);
  const nextRace = nextEntry?.race;
  const lastRace = past[past.length - 1]?.race;

  const lastResults = lastRace ? await getRaceResults(lastRace.season, lastRace.round) : null;
  const podium = lastResults?.Results?.slice(0, 3) ?? [];

  if (races.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm text-muted">
          Não foi possível carregar os dados da Jolpica F1 API agora. Tente novamente em instantes.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="border-b border-line pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Temporada {races[0]?.season} {nextRace ? `· Rodada ${nextRace.round}` : ""}
        </p>

        {nextRace ? (
          <>
            <h1 className="mt-3 flex items-center gap-4 text-4xl font-black uppercase leading-[0.95] tracking-tight text-text sm:text-6xl">
              <FlagImage
                code={countryCode(nextRace.Circuit.Location.country)}
                label={nextRace.Circuit.Location.country}
                size="lg"
              />
              {nextRace.raceName}
            </h1>
            <p className="mt-3 text-sm text-muted">
              {nextRace.Circuit.circuitName} · {nextRace.Circuit.Location.locality},{" "}
              {nextRace.Circuit.Location.country} · {formatDateLong(nextRace.date)}
            </p>

            <div className="mt-8">
              <CountdownTimer targetDate={getRaceDateTime(nextRace).toISOString()} />
            </div>

            <Link
              href={`/races/${nextRace.season}/${nextRace.round}`}
              className="mt-8 inline-block rounded-sm border border-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              Ver detalhes da corrida →
            </Link>
          </>
        ) : (
          <h1 className="mt-3 text-3xl font-black uppercase text-text">
            Temporada {races[0]?.season} encerrada
          </h1>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Calendário</h2>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {withDates.map(({ race, dateTime }) => {
            const isDone = dateTime < now;
            const isNext = race === nextRace;
            return (
              <Link
                key={`${race.season}-${race.round}`}
                href={`/races/${race.season}/${race.round}`}
                className="flex shrink-0 flex-col items-center gap-2"
                title={race.raceName}
              >
                <NumBadge
                  value={String(race.round).padStart(2, "0")}
                  tone={isNext ? "accent" : "plain"}
                  className={isDone ? "opacity-50" : ""}
                />
                <FlagImage
                  code={countryCode(race.Circuit.Location.country)}
                  label={race.Circuit.Location.country}
                  size="sm"
                  className={isDone ? "opacity-40" : ""}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {podium.length > 0 && lastRace && (
        <section className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
              Pódio · {lastRace.raceName}
            </h2>
            <Link
              href={`/races/${lastRace.season}/${lastRace.round}`}
              className="shrink-0 text-xs text-accent hover:underline"
            >
              Resultado completo →
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {podium.map((r) => (
              <Link
                key={r.Driver.driverId}
                href={`/drivers/${r.Driver.driverId}`}
                className="flex items-center gap-3 rounded-sm border border-line bg-surface p-4 transition-colors hover:border-accent"
              >
                <NumBadge
                  value={r.position}
                  size="lg"
                  tone={r.position === "1" ? "gold" : r.position === "2" ? "silver" : "bronze"}
                />
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate font-bold uppercase tracking-tight text-text">
                    <FlagImage
                      code={nationalityCode(r.Driver.nationality)}
                      label={r.Driver.nationality}
                      size="sm"
                    />
                    {r.Driver.givenName} {r.Driver.familyName}
                  </p>
                  <p className="truncate text-xs text-muted">{r.Constructor.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
