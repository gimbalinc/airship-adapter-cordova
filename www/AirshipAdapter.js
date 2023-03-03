var exec = require('cordova/exec');

exports.start = function(apiKey, success, error) {
    exec(success, error, 'AirshipAdapter', 'start', [apiKey]);
};

exports.stop = function(success, error) {
    exec(success, error, 'AirshipAdapter', 'stop', []);
};
