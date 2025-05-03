import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CameraScan({ setImage }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    setImage(photo?.uri);
  };

  if (!permission) {
    return <View />;
  } else if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>
          We need your permission to show the camera
        </Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <>
        <CameraView
          ref={cameraRef}
          style={styles.cameraContainer}
          facing="back"
        >
          <View />
        </CameraView>
        <Pressable style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Take picture</Text>
        </Pressable>
      </>
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    width: 311,
    height: 300,
  },
  button: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#828282",
    marginLeft: 75,
    width: 155,
    backgroundColor: "#FFFFFF",
    height: 43,
    marginTop: 10,
  },
  buttonText: {
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
