import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Button } from 'react-native';
import BackButton from '../components/common/BackButton';
const UnityGame = () => {
  const unityRef = React.useRef(null);
  return (
    <View style={styles.container}>
      <BackButton />
      <WebView
        source={{ uri: 'https://apele11.github.io/Recyle-Mania/' }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        mixedContentMode='always'
        originWhitelist={['*']}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
export default UnityGame;