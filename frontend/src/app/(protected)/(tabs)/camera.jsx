import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CameraScan from "~/components/camera/CameraScan";
import ItemScanInstructions from "~/components/camera/ItemScanInstructions";
import { normalize } from "~/utils/normalize";
import getBaseURL from "~/utils/url";

export default function ItemScan() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [classification, setClassification] = useState(null);

  useEffect(() => {
    if (imageUri) {
      getBaseURL().then((baseURL) => {
        FileSystem.uploadAsync(`${baseURL}/recyclingIdentifier`, imageUri, {
          fieldName: "image",
          mimeType: "image/jpeg",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        })
          .then((response) => {

            console.log("TEST)");
            console.log(JSON.parse(response.body));
            console.log(classification);
            setClassification(JSON.parse(response.body));
            return JSON.parse(response.body);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }, [imageUri]);

  useEffect(() => {
    navigation.addListener("tabPress", () => {
      setImageUri(null);
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
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.h1}>SCAN &amp; RECYCLE </Text>
        <Text style={styles.h2}>
          CHECK IF YOUR ITEM IS RECYCLABLE AND GET CLEAR DISPOSAL INSTRUCTIONS.
        </Text>
        {!imageUri && <CameraScan setImageUri={setImageUri} />}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
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
        <ItemScanInstructions itemChecked={imageUri} itemAccepted={false} />
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
