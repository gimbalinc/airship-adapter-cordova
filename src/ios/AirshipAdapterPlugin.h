#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@import GimbalAirshipAdapter;

@interface AirshipAdapterPlugin : CDVPlugin

- (void)start:(CDVInvokedUrlCommand *)command;

- (void)stop:(CDVInvokedUrlCommand *)command;

@end