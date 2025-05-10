# country-capitals

[![npm version](https://img.shields.io/npm/v/country-capitals.svg)](https://www.npmjs.com/package/country-capitals)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/venkatajanapareddy/country-capitals/actions/workflows/ci.yml/badge.svg)](https://github.com/venkatajanapareddy/country-capitals/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/country-capitals)](https://bundlephobia.com/package/country-capitals)

A fully typed mapping of countries (ISO 3166-1 alpha-2 codes) to their official capital cities with zero runtime dependencies.

## Features

- 🌍 Complete mapping of ISO 3166-1 alpha-2 country codes to capital cities
- 📦 Zero runtime dependencies
- 🔍 Utility functions for capital <-> country code lookups
- 💪 Fully written in TypeScript with strict typing
- 🔧 Built-in CLI for quick lookups
- 📕 Comprehensive documentation and examples
- ✅ Well-tested with high test coverage
- 📄 MIT licensed

## Installation

```bash
# Using npm
npm install country-capitals

# Using yarn
yarn add country-capitals

# Using pnpm
pnpm add country-capitals
```

## Usage Examples

### Direct Data Access

```typescript
import { countryCapitals } from 'country-capitals';

// Access capital cities directly using country codes
console.log(countryCapitals.US); // Output: "Washington, D.C."
console.log(countryCapitals.FR); // Output: "Paris"
console.log(countryCapitals.JP); // Output: "Tokyo"
```

### Utility Functions

```typescript
import {
  getCapital,
  getCountryCode,
  isCapital,
  isCountryCode
} from 'country-capitals';

// Get capital by country code (case-insensitive)
getCapital('US'); // "Washington, D.C."
getCapital('us'); // "Washington, D.C."
getCapital('ZZ'); // undefined (invalid code)

// Get country code by capital name (case-insensitive)
getCountryCode('Paris'); // "FR"
getCountryCode('paris'); // "FR"
getCountryCode('Unknown City'); // undefined

// Validate capital names
isCapital('London'); // true
isCapital('PARIS'); // true (case-insensitive)
isCapital('Fake City'); // false

// Validate country codes
isCountryCode('US'); // true
isCountryCode('fr'); // true (case-insensitive)
isCountryCode('ZZ'); // false (invalid code)
```

### Using with JSON Data

For non-TypeScript environments or if you prefer direct JSON access:

```javascript
// ESM
import countryCapitalsData from 'country-capitals/json';

// CommonJS
const countryCapitalsData = require('country-capitals/json');
```

### Command Line Interface (CLI)

The package includes a CLI for quick lookups:

```bash
# Look up a capital by country code
npx country-capitals US  # Output: Washington, D.C.

# Look up a country code by capital
npx country-capitals Paris  # Output: FR

# Display help
npx country-capitals --help
```

## API Reference

### Data Exports

- `countryCapitals: Readonly<CountryCapitalData>` - Map of ISO 3166-1 alpha-2 country codes to capital city names

### Type Exports

- `ISO3166A2Code` - Type for ISO 3166-1 alpha-2 country codes (e.g., 'US', 'IN')
- `CapitalCityName` - Type for capital city names (e.g., 'Washington, D.C.', 'New Delhi')
- `CountryCapitalData` - Interface for the country-to-capital mapping

### Function Exports

- `getCapital(countryCode: string): CapitalCityName | undefined` - Returns capital city for a given country code
- `getCountryCode(capitalName: string): ISO3166A2Code | undefined` - Returns country code for a given capital city
- `isCapital(capitalName: string): boolean` - Checks if a city name is a valid capital
- `isCountryCode(countryCode: string): boolean` - Checks if a country code is valid

## Data Source

The country-to-capital mapping is sourced from official international references and curated for accuracy. Primary sources include the UN, ISO standards, and official government data.

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
