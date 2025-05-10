#!/usr/bin/env node

import { getCapital, getCountryCode, isCapital, isCountryCode } from './index';

// Get the query from command line arguments
const query = process.argv[2];

if (!query) {
  console.log(`
country-capitals CLI

Usage:
  npx country-capitals <query>

Examples:
  npx country-capitals US        # Outputs "Washington, D.C."
  npx country-capitals Paris     # Outputs "FR"
  npx country-capitals --help    # Displays this help message
  `);
  process.exit(0);
}

if (query === '--help' || query === '-h') {
  console.log(`
country-capitals CLI

Usage:
  npx country-capitals <query>

Examples:
  npx country-capitals US        # Outputs "Washington, D.C."
  npx country-capitals Paris     # Outputs "FR"
  npx country-capitals --help    # Displays this help message
  `);
  process.exit(0);
}

// First, check if the query is a country code
if (isCountryCode(query)) {
  const capital = getCapital(query);
  console.log(capital);
  process.exit(0);
}

// Next, check if the query is a capital city
if (isCapital(query)) {
  const countryCode = getCountryCode(query);
  console.log(countryCode);
  process.exit(0);
}

// If we get here, the query is neither a valid country code nor a valid capital
console.error(`Error: "${query}" is not a recognized country code or capital city name.`);
process.exit(1);
