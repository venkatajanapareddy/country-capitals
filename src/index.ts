import { ISO3166A2Code, CapitalCityName } from './types';
import { countryCapitals } from './data';

/**
 * Export the country-to-capital mapping data
 */
export { countryCapitals } from './data';

/**
 * Export types
 */
export * from './types';

/**
 * Gets the capital city name for a given country code
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (case-insensitive)
 * @returns The capital city name or undefined if not found
 *
 * @example
 * ```typescript
 * getCapital('US'); // returns "Washington, D.C."
 * getCapital('us'); // returns "Washington, D.C." (case-insensitive)
 * getCapital('ZZ'); // returns undefined (invalid code)
 * ```
 */
export function getCapital(countryCode: string): CapitalCityName | undefined {
  if (!countryCode || typeof countryCode !== 'string') {
    return undefined;
  }

  const normalizedCode = countryCode.toUpperCase();
  return countryCapitals[normalizedCode];
}

/**
 * Gets the country code for a given capital city name
 *
 * @param capitalName - The capital city name (case-insensitive)
 * @returns The ISO 3166-1 alpha-2 country code or undefined if not found
 *
 * @example
 * ```typescript
 * getCountryCode('Washington, D.C.'); // returns "US"
 * getCountryCode('paris'); // returns "FR" (case-insensitive)
 * getCountryCode('Unknown City'); // returns undefined
 * ```
 */
export function getCountryCode(capitalName: string): ISO3166A2Code | undefined {
  if (!capitalName || typeof capitalName !== 'string') {
    return undefined;
  }

  const normalizedCapital = capitalName.toLowerCase();
  const entries = Object.entries(countryCapitals);

  for (const [code, capital] of entries) {
    if (capital.toLowerCase() === normalizedCapital) {
      return code;
    }
  }

  return undefined;
}

/**
 * Checks if the provided string is a valid capital city name
 *
 * @param capitalName - The capital city name to check (case-insensitive)
 * @returns True if the capital exists in the dataset, false otherwise
 *
 * @example
 * ```typescript
 * isCapital('London'); // returns true
 * isCapital('PARIS'); // returns true (case-insensitive)
 * isCapital('Fake City'); // returns false
 * ```
 */
export function isCapital(capitalName: string): boolean {
  return getCountryCode(capitalName) !== undefined;
}

/**
 * Checks if the provided string is a valid ISO 3166-1 alpha-2 country code
 *
 * @param countryCode - The country code to check (case-insensitive)
 * @returns True if the country code exists in the dataset, false otherwise
 *
 * @example
 * ```typescript
 * isCountryCode('US'); // returns true
 * isCountryCode('fr'); // returns true (case-insensitive)
 * isCountryCode('ZZ'); // returns false
 * ```
 */
export function isCountryCode(countryCode: string): boolean {
  if (!countryCode || typeof countryCode !== 'string') {
    return false;
  }

  const normalizedCode = countryCode.toUpperCase();
  return normalizedCode in countryCapitals;
}
