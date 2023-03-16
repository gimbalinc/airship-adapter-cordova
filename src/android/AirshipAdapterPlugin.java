package com.gimbal.airship;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

public class AirshipAdapterPlugin extends CordovaPlugin {
    private static final String TAG = "GIMBAL-AIRSHIP";

    private static final String ACTION_START = "start";
    private static final String ACTION_STOP = "stop";

    private AirshipAdapter adapter;
    private Configuration config;

    @Override
    protected void pluginInitialize() {
        super.pluginInitialize();

        config = new Configuration(preferences);

        onUiThread(() -> {
            getAdapter().setShouldTrackCustomEntryEvent(config.getTrackEntries());
            getAdapter().setShouldTrackCustomExitEvent(config.getTrackExits());
            getAdapter().setShouldTrackRegionEvent(config.getTrackRegionEvents());

            if (config.getAutoStart() && config.getApiKey() != null && !getAdapter().isStarted()) {
                start(config.getApiKey());
            }
        });
    }

    @SuppressWarnings("RedundantThrows")
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
            throws JSONException {

        switch (action) {
            case ACTION_START:
                onUiThread(() -> start(args, callbackContext));
                return true;
            case ACTION_STOP:
                onUiThread(() -> stop(args, callbackContext));
                return true;
            default:
                return false;
        }
    }

    private AirshipAdapter getAdapter() {
        if (adapter == null) {
            adapter = AirshipAdapter.shared(cordova.getContext());
        }
        return adapter;
    }

    private void onUiThread(Runnable runnable) {
        cordova.getActivity().runOnUiThread(runnable);
    }

    private void start(JSONArray args, CallbackContext callbackContext) {
        String apiKey;

        if (args.length() != 1) {
            callbackContext.error("Expected one nullable string Gimbal API Key argument");
            return;
        }
        if (args.optString(0, null) != null) {
            LOG.d(TAG, "start: Using API key from arguments");
            apiKey = args.optString(0);
        } else {
            LOG.d(TAG, "start: Using API key from preferences");
            apiKey = config.getApiKey();
        }

        if (apiKey == null || apiKey.isEmpty()) {
            callbackContext.error("API Key must be non-null and non-empty");
        }

        try {
            boolean isStarted = start(apiKey);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, isStarted));
        } catch (Exception e) {
            callbackContext.error(e.getMessage());
        }
    }

    private boolean start(String apiKey) {
        try {
            return getAdapter().start(apiKey);
        } catch (Exception e) {
            LOG.e(TAG, "start: Failed to start Gimbal Airship adapter", e);
            throw e;
        }
    }

    private void stop(JSONArray args, CallbackContext callbackContext) {
        if (args.length() != 0) {
            LOG.w(TAG, "stop: Expected no arguments");
        }
        getAdapter().stop();
        callbackContext.success();
    }

    private static class Configuration {
        private static final String GIMBAL_API_KEY = "com.gimbal.api_key.android";
        private static final String GIMBAL_AUTO_START = "com.gimbal.auto_start";
        private static final String GIMBAL_TRACK_ENTRIES = "com.gimbal.track_custom_events.entry";
        private static final String GIMBAL_TRACK_EXITS = "com.gimbal.track_custom_events.exit";
        private static final String GIMBAL_TRACK_REGION_EVENTS = "com.gimbal.track_region_events";

        private final CordovaPreferences preferences;

        Configuration(@NonNull CordovaPreferences preferences) {
            this.preferences = preferences;
        }

        @Nullable
        String getApiKey() {
            return preferences.getString(GIMBAL_API_KEY, null);
        }

        boolean getAutoStart() {
            return preferences.getBoolean(GIMBAL_AUTO_START, false);
        }

        boolean getTrackEntries() {
            return preferences.getBoolean(GIMBAL_TRACK_ENTRIES, true);
        }

        boolean getTrackExits() {
            return preferences.getBoolean(GIMBAL_TRACK_EXITS, true);
        }

        boolean getTrackRegionEvents() {
            return preferences.getBoolean(GIMBAL_TRACK_REGION_EVENTS, false);
        }
    }
}
