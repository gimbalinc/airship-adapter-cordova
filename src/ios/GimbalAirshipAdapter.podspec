
Pod::Spec.new do |s|
  s.ios.deployment_target   = "11.0"
  s.swift_version           = "5.0"
  s.requires_arc            = true
  s.dependency                "GimbalAirshipAdapter", "~> 2.0.0"
end