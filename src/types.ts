/**
 * ISO 3166-1 alpha-2 country code (e.g., 'US', 'IN')
 */
export type ISO3166A2Code = string;

/**
 * Official capital city name (e.g., 'Washington, D.C.', 'New Delhi')
 */
export type CapitalCityName = string;

/**
 * Interface defining the structure of the country-to-capital mapping
 * where keys are ISO 3166-1 alpha-2 country codes and values are capital city names
 */
export interface CountryCapitalData {
  [countryCode: ISO3166A2Code]: CapitalCityName;
}
