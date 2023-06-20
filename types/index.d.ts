// Type definitions for Gimbal Airship Adapter 1.0.0
// Project: https://github.com/gimbalinc/airship-adapter-cordova
// Definitions by: Infillion https://infillion.com/

/**
 * This plugin provides the API for enabling and disabling the Gimbal Airship Adapter.
 */
declare class GimbalAirshipAdapter {
  static start(
    apiKey: string,
    success: () => void,
    error: () => void
  ): void;

  static stop(
    success: () => void,
    error: () => void
  ): void;
}