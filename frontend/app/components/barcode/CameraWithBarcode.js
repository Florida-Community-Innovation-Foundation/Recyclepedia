import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CameraWithBarcode() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  const handleCameraPress = () => {
    CameraView.launchScanner({
      barcodeTypes: ["ean13"],
      isHighlightingEnabled: true,
    });
    CameraView.onModernBarcodeScanned((event) => {
      setBarCode(event.data);
      CameraView.dismissScanner();
    });
  };

  if (!permission) {
    return <View />;
  } else if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>
          We need your permission to show the camera
        </Text>
        <Pressable style={styles.uploadPhotoButton} onPress={requestPermission}>
          <Text style={styles.uploadPhotoText}>Grant permission</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <Pressable onPress={handleCameraPress}>
        <CameraView
          ref={cameraRef}
          style={styles.cameraContainer}
          facing="back"
        >
          <View />
        </CameraView>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    width: 311,
    height: 300,
  },
  uploadPhotoButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#828282",
    marginLeft: 75,
    width: 155,
    backgroundColor: "#FFFFFF",
    height: 43,
    marginTop: 10,
  },
  uploadPhotoText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Bebas Neue",
    color: "#024935",
  },
  permissionMessage: {
    color: "#FFFFFF",
  },
  permissionContainer: {
    width: 300,
  },
});
