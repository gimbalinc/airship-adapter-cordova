#import "AirshipAdapterPlugin.h"
#import <Cordova/CDVPlugin.h>
#import <CoreLocation/CoreLocation.h>

@implementation AirshipAdapterPlugin

-(void)pluginInitialize {
    [super pluginInitialize];
    
    NSString *preferenceApiKey = [self preferenceApiKey];
    
    AirshipAdapter.shared.shouldTrackCustomEntryEvents = [self shouldTrackCustomEntryEvents];
    AirshipAdapter.shared.shouldTrackCustomExitEvents = [self shouldTrackCustomExitEvents];
    AirshipAdapter.shared.shouldTrackRegionEvents = [self shouldTrackRegionEvents];
    [AirshipAdapter.shared restore];
    
    if ([self shouldAutostart] && preferenceApiKey != nil && !AirshipAdapter.shared.isStarted) {
        [self startWithApiKey:preferenceApiKey];
    }
}

-(NSString*)preferenceApiKey {
    return [self.commandDelegate.settings objectForKey:@"com.gimbal.api_key.ios"];
}

-(bool)shouldAutostart {
    NSString* autostartConfigStringPreference = [[self.commandDelegate.settings
                                                  objectForKey:@"com.gimbal.auto_start"] lowercaseString];
    return autostartConfigStringPreference != nil && [autostartConfigStringPreference isEqualToString:@"true"];

}

-(bool)shouldTrackCustomEntryEvents {
    NSString* shouldTrackEntryStringPreference = [[self.commandDelegate.settings
                                                   objectForKey:@"com.gimbal.track_custom_events.entry"] lowercaseString];
    return shouldTrackEntryStringPreference == nil || [shouldTrackEntryStringPreference isEqualToString:@"true"];
}

-(bool)shouldTrackCustomExitEvents {
    NSString* shouldTrackExitStringPreference = [[self.commandDelegate.settings
                                                   objectForKey:@"com.gimbal.track_custom_events.exit"] lowercaseString];
    return shouldTrackExitStringPreference == nil || [shouldTrackExitStringPreference isEqualToString:@"true"];
}

-(bool)shouldTrackRegionEvents {
    NSString* shouldTrackRegionStringPreference = [[self.commandDelegate.settings
                                                   objectForKey:@"com.gimbal.track_region_events"] lowercaseString];
    return shouldTrackRegionStringPreference != nil && [shouldTrackRegionStringPreference isEqualToString:@"true"];
}

-(void)start:(CDVInvokedUrlCommand *)command {
    NSString *apiKey = [command argumentAtIndex:0];
    CDVPluginResult *result;
    if (apiKey == nil) {
        NSString *preferenceApiKey = [self preferenceApiKey];
        if (preferenceApiKey == nil) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                       messageAsString:@"start: Expected single, non-null API Key string argument"];
        } else {
            [self startWithApiKey:preferenceApiKey];
        }
    } else {
        bool isStarted = [self startWithApiKey:apiKey];
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                     messageAsBool:isStarted];
    }
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

-(bool)startWithApiKey:(NSString *)apiKey {
    [AirshipAdapter.shared start:apiKey];
    return AirshipAdapter.shared.isStarted;
}

-(void)stop:(CDVInvokedUrlCommand *)command {
    [AirshipAdapter.shared stop];
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
