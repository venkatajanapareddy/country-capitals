import { describe, it, expect } from 'vitest';
import {
  countryCapitals,
  getCapital,
  getCountryCode,
  isCapital,
  isCountryCode,
} from '../src';

describe('countryCapitals', () => {
  it('should export the map as an object', () => {
    expect(countryCapitals).toBeDefined();
    expect(typeof countryCapitals).toBe('object');
  });

  it('should have the correct structure with country codes as keys and capital names as values', () => {
    expect(Object.keys(countryCapitals).length).toBeGreaterThan(0);

    // Check some known mappings
    expect(countryCapitals.US).toBe('Washington, D.C.');
    expect(countryCapitals.GB).toBe('London');
    expect(countryCapitals.FR).toBe('Paris');
    expect(countryCapitals.JP).toBe('Tokyo');
    expect(countryCapitals.AU).toBe('Canberra');
  });

  it('should contain valid ISO 3166-1 alpha-2 country codes as keys', () => {
    const keys = Object.keys(countryCapitals);

    for (const key of keys) {
      expect(key.length).toBe(2);
      expect(key).toMatch(/^[A-Z]{2}$/);
    }
  });
});

describe('getCapital', () => {
  it('should return the correct capital city for a valid country code', () => {
    expect(getCapital('US')).toBe('Washington, D.C.');
    expect(getCapital('FR')).toBe('Paris');
    expect(getCapital('DE')).toBe('Berlin');
    expect(getCapital('CN')).toBe('Beijing');
    expect(getCapital('IN')).toBe('New Delhi');
  });

  it('should be case-insensitive for input country codes', () => {
    expect(getCapital('us')).toBe('Washington, D.C.');
    expect(getCapital('fr')).toBe('Paris');
    expect(getCapital('De')).toBe('Berlin');
  });

  it('should return undefined for invalid country codes', () => {
    expect(getCapital('ZZ')).toBeUndefined();
    expect(getCapital('XX')).toBeUndefined();
    expect(getCapital('123')).toBeUndefined();
  });

  it('should handle edge cases gracefully', () => {
    // @ts-expect-error Testing with invalid input
    expect(getCapital(null)).toBeUndefined();
    // @ts-expect-error Testing with invalid input
    expect(getCapital(undefined)).toBeUndefined();
    expect(getCapital('')).toBeUndefined();
  });
});

describe('getCountryCode', () => {
  it('should return the correct country code for a valid capital city', () => {
    expect(getCountryCode('Washington, D.C.')).toBe('US');
    expect(getCountryCode('Paris')).toBe('FR');
    expect(getCountryCode('Berlin')).toBe('DE');
    expect(getCountryCode('Beijing')).toBe('CN');
    expect(getCountryCode('New Delhi')).toBe('IN');
  });

  it('should be case-insensitive for input capital names', () => {
    expect(getCountryCode('washington, d.c.')).toBe('US');
    expect(getCountryCode('PARIS')).toBe('FR');
    expect(getCountryCode('berlin')).toBe('DE');
  });

  it('should return undefined for invalid capital cities', () => {
    expect(getCountryCode('Fake City')).toBeUndefined();
    expect(getCountryCode('Not A Capital')).toBeUndefined();
  });

  it('should handle edge cases gracefully', () => {
    // @ts-expect-error Testing with invalid input
    expect(getCountryCode(null)).toBeUndefined();
    // @ts-expect-error Testing with invalid input
    expect(getCountryCode(undefined)).toBeUndefined();
    expect(getCountryCode('')).toBeUndefined();
  });
});

describe('isCapital', () => {
  it('should return true for valid capital cities', () => {
    expect(isCapital('London')).toBe(true);
    expect(isCapital('Paris')).toBe(true);
    expect(isCapital('Tokyo')).toBe(true);
    expect(isCapital('Washington, D.C.')).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(isCapital('london')).toBe(true);
    expect(isCapital('PARIS')).toBe(true);
    expect(isCapital('Tokyo')).toBe(true);
    expect(isCapital('washington, d.c.')).toBe(true);
  });

  it('should return false for invalid capital cities', () => {
    expect(isCapital('Fake City')).toBe(false);
    expect(isCapital('Not A Capital')).toBe(false);
  });

  it('should handle edge cases gracefully', () => {
    // @ts-expect-error Testing with invalid input
    expect(isCapital(null)).toBe(false);
    // @ts-expect-error Testing with invalid input
    expect(isCapital(undefined)).toBe(false);
    expect(isCapital('')).toBe(false);
  });
});

describe('isCountryCode', () => {
  it('should return true for valid country codes', () => {
    expect(isCountryCode('US')).toBe(true);
    expect(isCountryCode('GB')).toBe(true);
    expect(isCountryCode('DE')).toBe(true);
    expect(isCountryCode('JP')).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(isCountryCode('us')).toBe(true);
    expect(isCountryCode('gb')).toBe(true);
    expect(isCountryCode('De')).toBe(true);
    expect(isCountryCode('jp')).toBe(true);
  });

  it('should return false for invalid country codes', () => {
    expect(isCountryCode('ZZ')).toBe(false);
    expect(isCountryCode('XX')).toBe(false);
    expect(isCountryCode('123')).toBe(false);
    expect(isCountryCode('USAA')).toBe(false);
  });

  it('should handle edge cases gracefully', () => {
    // @ts-expect-error Testing with invalid input
    expect(isCountryCode(null)).toBe(false);
    // @ts-expect-error Testing with invalid input
    expect(isCountryCode(undefined)).toBe(false);
    expect(isCountryCode('')).toBe(false);
  });
});
