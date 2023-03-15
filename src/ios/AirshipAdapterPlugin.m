#import "AirshipAdapterPlugin.h"
#import <Cordova/CDVPlugin.h>
#import <CoreLocation/CoreLocation.h>

@implementation AirshipAdapterPlugin

-(void)pluginInitialize {
  [super pluginInitialize];
  [AirshipAdapter.shared restore];
}

-(void)start:(CDVInvokedUrlCommand *)command {
  NSString *apiKey = [command argumentAtIndex:0];
  CDVPluginResult *result;
  if (apiKey == nil) {
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                               messageAsString:@"start: Expected single, non-null API Key string argument"];
  } else if (![self hasActiveLocationServicesAuthorization]) {
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                               messageAsString:@"Location permission is required to start Gimbal Airship adapter"];
  } else {
    [AirshipAdapter.shared start:apiKey];

    BOOL isStarted = AirshipAdapter.shared.isStarted;
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                 messageAsBool:isStarted];
  }
  [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

-(void)stop:(CDVInvokedUrlCommand *)command {
  [AirshipAdapter.shared stop];
  CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
  [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

-(BOOL)hasActiveLocationServicesAuthorization
{
    CLAuthorizationStatus status = [CLLocationManager authorizationStatus];
    return (status == kCLAuthorizationStatusAuthorizedAlways)
            || (status == kCLAuthorizationStatusAuthorizedWhenInUse);
}

@end
