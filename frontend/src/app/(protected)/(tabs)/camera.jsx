import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CameraScan from "~/components/camera/CameraScan";
import ItemScanInstructions from "~/components/camera/ItemScanInstructions";
import { normalize } from "~/utils/normalize";
import * as Location from 'expo-location';
import { getBaseURL } from "~/utils/url";

export default function ItemScan() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [classification, setClassification] = useState(null);
  const [accepted, setAccepted] = useState(false);
  // default location is Miami
  const [location, setLocation] = useState({ latitude: 25.7617, longitude: -80.1918 });
  const [exText, setExText] = useState("");

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

  // this only fires the first time a user goes to item scan
  useEffect(() => {
    navigation.addListener("tabPress", () => {
      setImageUri(null);
    });

    // create async function to use await in useEffect (is this good practice?)
    const getLocation = async () => {
      // get location
      try {
        // [note]: this can cause an error that the device has unsatisfied settings if improve location accuracy isn't on
        let { status } = await Location.requestForegroundPermissionsAsync();

        // default to Miami
        if (status !== "granted") {
          alert("Permission to access location was denied. Recyclepedia is defaulting to Miami.");
          return;
        }

        const position = await Location.getCurrentPositionAsync({});
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      } catch (error) {
        console.error(error.message);
      }
    };

    getLocation();
  }, [navigation]);

  // // when the image is updated (uploaded or taken), send to backend
  useEffect(() => {
    const getItemAccepted = async () => {
      const baseURL = await getBaseURL();
      const response = await fetch(`${baseURL}/itemData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, image }),
      });

      if (!response.ok) {
        console.error("Res not ok");
      }

      const data = await response.json();
      setExText(data.text);
      console.log("Data: ", data);
    };

    if (imageUri != null) {
      getItemAccepted();
    }
  }, [imageUri]);

  const handleCameraPhotoPress = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]);
    }
  };

  const handleUploadPhotoPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
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
        {/* Also takes in a location to check w/ "db" */}
        {/* don't think this is good rn */}
        <ItemScanInstructions itemChecked={imageUri} itemAccepted={accepted} exampleText={exText} />
        {/* <ItemScanInstructions itemChecked={image} itemAccepted={true} /> */}
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
