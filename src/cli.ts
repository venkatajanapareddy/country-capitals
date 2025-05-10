#!/usr/bin/env node

import { getCapital, getCountryCode, isCapital, isCountryCode } from './index';

/**
 * Display help message for the CLI
 * @returns The help message text
 */
export function getHelpMessage(): string {
  return `
country-capitals CLI

Usage:
  npx country-capitals <query>

Examples:
  npx country-capitals US        # Outputs "Washington, D.C."
  npx country-capitals Paris     # Outputs "FR"
  npx country-capitals --help    # Displays this help message
  `;
}

/**
 * Run the CLI logic
 * @param query The query string from command line
 * @param log Function to log output (defaults to console.log)
 * @param error Function to log errors (defaults to console.error)
 * @returns Exit code (0 for success, 1 for error)
 */
export function runCli(
  query: string | undefined,
  log: (message: string) => void = console.log,
  error: (message: string) => void = console.error
): number {
  if (!query) {
    log(getHelpMessage());
    return 0;
  }

  if (query === '--help' || query === '-h') {
    log(getHelpMessage());
    return 0;
  }

  // First, check if the query is a country code
  if (isCountryCode(query)) {
    const capital = getCapital(query);
    if (capital) {
      log(capital);
      return 0;
    }
  }

  // Next, check if the query is a capital city
  if (isCapital(query)) {
    const countryCode = getCountryCode(query);
    if (countryCode) {
      log(countryCode);
      return 0;
    }
  }

  // If we get here, the query is neither a valid country code nor a valid capital
  error(`Error: "${query}" is not a recognized country code or capital city name.`);
  return 1;
}

// Only run as script if this file is called directly (not imported)
if (require.main === module || process.env.NODE_ENV !== 'test') {
  // Get the query from command line arguments
  const query = process.argv[2];
  const exitCode = runCli(query);
  process.exit(exitCode);
}
