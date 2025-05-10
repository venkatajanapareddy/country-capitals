import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the utility functions
vi.mock('../src/index', () => ({
  getCapital: vi.fn(),
  getCountryCode: vi.fn(),
  isCapital: vi.fn(),
  isCountryCode: vi.fn(),
}));

// Import the mocked functions
import {
  getCapital,
  getCountryCode,
  isCapital,
  isCountryCode,
} from '../src/index';

// Mock process and console before importing the CLI
const mockExit = vi.fn();
const mockArgv = ['node', 'script'];
const mockConsoleLog = vi.fn();
const mockConsoleError = vi.fn();

vi.mock('process', () => ({
  argv: mockArgv,
  exit: mockExit,
}));

vi.mock('console', () => ({
  log: mockConsoleLog,
  error: mockConsoleError,
}));

describe('CLI', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    // Reset process.argv mock
    mockArgv.length = 2; // Keep only 'node' and 'script'
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  it('should display help message when no arguments are provided', async () => {
    // Import the CLI, which will run immediately with the mocked environment
    await import('../src/cli');

    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog.mock.calls[0][0]).toContain('country-capitals CLI');
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('should display help message when --help flag is provided', async () => {
    // Setup argv with --help
    mockArgv.push('--help');

    // Import the CLI, which will run immediately
    await import('../src/cli');

    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog.mock.calls[0][0]).toContain('country-capitals CLI');
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('should look up capital by country code', async () => {
    // Setup argv with 'US'
    mockArgv.push('US');

    // Mock the utility functions for this test
    vi.mocked(isCountryCode).mockReturnValueOnce(true);
    vi.mocked(getCapital).mockReturnValueOnce('Washington, D.C.');

    // Import the CLI, which will run immediately
    await import('../src/cli');

    expect(isCountryCode).toHaveBeenCalledWith('US');
    expect(getCapital).toHaveBeenCalledWith('US');
    expect(mockConsoleLog).toHaveBeenCalledWith('Washington, D.C.');
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('should look up country code by capital', async () => {
    // Setup argv with 'Paris'
    mockArgv.push('Paris');

    // Mock the utility functions for this test
    vi.mocked(isCountryCode).mockReturnValueOnce(false);
    vi.mocked(isCapital).mockReturnValueOnce(true);
    vi.mocked(getCountryCode).mockReturnValueOnce('FR');

    // Import the CLI, which will run immediately
    await import('../src/cli');

    expect(isCountryCode).toHaveBeenCalledWith('Paris');
    expect(isCapital).toHaveBeenCalledWith('Paris');
    expect(getCountryCode).toHaveBeenCalledWith('Paris');
    expect(mockConsoleLog).toHaveBeenCalledWith('FR');
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it('should show error for unrecognized input', async () => {
    // Setup argv with 'UnknownPlace'
    mockArgv.push('UnknownPlace');

    // Mock the utility functions for this test
    vi.mocked(isCountryCode).mockReturnValueOnce(false);
    vi.mocked(isCapital).mockReturnValueOnce(false);

    // Import the CLI, which will run immediately
    await import('../src/cli');

    expect(isCountryCode).toHaveBeenCalledWith('UnknownPlace');
    expect(isCapital).toHaveBeenCalledWith('UnknownPlace');
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error: "UnknownPlace" is not a recognized country code or capital city name.'
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
