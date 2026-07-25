export type Airport = {
  icao: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  zoom: number;
  runways: string[];
};

export const airports: Airport[] = [
  {
    icao: "CYYZ",
    name: "Toronto Pearson International Airport",
    city: "Toronto",
    country: "Canada",
    latitude: 43.6777,
    longitude: -79.6248,
    zoom: 14,
    runways: [
      "05/23",
      "06L/24R",
      "06R/24L",
      "15L/33R",
      "15R/33L",
    ],
  },
];