import { range } from "./arrays.functions";

export type PhoneRegionCode = '40' | '359';
export type CountryOfOrigin = 'Romania' | 'Bulgaria';
export type GuestStatus = 'scheduled' | 'checked-in' | 'checked-out';
export type ComvexLang = 'ro' | 'en';
export type ComvexCountry = 'bg' | 'ro';
export type ComvexLocale = 'ro-RO' | 'en-GB';

export function comvexCountriesOfOrigin(): CountryOfOrigin[] {
  return ['Romania', 'Bulgaria'];
}

export function comvexHarvestYears(): number[] {
  const year = new Date().getFullYear();
  const harvestMaxAge = 3;
  return range(year - harvestMaxAge, year + 1);
}

export function comvexPhoneRegionCodes(): PhoneRegionCode[] {
  return ['40', '359'];
}

export function comvexLangs(): ComvexLang[] {
  return ['en', 'ro'];
}

export function comvexLocales(): ComvexLocale[] {
  return ['en-GB', 'ro-RO'];
}

export function langToLocaleMapping(): { [key in ComvexLang]: ComvexLocale } {
  return {
    en: 'en-GB',
    ro: 'ro-RO',
  };
}
