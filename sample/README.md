# Description
This is a sample app for the Gimbal Airship Cordova Adapter. Before use, please read the top-level README.md detailing the setup and usage of the adapter, as well as the documentation for the Airship plugin [urbanairship-cordova](https://github.com/urbanairship/urbanairship-cordova#readme).

# Development
This is a React app with a Cordova wrapper. All changes to the React app should go in the `src` folder.
When the app is compiled/built, React build scripts will compile the contents into vanilla JS.
This code is then then copied into `www` where Cordova expects the source files to be.
These React build scripts are called by Cordova hooks defined in `config.xml`, along with a script that copies the Cordova Adapter plugin into `plugins` and creates the symlink (essentially performing the `cordova plugin add [plugin path] --link` command automatically).
To generate the app(s) for either platform, run `cordova prepare`.
The app(s) will then be available in the `\platform` directory, which can then be opened in the IDE of your choice, if desired.

# Prerequisites
First run `yarn install` from `/sample`. Afterward, run `platform add`, appending `ios` or `android` as an argument depending on what platform(s) you are interested in.

## Gimbal setup
The package ID and bundle ID for the Android and iOS platform apps are defined in the `widget` tag of the `config.xml`.
In Gimbal Manager, create an application for each desired platform using the sample app package name / bundle ID.
Then copy the generated API keys for each app, and place them in their respective, platform-designated variables in `App.tsx`.

## Airship setup
Airship requires that you provide your App Secret and App Key, which can be done in the designated sections of the `config.xml`.

## Android setup
For push notifications, you'll need to generate a `google-services.json` and place it in the `/sample` directory so it can be added to the Android build (as defined in `config.xml`). You'll also need to add your Firebase sender ID to the designated `preference` value in `config.xml` -- make sure the ID is prefixed with `sender`, as in `sender:12345`.

## Cordova setup
Finally, run `cordova prepare` after all necessary platform-specific changes have been made, then run the app through the Cordova CLI, or using the IDE of your choice.

