/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    UAirship.setUserNotificationsEnabled(true, function (enabled) {
        console.log("User notifications are enabled! Fire away!");
    })

    // Requesting location will trigger the permission request dialog.  After permissions
    // are granted, Gimbal will start.  Note that Gimbal.start() will be called on subsequent app
    // starts, but won't have any adverse effects.
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log('Geolocation -- permissions granted, starting Gimbal');
            startGimbal();
        },
        () => console.log(`Geolocation error -- ${error.message}`)
    );
}

function startGimbal() {
    // Specify a `null` Gimbal API key in order to use the `com.gimbal.api_key` preferences
    // in the app config.xml. OR you can set the API key programmatically with a non-null
    // API key string. Note that your Android and iOS Gimbal keys are different so your code
    // needs to set the right one based on `device.platform`.

    var apiKey = null;

    // switch (device.platform) {
    //     case 'iOS':
    //         apiKey = 'your Gimbal iOS API key';
    //         break;
    //     case 'Android':
    //         apiKey = 'your Gimbal Android API key';
    //         break;
    //     default:
    //         console.log('Platform ' + device.platform + ' not supported by Gimbal SDK');
    //         return;
    // }

    Gimbal.start(apiKey,
        (started) => console.log('Running Gimbal Airship Adapter: ' + started),
        () => console.log('Failed to start Gimbal Airship Adapter'));
}
