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

// Import the CLI function
import { runCli, getHelpMessage } from '../src/cli';

describe('CLI', () => {
  // Use function types that match the runCli parameters
  let mockConsoleLog: (message: string) => void;
  let mockConsoleError: (message: string) => void;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Mock console.log and console.error
    mockConsoleLog = vi.fn();
    mockConsoleError = vi.fn();
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  it('should display help message when no arguments are provided', () => {
    const exitCode = runCli(undefined, mockConsoleLog, mockConsoleError);

    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    expect(mockConsoleLog).toHaveBeenCalledWith(getHelpMessage());
    expect(exitCode).toBe(0);
  });

  it('should display help message when --help flag is provided', () => {
    const exitCode = runCli('--help', mockConsoleLog, mockConsoleError);

    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    expect(mockConsoleLog).toHaveBeenCalledWith(getHelpMessage());
    expect(exitCode).toBe(0);
  });

  it('should look up capital by country code', () => {
    // Mock the utility functions for this test
    vi.mocked(isCountryCode).mockReturnValueOnce(true);
    vi.mocked(getCapital).mockReturnValueOnce('Washington, D.C.');

    const exitCode = runCli('US', mockConsoleLog, mockConsoleError);

    expect(isCountryCode).toHaveBeenCalledWith('US');
    expect(getCapital).toHaveBeenCalledWith('US');
    expect(mockConsoleLog).toHaveBeenCalledWith('Washington, D.C.');
    expect(exitCode).toBe(0);
  });

  it('should look up country code by capital', () => {
    // Mock the utility functions for this test
    vi.mocked(isCountryCode).mockReturnValueOnce(false);
    vi.mocked(isCapital).mockReturnValueOnce(true);
    vi.mocked(getCountryCode).mockReturnValueOnce('FR');

    const exitCode = runCli('Paris', mockConsoleLog, mockConsoleError);

    expect(isCountryCode).toHaveBeenCalledWith('Paris');
    expect(isCapital).toHaveBeenCalledWith('Paris');
    expect(getCountryCode).toHaveBeenCalledWith('Paris');
    expect(mockConsoleLog).toHaveBeenCalledWith('FR');
    expect(exitCode).toBe(0);
  });

  it('should show error for unrecognized input', () => {
    // Mock the utility functions for this test
    vi.mocked(isCountryCode).mockReturnValueOnce(false);
    vi.mocked(isCapital).mockReturnValueOnce(false);

    const exitCode = runCli('UnknownPlace', mockConsoleLog, mockConsoleError);

    expect(isCountryCode).toHaveBeenCalledWith('UnknownPlace');
    expect(isCapital).toHaveBeenCalledWith('UnknownPlace');
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error: "UnknownPlace" is not a recognized country code or capital city name.'
    );
    expect(exitCode).toBe(1);
  });
});
