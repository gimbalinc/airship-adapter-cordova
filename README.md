# Gimbal Airship Adapter - Cordova Plugin

The Gimbal Airship Adapter Cordova Plugin integrates Gimbal Place Event triggers with Airship Custom Events in Cordova apps.

## Resources

- [Gimbal Developer Guide](https://gimbal.com/doc/android/v4/devguide.html)
- [Gimbal Manager Portal](https://manager.gimbal.com)
- [Airship Cordova Plugin](https://github.com/urbanairship/urbanairship-cordova)
- [Airship Getting Started guide](https://docs.airship.com/platform/android/getting-started/)
- [Airship and Gimbal Integration guide](https://docs.airship.com/partners/gimbal/)

## Installation

### Prerequisites

In [Gimbal Manager > Apps](https://manager.gimbal.com/apps) create an app for each iOS and Android.
(For the purposes of differentiating between them in analytics, it helps to make the names and bundle/package IDs unique.)
You can find your apps' API keys in the app detail view -- you will need these later.

This plugin also requires `urbanairship-cordova` plugin to be installed and configured appropriately.

### Add the plugin

To add the plugin to your app:

```shell
    cordova plugin add cordova-plugin-gimbal-airship-adapter
```

## Initialization

This plugin allows configuration and setup via method calls, or via Cordova preferences in your app's `config.xml`.

### Start with preferences

If you want to just get it started, this is for you.
If auto-start is enabled, and the API key is set, Gimbal will start.
Without an API key, auto-start has no effect.

The downside to this approach is that Gimbal will be running *before* any permissions are granted, and may not request location updates from the OS until the next app start.
This may result in missed place events, and missed opportunities to engage with the customer.

```xml
<widget ...>
    ...
    <preference name="com.gimbal.api_key.android" value="<YOUR_GIMBAL_ANDROID_API_KEY>" />
    <preference name="com.gimbal.api_key.ios" value="<YOUR_GIMBAL_IOS_API_KEY>" />
    <preference name="com.gimbal.auto_start" value="true" />
</widget>
```

By default, Airship Custom Event tracking is enabled for Gimbal Place Entry and Departure events.
Airship Region Event tracking is disabled by default.

### Start with code

To start the adapter call:

```javascript
Gimbal.start('<YOUR_GIMBAL_API_KEY>',
    (started) => console.log('Running Gimbal Airship Adapter: ' + started),
    () => console.log('Failed to start Gimbal Airship Adapter'));
```

NOTE: your iOS and Android apps are managed separately in Gimbal Manager, and have separate API keys.
Your code will need to determine which platform it is running on, so that it may supply the correct API key, e.g. with `cordova-plugin-device`:

```javascript
var apiKey = null;

function apiKey(): string {
    if (window.cordova.platformId === 'ios') {
      return GIMBAL_API_KEY_IOS;
    }
    return GIMBAL_API_KEY_DROID;
  }

Gimbal.start(apiKey(),
    (started) => console.log('Running Gimbal Airship Adapter: ' + started),
    () => console.log('Failed to start Gimbal Airship Adapter'));
```

Once the adapter is started, it will automatically resume its last state when the app is restarted, including if started in the background.
The API key and the started status are persisted between app starts -- you only need to call `start`  once.

Typically this will be called when the user has opted-in to a feature that benefits from location-triggered Airship notifications, after the appropriate permissions are granted by the user.
It is also possible to call `start` every time in your `onDeviceReady` callback, but note that the first time that permissions are granted (*after* Gimbal is started), Gimbal may not request location updates from the OS until the next app restart.

NOTE: if your preferences also provide an API key and auto-start is enabled, calling `start()` may have unintended consequences.
When `start()` is called with an API key that doesn't match the API key in preferences, the `start()` key wins.
But once `stop()` is called, upon the next app start Gimbal will be auto-started with the API key in preferences.

## Permissions

This Adapter does not make requests on behalf of the app, as location permission flow has gotten far too complex -- it can't presume to know how or when any particular app should make its requests.
If granted, Gimbal will use fine, coarse and background location permissions, as well as Bluetooth scan permission, to be as location-aware as it can.

### iOS



```xml
<widget ...>
    ...
        <platform name="ios">
        <edit-config file="*-Info.plist" target="NSLocationAlwaysUsageDescription" mode="merge">
            <string>We require location permissions to detect place arrivals and exits</string>
        </edit-config>
        <edit-config file="*-Info.plist" target="NSLocationWhenInUseUsageDescription" mode="merge">
            <string>We require location permissions to detect place arrivals and exits</string>
        </edit-config>
        <edit-config file="*-Info.plist" target="NSLocationAlwaysAndWhenInUseUsageDescription" mode="merge">
            <string>We require location permissions to detect place arrivals and exits</string>
        </edit-config>
        <edit-config file="*-Info.plist" target="NSBluetoothAlwaysUsageDescription" mode="merge">
            <string>We require bluetooth for beacon detection</string>
        </edit-config>
        <edit-config file="*-Info.plist" target="NSBluetoothPeripheralUsageDescription" mode="merge">
            <string>We require bluetooth for beacon detection</string>
        </edit-config>
        <edit-config file="*-Info.plist" target="UIBackgroundModes" mode="merge">
            <array>
                <string>location</string>
                <string>processing</string> <!-- required by Airship -->
            </array>
        </edit-config>
    </platform>
</widget>
```

### Android
First, create and add your `google-services.json` to `/sample`, where it can be copied into the Android app during the build process (as defined in `config.xml`).

Before the adapter is able to request location updates on Android API 23 or newer, the app must request the location permission `ACCESS_FINE_LOCATION` (and `ACCESS_COARSE_LOCATION` on Android API 31+).
The Gimbal SDK will still operate when granted only `ACCESS_COARSE_LOCATION` but only very large, region-sized geofences will trigger geofence place entries.

Once the permissions are granted, then call this adapter's `start()` method.
It is possible to start the adapter prior to acceptance of permissions, but then Gimbal may not be able to request location updates to trigger Airship events until the next app start.

Note: The app will need `ACCESS_BACKGROUND_LOCATION` permissions Gimbal's to process place events while the app is in the background, if this functionality is desired.

```xml
<widget ...>
    ...
    <platform name="android">
        ...
        <preference name="AndroidXEnabled" value="true" />
        <resource-file src="google-services.json" target="app/google-services.json" />
        <config-file after="uses-permission" parent="/manifest" target="AndroidManifest.xml">
            <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
        </config-file>
    </platform>
</widget>
```

## Event Tracking

The adapter can be configured to track Airship Events when Gimbal Place Events are triggered.
Event tracking is controlled via `config.xml` preferences.
Most apps will want to use either Custom Events or Region Events, but not both.
Airship recommends using Custom Events, which are enabled by default.

The following are the default event tracking preferences:

```xml
<widget ...>
    ...
    <preference name="com.gimbal.track_custom_events.entry" value="true" />
    <preference name="com.gimbal.track_custom_events.exit" value="true" />
    <preference name="com.gimbal.track_region_events" value="false" />
</widget>    
```

### CustomEvents

Place entry events are tracked as `gimbal_custom_entry_event` and departure events are tracked as `gimbal_custom_exit_event`.

Each `CustomEvent` is populated with the following properties:

- `visitID` - a UUID for the Gimbal Visit. This is common for the visit's entry and departure.
- `placeIdentifier` - a UUID for the Gimbal Place
- `placeName` - the human readable place name as entered in Gimbal Manager. Not necessarily unique!
- `source` - always Gimbal
- `boundaryEvent` - an enumeration of `1` for entry and `2` for exit/departure

If there are any Place Attributes key-value pairs (as set on the triggering place in Gimbal Manager) present on the place that triggered the event, they will also be added to the `CustomEvent` properties.
They are prefixed with `GMBL_PA_`, e.g. `DMA:825` becomes `GMBL_PA_DMA:825`.

For more information regarding Airship Custom Events, see the Airship [Custom Event](https://docs.airship.com/guides/messaging/user-guide/data/custom-events/index.html) documentation.

### RegionEvents

When enabled, `RegionEvents` are created and tracked for both Place entries AND departures.

## Stopping the adapter

Adapter can be stopped at anytime by calling:

```java
   AirshipAdapter.shared(context).stop();
```

Once `stop()` is called, Gimbal location event processing will not restart upon subsequent app starts, until `start()` is called again.
The exception is when the `auto-start` and API key preferences are set -- this behavior can't be overridden with code.

