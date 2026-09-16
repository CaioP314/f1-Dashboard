// Documentação da API: https://github.com/jolpica/jolpica-f1/tree/main/docs

const API_BASE = "https://api.jolpi.ca/ergast/f1";

async function apiFetch(path, { revalidate = 1800 } = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(`Jolpica API respondeu ${res.status} para ${path}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`Falha ao buscar ${path}:`, err);
    return null;
  }
}

export async function getCurrentSeasonRaces() {
  const data = await apiFetch("/current/races/?limit=40", { revalidate: 1800 });
  return data?.MRData?.RaceTable?.Races ?? [];
}

export async function getRaceSchedule(season, round) {
  const data = await apiFetch(`/${season}/${round}/`, { revalidate: 1800 });
  return data?.MRData?.RaceTable?.Races?.[0] ?? null;
}

export async function getCurrentDriverStandings() {
  const data = await apiFetch("/current/driverstandings/?limit=40", {
    revalidate: 1800,
  });
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
}

export async function getDriverInfo(driverId) {
  const data = await apiFetch(`/current/drivers/${driverId}/`, { revalidate: 86400 });
  return data?.MRData?.DriverTable?.Drivers?.[0] ?? null;
}

export async function getDriverCurrentStanding(driverId) {
  const data = await apiFetch(`/current/drivers/${driverId}/driverstandings/`, {
    revalidate: 1800,
  });
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings?.[0] ?? null;
}

export async function getDriverResults(driverId) {
  const data = await apiFetch(`/current/drivers/${driverId}/results/?limit=40`, {
    revalidate: 1800,
  });
  return data?.MRData?.RaceTable?.Races ?? [];
}

export async function getRaceResults(season, round) {
  const data = await apiFetch(`/${season}/${round}/results/?limit=40`, {
    revalidate: 1800,
  });
  return data?.MRData?.RaceTable?.Races?.[0] ?? null;
}
