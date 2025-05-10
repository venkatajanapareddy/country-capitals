// test-lib.js
import {
  getCapital,
  getCountryCode,
  isCountryCode,
  isCapital,
} from './dist/index.mjs';

// Test getCapital
console.log('Testing getCapital:');
console.log(`US -> ${getCapital('US')}`);
console.log(`FR -> ${getCapital('FR')}`);
console.log(`JP -> ${getCapital('JP')}`);
console.log(`ZZ (invalid) -> ${getCapital('ZZ')}`);
console.log();

// Test getCountryCode
console.log('Testing getCountryCode:');
console.log(`Washington, D.C. -> ${getCountryCode('Washington, D.C.')}`);
console.log(`Paris -> ${getCountryCode('Paris')}`);
console.log(`Tokyo -> ${getCountryCode('Tokyo')}`);
console.log(`Fake City (invalid) -> ${getCountryCode('Fake City')}`);
console.log();

// Test isCountryCode
console.log('Testing isCountryCode:');
console.log(`US -> ${isCountryCode('US')}`);
console.log(`FR -> ${isCountryCode('FR')}`);
console.log(`ZZ (invalid) -> ${isCountryCode('ZZ')}`);
console.log();

// Test isCapital
console.log('Testing isCapital:');
console.log(`Washington, D.C. -> ${isCapital('Washington, D.C.')}`);
console.log(`Paris -> ${isCapital('Paris')}`);
console.log(`Fake City (invalid) -> ${isCapital('Fake City')}`);
