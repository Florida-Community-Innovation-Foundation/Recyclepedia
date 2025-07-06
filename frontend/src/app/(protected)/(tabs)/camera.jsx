import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CameraScan from "~/components/camera/CameraScan";
import ItemScanInstructions from "~/components/camera/ItemScanInstructions";
import { normalize } from "~/utils/normalize";

export default function ItemScan() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  useEffect(() => {
    navigation.addListener("tabPress", () => {
      setImage(null);
    });
  }, [navigation]);

  const handleUploadPhotoPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.h1}>SCAN &amp; RECYCLE </Text>
        <Text style={styles.h2}>
          CHECK IF YOUR ITEM IS RECYCLABLE AND GET CLEAR DISPOSAL INSTRUCTIONS.
        </Text>
        {!image && <CameraScan setImage={setImage} />}
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.cameraContainer}
            contentFit="cover"
            enableLiveTextInteraction={true}
          />
        )}

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine}></View>
          <Text style={styles.dividerText}> or </Text>
          <View style={styles.dividerLine}></View>
        </View>
        {/* Upload photo button */}
        <Pressable
          style={styles.uploadPhotoButton}
          onPress={handleUploadPhotoPress}
        >
          <Text style={styles.uploadPhotoText}>UPLOAD A PHOTO</Text>
        </Pressable>
        {/* Section showing instructions after scanning or uploading a photo */}
        <ItemScanInstructions itemChecked={image} itemAccepted={false} />
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
    marginTop: normalize(70, "height"),
    marginLeft: normalize(32, "width"),
    marginRight: normalize(16, "width"),
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
    width: normalize(300, "width"),
  },
  cameraContainer: {
    width: normalize(311, "width"),
    height: normalize(300, "height"),
  },
  divider: {
    marginTop: normalize(10, "height"),
    display: "flex",
    flexDirection: "row",
  },
  dividerLine: {
    backgroundColor: "#FFFFFF",
    height: normalize(1, "height"),
    width: "42%",
    marginTop: normalize(8, "height"),
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
    marginLeft: normalize(75, "width"),
    width: normalize(155, "width"),
    backgroundColor: "#FFFFFF",
    height: normalize(43, "height"),
    marginTop: normalize(10, "height"),
  },
  uploadPhotoText: {
    textAlign: "center",
    marginTop: normalize(10, "height"),
    fontSize: 22,
    fontFamily: "Bebas Neue",
    color: "#024935",
  },
});
