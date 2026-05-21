const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withReactNativeMapsfix(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let podfile = fs.readFileSync(podfilePath, 'utf8');

      const injection = `
  # Fix non-modular headers for react-native-maps + Firebase + useFrameworks: static
  installer.pods_project.build_configurations.each do |config|
    config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
  end

  no_module_pods = [
    'react-native-maps',
    'RNFBApp',
    'RNFBAnalytics',
    'RNFBAuth',
    'RNFBCrashlytics',
    'RNFBDatabase',
    'RNFBDynamicLinks',
    'RNFBFirestore',
    'RNFBFunctions',
    'RNFBMessaging',
    'RNFBPerf',
    'RNFBRemoteConfig',
    'RNFBStorage',
  ]

  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
      if no_module_pods.include?(target.name)
        config.build_settings['DEFINES_MODULE'] = 'NO'
      end
    end
  end
`;

      if (!podfile.includes('CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES')) {
        podfile = podfile.replace(
          /post_install do \|installer\|/,
          `post_install do |installer|\n${injection}`
        );
        fs.writeFileSync(podfilePath, podfile);
      }

      return config;
    },
  ]);
};