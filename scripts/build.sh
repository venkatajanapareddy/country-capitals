#!/bin/bash

# Create necessary directories
mkdir -p dist

# Install dependencies
npm install

# Run linting
npm run lint

# Run tests
npm run test

# Build the library
npm run build

echo "Build completed successfully!" 