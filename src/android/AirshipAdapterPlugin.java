package com.gimbal.airship;

import android.Manifest;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * This class echoes a string called from JavaScript.
 */
public class AirshipAdapterPlugin extends CordovaPlugin {
    private static final String TAG = "GIMBAL-AIRSHIP";

    private static final String ACTION_START = "start";
    private static final String ACTION_STOP = "stop";

    private AirshipAdapter adapter;

    @Override
    protected void pluginInitialize() {
        super.pluginInitialize();

    }

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
        if ((args.length() != 1) && (args.optString(0, null) != null)) {
            callbackContext.error("start: Expected single, non-null API Key string argument");
        }
        String apiKey = args.optString(0);
        if (ActivityCompat.checkSelfPermission(cordova.getContext(),
                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            try {
                boolean isStarted = getAdapter().start(apiKey);
                callbackContext.sendPluginResult(
                        new PluginResult(PluginResult.Status.OK, isStarted));
            } catch (Exception e) {
                LOG.e(TAG, "Failed to start Gimbal Airship adapter", e);
                callbackContext.error(e.getMessage());
            }
        } else {
            callbackContext
                    .error("Location permission is required to start Gimbal Airship adapter");
        }
    }

    private void stop(JSONArray args, CallbackContext callbackContext) {
        if (args.length() != 0) {
            callbackContext.error("stop: Expected no arguments");
        }
        getAdapter().stop();
        callbackContext.success();
    }

}
