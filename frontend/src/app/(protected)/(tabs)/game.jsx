import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { normalize } from "~/utils/normalize";
import { useStatusBarStyle } from "~/utils/useStatusBarStyle";

// Recycle-Mania is a Unity WebGL game hosted on GitHub Pages
// (repo: Florida-Community-Innovation-Foundation/Recycle-Mania).
const GAME_URL =
  "https://florida-community-innovation-foundation.github.io/Recycle-Mania/";

// The custom tab bar is absolutely positioned and 80px tall, so leave room
// for it or the bottom of the game gets covered.
const TAB_BAR_HEIGHT = 80;

export default function GameTab() {
  useStatusBarStyle("light");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Text style={styles.title}>RECYCLE-MANIA</Text>
      <Text style={styles.subtitle}>
        DRAG EACH ITEM INTO THE RIGHT BIN BEFORE TIME RUNS OUT.
      </Text>
      <View style={styles.gameContainer}>
        {failed ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              The game could not load. Check your internet connection and try
              again.
            </Text>
          </View>
        ) : (
          <WebView
            source={{ uri: GAME_URL }}
            style={styles.webView}
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={["https://*"]}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            onLoadEnd={() => setLoading(false)}
            onError={() => setFailed(true)}
            onHttpError={() => setFailed(true)}
          />
        )}
        {loading && !failed && (
          <View style={[styles.center, styles.loaderOverlay]}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#024935",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Titillium Web",
    fontSize: normalize(24),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: normalize(10),
  },
  subtitle: {
    color: "#BBB8B8",
    fontFamily: "Titillium Web",
    fontSize: normalize(12),
    textAlign: "center",
    marginTop: normalize(4),
    marginBottom: normalize(10),
    paddingHorizontal: normalize(20),
  },
  gameContainer: {
    flex: 1,
    marginHorizontal: normalize(12),
    marginBottom: TAB_BAR_HEIGHT + normalize(8),
    borderRadius: normalize(15),
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  webView: {
    flex: 1,
    backgroundColor: "#000000",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: normalize(20),
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  errorText: {
    color: "#FFFFFF",
    fontFamily: "Titillium Web",
    fontSize: normalize(16),
    textAlign: "center",
  },
});
