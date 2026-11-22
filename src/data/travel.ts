export type Region = "Europe" | "Middle East & Asia" | "Africa" | "Americas";

export type Place = {
  /** ISO 3166 numeric code, matching the map's country ids. */
  id: string;
  name: string;
  region: Region;
  /** Where the flight line lands: the capital, as a neutral point. */
  lon: number;
  lat: number;
  /** Too small to see at world scale, so it gets a marker. */
  tiny?: boolean;
};

export const home: Place = {
  id: "818",
  name: "Egypt",
  region: "Africa",
  lon: 31.24,
  lat: 30.04,
};

/** Countries and territories Eyad has visited, in the order he listed them. */
export const visited: Place[] = [
  { id: "250", name: "France", region: "Europe", lon: 2.35, lat: 48.86 },
  { id: "724", name: "Spain", region: "Europe", lon: -3.7, lat: 40.42 },
  { id: "276", name: "Germany", region: "Europe", lon: 13.4, lat: 52.52 },
  { id: "380", name: "Italy", region: "Europe", lon: 12.5, lat: 41.9 },
  { id: "643", name: "Russia", region: "Europe", lon: 37.62, lat: 55.75 },
  { id: "840", name: "USA", region: "Americas", lon: -77.04, lat: 38.9 },
  { id: "826", name: "England", region: "Europe", lon: -0.13, lat: 51.51 },
  { id: "620", name: "Portugal", region: "Europe", lon: -9.14, lat: 38.72 },
  { id: "040", name: "Austria", region: "Europe", lon: 16.37, lat: 48.21 },
  { id: "756", name: "Switzerland", region: "Europe", lon: 7.45, lat: 46.95 },
  {
    id: "203",
    name: "Czech Republic",
    region: "Europe",
    lon: 14.42,
    lat: 50.08,
  },
  { id: "348", name: "Hungary", region: "Europe", lon: 19.04, lat: 47.5 },
  {
    id: "292",
    name: "Gibraltar",
    region: "Europe",
    lon: -5.35,
    lat: 36.14,
    tiny: true,
  },
  {
    id: "784",
    name: "UAE",
    region: "Middle East & Asia",
    lon: 54.37,
    lat: 24.45,
  },
  { id: "788", name: "Tunisia", region: "Africa", lon: 10.18, lat: 36.81 },
  {
    id: "422",
    name: "Lebanon",
    region: "Middle East & Asia",
    lon: 35.5,
    lat: 33.89,
  },
  {
    id: "792",
    name: "Turkey",
    region: "Middle East & Asia",
    lon: 32.86,
    lat: 39.93,
  },
  {
    id: "458",
    name: "Malaysia",
    region: "Middle East & Asia",
    lon: 101.69,
    lat: 3.14,
  },
  {
    id: "702",
    name: "Singapore",
    region: "Middle East & Asia",
    lon: 103.82,
    lat: 1.35,
    tiny: true,
  },
  {
    id: "764",
    name: "Thailand",
    region: "Middle East & Asia",
    lon: 100.5,
    lat: 13.76,
  },
  {
    id: "336",
    name: "Vatican City",
    region: "Europe",
    lon: 12.45,
    lat: 41.9,
    tiny: true,
  },
  { id: "044", name: "Bahamas", region: "Americas", lon: -77.35, lat: 25.05 },
  { id: "703", name: "Slovakia", region: "Europe", lon: 17.11, lat: 48.15 },
  { id: "752", name: "Sweden", region: "Europe", lon: 18.07, lat: 59.33 },
  { id: "208", name: "Denmark", region: "Europe", lon: 12.57, lat: 55.68 },
  { id: "246", name: "Finland", region: "Europe", lon: 24.94, lat: 60.17 },
  {
    id: "682",
    name: "Saudi Arabia",
    region: "Middle East & Asia",
    lon: 46.68,
    lat: 24.71,
  },
  {
    id: "031",
    name: "Azerbaijan",
    region: "Middle East & Asia",
    lon: 49.87,
    lat: 40.41,
  },
  {
    id: "268",
    name: "Georgia",
    region: "Middle East & Asia",
    lon: 44.79,
    lat: 41.72,
  },
];

export const regions: Region[] = [
  "Europe",
  "Middle East & Asia",
  "Africa",
  "Americas",
];
