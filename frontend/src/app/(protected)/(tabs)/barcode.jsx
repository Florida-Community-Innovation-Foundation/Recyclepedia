import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BarcodeInstructions from "../BarcodeInstructions";

export default function BarcodeScan() {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [barcode, setBarCode] = useState(null);

  useEffect(() => {
    navigation.addListener("tabPress", (event) => {
      setBarCode(null);
    });
  }, [navigation]);

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

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.h1}>SCAN &amp; RECYCLE </Text>
        <Text style={styles.h2}>
          CHECK IF YOUR ITEM IS RECYCLABLE AND GET CLEAR DISPOSAL INSTRUCTIONS.
        </Text>
        {/* Camera with barcode scanner */}
        {
          // Camera permissions are still loading.
          !permission && <View />
        }
        {
          // Camera permissions are not granted yet.
          permission && !permission.granted && (
            <View style={styles.permissionContainer}>
              <Text style={styles.permissionMessage}>
                We need your permission to show the camera
              </Text>
              <Pressable
                style={styles.uploadPhotoButton}
                onPress={requestPermission}
              >
                <Text style={styles.uploadPhotoText}>Grant permission</Text>
              </Pressable>
            </View>
          )
        }
        {permission && permission.granted && (
          <Pressable onPress={handleCameraPress}>
            <CameraView
              ref={cameraRef}
              style={styles.cameraContainer}
              facing="back"
            >
              <View />
            </CameraView>
          </Pressable>
        )}
        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine}></View>
          <Text style={styles.dividerText}> or </Text>
          <View style={styles.dividerLine}></View>
        </View>
        {/* Upload photo button */}
        <Pressable style={styles.uploadPhotoButton}>
          <Text style={styles.uploadPhotoText}>UPLOAD A PHOTO</Text>
        </Pressable>
        {/* Section showing instructions after scanning or uploading a photo */}
        <BarcodeInstructions itemChecked={barcode} itemAccepted={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#024935",
    height: "100%",
  },
  container: {
    marginTop: 70,
    marginLeft: 32,
    marginRight: 16,
  },
  h1: {
    fontWeight: 400,
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: "Bebas Neue",
  },
  h2: {
    fontWeight: 400,
    fontSize: 17,
    width: 300,
    color: "#BBB8B8",
    fontFamily: "Bebas Neue",
    height: 47,
  },
  permissionMessage: {
    color: "#FFFFFF",
  },
  permissionContainer: {
    width: 300,
  },
  cameraContainer: {
    width: 311,
    height: 300,
    borderRadius: 8,
  },
  divider: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  dividerLine: {
    backgroundColor: "#FFFFFF",
    height: 1,
    width: "42%",
    marginTop: 8,
  },
  dividerText: {
    fontWeight: 400,
    fontSize: 14,
    color: "#FFFFFF",
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
});
