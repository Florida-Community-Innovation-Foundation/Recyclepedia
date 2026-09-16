export default {
  expo: {
    name: "Recyclepedia",
    slug: "Recyclepedia",
    scheme: "recyclepedia",
    version: "1.0.0",
    icon: "./src/assets/img/icon.png",
    newArchEnabled: true,
    platforms: ["ios", "android"],
    plugins: [
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      "./plugins/withReactNativeMapsfix",
      "expo-router",
      [
        "expo-camera",
        {
          cameraPermission: "Allow Recyclepedia to access your camera.",
          // scanning takes still photos only — don't request the microphone
          recordAudioAndroid: false,
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "Allow Recyclepedia to access your photos to scan items for recycleability.",
        },
      ],
      [
        "expo-calendar",
        {
          calendarPermission: "Allow Recyclepedia to access your calendar.",
        },
      ],
      "expo-font",
      "expo-asset",
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/img/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      bundleIdentifier: "com.aadit.kamat.Recyclepedia",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      // Location is never read (all location code is disabled) and audio is
      // never recorded — requesting them contradicted the Play Data safety form.
      permissions: [
        "android.permission.CAMERA",
        "android.permission.READ_CALENDAR",
        "android.permission.WRITE_CALENDAR",
      ],
      blockedPermissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_BACKGROUND_LOCATION",
      ],
      package: "com.aadit.kamat.Recyclepedia",
    },
    ios: {
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
      bundleIdentifier: "com.aadit.kamat.Recyclepedia",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    extra: {
      router: {},
      eas: {
        projectId: "590ccc4f-8748-4498-862f-7d1b9e1d49e6",
      },
    },
    owner: "floridacommunityinnovation",
    runtimeVersion: "2",
    updates: {
      url: "https://u.expo.dev/590ccc4f-8748-4498-862f-7d1b9e1d49e6",
    },
  },
};
