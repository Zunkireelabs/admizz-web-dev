import { countries } from "./countries";
import type { CountrySlug } from "./types";

// State (UK: county) for each campus city, so a location reads "York, North Yorkshire, United Kingdom".
// Every current university is in the UK; add other countries' cities here when they are listed.
const CITY_STATE: Record<string, string> = {
  Aylesbury: "Buckinghamshire",
  Bangor: "Gwynedd",
  Bath: "Somerset",
  Bedford: "Bedfordshire",
  Birmingham: "West Midlands",
  Bradford: "West Yorkshire",
  Brighton: "East Sussex",
  Bristol: "Bristol",
  Cambridge: "Cambridgeshire",
  Canterbury: "Kent",
  Cardiff: "Cardiff",
  Carlisle: "Cumbria",
  Carmarthen: "Carmarthenshire",
  Chelmsford: "Essex",
  Chester: "Cheshire",
  Colchester: "Essex",
  Coventry: "West Midlands",
  Cumbria: "Cumbria",
  Dagenham: "Greater London",
  Dundee: "Dundee",
  Edgmond: "Shropshire",
  Edinburgh: "Edinburgh",
  Epsom: "Surrey",
  Farnham: "Surrey",
  Hatfield: "Hertfordshire",
  Hertfordshire: "Hertfordshire",
  "High Wycombe": "Buckinghamshire",
  Hove: "East Sussex",
  Hull: "East Yorkshire",
  Kirkcaldy: "Fife",
  Lancaster: "Lancashire",
  Leeds: "West Yorkshire",
  Liverpool: "Merseyside",
  London: "Greater London",
  Luton: "Bedfordshire",
  Manchester: "Greater Manchester",
  Plymouth: "Devon",
  Portsmouth: "Hampshire",
  Preston: "Lancashire",
  Scotland: "Scotland",
  Stoke: "Staffordshire",
  Sunderland: "Tyne and Wear",
  Swansea: "Swansea",
  "West Yorkshire": "West Yorkshire",
  Winchester: "Hampshire",
  Wolverhampton: "West Midlands",
  Worcester: "Worcestershire",
  York: "North Yorkshire",
};

/**
 * One line per campus: "York, North Yorkshire, United Kingdom". A state that is the same as its city
 * (e.g. Cardiff) is not repeated. `withCountry: false` drops the country.
 */
export function locationLines(cities: string[], country: CountrySlug, { withCountry = true, maxCities = 10 } = {}): string[] {
  return cities.slice(0, maxCities).map((city) => {
    const state = CITY_STATE[city];
    const parts = [city, state && state !== city ? state : "", withCountry ? countries[country].name : ""];
    return parts.filter(Boolean).join(", ");
  });
}

/** All campuses on one line, for tight spaces such as cards: "London, Greater London · York, North Yorkshire". */
export function formatLocation(cities: string[], country: CountrySlug, opts: { withCountry?: boolean; maxCities?: number } = {}) {
  return locationLines(cities, country, opts).join(" · ");
}
