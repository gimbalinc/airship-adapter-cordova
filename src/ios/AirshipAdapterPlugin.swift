import GimbalAirshipAdapter
import Foundation

@objc(AirshipAdapterPlugin) class AirshipAdapterPlugin : CDVPlugin {
  
  @objc(start:)
  func start(command : CDVInvokedUrlCommand) {
    var pluginResult = CDVPluginResult(
      status: CDVCommandStatus_ERROR
    )

    let apiKey = command.arguments[0] as? String
    if (apiKey == nil || apiKey.count == 0) {
      
    }

  }
}