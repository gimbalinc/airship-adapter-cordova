var exec = require('cordova/exec');

/**
 * A success callback without arguments
 *
 * @callback successCallback
 */

/**
 * A success callback that consumes a single boolean argument
 *
 * @callback booleanCallback
 * @param {boolean} value
 */

/**
 * An error callback without arguments
 * 
 * @callback errorCallback
 */

/**
 * Starts the Airship Adapter with the specified Gimbal API key, or a key from Cordova preferences.
 * Gimbal place events will trigger tracking of Airship CustomEvents or RegionEvents, if enabled
 * via preferences.
 * <p>
 * Note that each of your Gimbal Apps for iOS and Android will have unique API keys.
 * 
 * @param {?string} apiKey - the Gimbal API key, or {@code null} to use Cordova preferences
 * @param {booleanCallback} success - called upon successful start of the Airship Adapter.
 *     The single boolean argument is whether the adapter started successfully.
 * @param {errorCallback} error - called if this invocation fails
 */
exports.start = function(apiKey, success, error) {
  exec(success, error, 'AirshipAdapter', 'start', [apiKey]);
};

/**
 * Stops the Airship Adapter
 * 
 * @param {successCallback} success - called upon successful stop of the Airship Adapter.
 * @param {errorCallback} error - called if this invocation fails
 */
exports.stop = function(success, error) {
    exec(success, error, 'AirshipAdapter', 'stop', []);
};
