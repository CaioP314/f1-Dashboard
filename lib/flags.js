const COUNTRY_CODES = {
  Bahrain: "bh",
  "Saudi Arabia": "sa",
  Australia: "au",
  Japan: "jp",
  China: "cn",
  USA: "us",
  "United States": "us",
  Italy: "it",
  Monaco: "mc",
  Spain: "es",
  Canada: "ca",
  Austria: "at",
  UK: "gb",
  "United Kingdom": "gb",
  Belgium: "be",
  Hungary: "hu",
  Netherlands: "nl",
  Azerbaijan: "az",
  Singapore: "sg",
  Mexico: "mx",
  Brazil: "br",
  Qatar: "qa",
  UAE: "ae",
  "United Arab Emirates": "ae",
  Portugal: "pt",
  France: "fr",
  Germany: "de",
  Turkey: "tr",
  Russia: "ru",
  India: "in",
  Malaysia: "my",
};

const NATIONALITY_CODES = {
  British: "gb",
  Dutch: "nl",
  Monegasque: "mc",
  Spanish: "es",
  Mexican: "mx",
  French: "fr",
  German: "de",
  Finnish: "fi",
  Australian: "au",
  Canadian: "ca",
  Japanese: "jp",
  Thai: "th",
  Danish: "dk",
  American: "us",
  Chinese: "cn",
  "New Zealander": "nz",
  Brazilian: "br",
  Italian: "it",
  Argentine: "ar",
  Argentinian: "ar",
  Austrian: "at",
  Belgian: "be",
  Swiss: "ch",
  Polish: "pl",
  Russian: "ru",
  Indian: "in",
  Colombian: "co",
  Swedish: "se",
  Indonesian: "id",
  Hungarian: "hu",
  Portuguese: "pt",
  Irish: "ie",
  Venezuelan: "ve",
};

/** "Brazil" -> "br" (ou null se não estiver mapeado) */
export function countryCode(country) {
  return COUNTRY_CODES[country] ?? null;
}

/** "Brazilian" -> "br" (ou null se não estiver mapeado) */
export function nationalityCode(nationality) {
  return NATIONALITY_CODES[nationality] ?? null;
}
