import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useStatusBarStyle } from "~/utils/useStatusBarStyle";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CameraScan from "~/components/camera/CameraScan";
import ItemScanInstructions from "~/components/camera/ItemScanInstructions";
import { normalize } from "~/utils/normalize";
// import * as Location from 'expo-location'; // disabled, for now
import { getBaseURL } from "../../../utils/baselineData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import _ from "lodash";
import { useQueries } from "@tanstack/react-query";

export default function ItemScan() {
  useStatusBarStyle("light");

  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [accepted, setAccepted] = useState(false);
  // default location is Miami
  const [location, setLocation] = useState({ latitude: 25.7617, longitude: -80.1918 });
  const [exText, setExText] = useState("");
  //const [city, setCity] = useState(null);
  const [city, setCity] = useState("Miami");
  const { data, pending } = useQueries({
    queries: [
      { queryKey: ["items"], queryFn: () => getItemsData() },
      { queryKey: ["curbside"], queryFn: () => getCurbsideData() },
      { queryKey: ["dropoff"], queryFn: () => getDropoffData() },
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
  const [itemsData, curbsideData, dropOffData] = data;

  const getCities = (curbsideData) =>
    _.map(curbsideData, (obj) => _.keys(obj)[0]);

  // this only fires the first time a user goes to item scan
  useEffect(() => {
    navigation.addListener("tabPress", () => {
      //setImageUri(null);
      setImage(null);
      setCity(null);
    });

    // this is disabled for now since it is buggy and tricky to test, reenable later
    // create async function to use await in useEffect (is this good practice?)
    // const getLocation = async () => {
    //   // get location
    //   try {
    //     // [note]: this can cause an error that the device has unsatisfied settings if improve location accuracy isn't on
    //     let { status } = await Location.requestForegroundPermissionsAsync();

    //     // default to Miami
    //     if (status !== "granted") {
    //       alert("Permission to access location was denied! Recyclepedia is defaulting to Miami.");
    //       return;
    //     }

    //     // if no location service enabled, use Miami
    //     const servicesEnabled = await Location.hasServicesEnabledAsync();
    //     if (!servicesEnabled) {
    //       alert("Location services not enabled! Recyclepedia is defaulting to Miami.");
    //       return;
    //     }

    //     const position = await Location.getCurrentPositionAsync({});

    //     if (!position) {
    //       alert("Unabled to determine location! Recyclepedia is defaulting to Miami.");
    //       return;
    //     }

    //     const currentLocation = {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     };

    //     setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // };

    // getLocation();
  }, [navigation]);

  // // when the image is updated (uploaded or taken), send to backend
  useEffect(() => {
    const getItemAccepted = async () => {
      if (!city) {
        Alert("You must select a city before proceeding!");
        console.log("Need to select a city");
        return;
      }
      //console.log("City: ", city);
      const baseURL = await getBaseURL();

      console.log("JSON stringifying request...");
      const reqBody = JSON.stringify({ city, image });
      console.log("Request stringified!");

      console.log("Request size: ", new Blob([reqBody]).size);

      const response = await fetch(`${baseURL}/itemData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ location, image }),
        //body: JSON.stringify({ city, image }),
        body: reqBody
      });

      if (!response.ok) {
        console.error("Res not ok");
        console.error("Response: ", response);
        Alert("Oops! Something went wrong!");
      }

      const data = await response.json();
      setExText(data.text);
      console.log("Data: ", data);
    };

    if (image != null) {
      getItemAccepted();
    }
  }, [image]);

  const handleCameraPhotoPress = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      //quality: 1,
      quality: 0.5, // quality needs to be downgraded to fit within 1mb per request
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUploadPhotoPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      //quality: 1,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      //setImageUri(result.assets[0].uri);
      setImage(result.assets[0]);
    }
  };

  // const handleCurrentLocationPress = async () => {
  //   console.log("CITY: ", city);
  //   try {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Permission to access location was denied");
  //       return;
  //     }
  //     const position = await Location.getCurrentPositionAsync({});
  //     const currentLocation = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     };
  //     const addresses = await Location.reverseGeocodeAsync(currentLocation);
  //     setCity(addresses[0].city);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  //   console.log("CITY: ", city);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollviewstyle}>
        <View style={styles.screenContainer}>
          {/* header */}
          <View>
            <Text style={styles.h1}>
              SCAN &amp; RECYCLE
            </Text>
            <Text style={styles.h2}>
              CHECK IF YOUR ITEM IS RECYCLABLE AND GET CLEAR DISPOSAL INSTRUCTIONS.
            </Text>
          </View>

          {/* image */}
          {/* <View style={styles.imageContainer}> */}
          <View>
            <View>
              <Text style={styles.cityPickerLabel}>SELECT YOUR TOWN OR CITY:</Text>
              <Dropdown
                style={styles.picker}
                data={
                  _.map(getCities(curbsideData), (city) => ({
                    label: city,
                    value: city,
                  }))
                }
                search
                searchPlaceholder="Search..."
                labelField="label"
                valueField="value"
                renderItem={(item) => (
                  <View>
                    <Text style={styles.itemTextStyle}>{item.label}</Text>
                  </View>
                )}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                placeholder={"Select town or city"}
                value={city}
                onChange={(item) => {
                  console.log("City: ", item.value);
                  setCity(item.value);
                }}
                renderRightIcon={() => (
                  <FontAwesome name="caret-down" size={20} color="#024935" />
                )}
                key="scanCityDropdown"
              />

              {/* Show "Use my current location" for users to populate location data automatically */}
              {/* This is disabled for now since it has a lot of bugs and is difficult to test, add later */}
              {/* <Pressable
                style={styles.selectCurrentLocation}
                onPress={handleCurrentLocationPress}
              >
                <FontAwesome name="location-arrow" size={18} color="#828282" />
                <Text style={styles.selectCurrentLocationText}>
                  Use my current location
                </Text>
              </Pressable> */}
            </View>
            <View style={styles.imageContainer}>
              {/* take photo button */}
              {
                !image &&
                <Pressable
                  style={styles.uploadPhotoButton}
                  onPress={handleCameraPhotoPress}
                >
                  <Text style={styles.uploadPhotoText}>
                    TAKE A PICTURE
                  </Text>
                </Pressable>
              }
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={styles.cameraContainer}
                  //contentFit="cover"
                  contentFit="fill"
                  enableLiveTextInteraction={true}
                />
              )}

              {/* divider */}
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
            </View>

            {/* result */}
            {/* <ItemScanInstructions itemChecked={image} itemAccepted={accepted} exampleText={exText} /> */}
            <View>
              {
                !image &&
                <View style={{ flexGrow: 1, backgroundColor: "#FFFFFF", borderRadius: 30, marginTop: 20, }}>
                  <Text style={{ padding: 16, fontSize: 16, fontWeight: 700, color: "#024935", fontFamily: "Bebas Neue", textAlign: "center" }}>
                    SCAN AN ITEM TO VIEW RECYCLING INFORMATION
                  </Text>
                </View>
              }
              {
                image &&
                <ItemScanInstructions itemChecked={image} itemAccepted={accepted} exampleText={exText} />
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // <View style={styles.container}>
    //   <View>
    //     <Text>Hello</Text>
    //   </View>
    //   <View style={styles.container}>
    //     <Text style={styles.h1}>SCAN &amp; RECYCLE </Text>
    //     <Text style={styles.h2}>
    //       CHECK IF YOUR ITEM IS RECYCLABLE AND GET CLEAR DISPOSAL INSTRUCTIONS.
    //     </Text>
    //     {
    //       !image &&
    //       <Pressable
    //         style={styles.uploadPhotoButton}
    //         onPress={handleCameraPhotoPress}
    //         >
    //           <Text style={styles.uploadPhotoText}>TAKE A PICTURE</Text>
    //         </Pressable>
    //     }
    //     {/* {!image && <CameraScan setImage={setImage} />} */}
    //     {image && (
    //       <Image
    //         source={{ uri: image.uri }}
    //         style={styles.cameraContainer}
    //         contentFit="cover"
    //         enableLiveTextInteraction={true}
    //       />
    //     )}

    //     {/* Divider */}
    //     <View style={styles.divider}>
    //       <View style={styles.dividerLine}></View>
    //       <Text style={styles.dividerText}> or </Text>
    //       <View style={styles.dividerLine}></View>
    //     </View>

    //     {/* Upload photo button */}
    //     <Pressable
    //       style={styles.uploadPhotoButton}
    //       onPress={handleUploadPhotoPress}
    //     >
    //       <Text style={styles.uploadPhotoText}>UPLOAD A PHOTO</Text>
    //     </Pressable>

    //     {/* Section showing instructions after scanning or uploading a photo */}
    //     {/* Also takes in a location to check w/ "db" */}
    //     {/* don't think this is good rn */}
    //     <ItemScanInstructions itemChecked={image} itemAccepted={accepted} exampleText={exText} />
    //     {/* <ItemScanInstructions itemChecked={image} itemAccepted={true} /> */}
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  // dropdown styles
  cityPickerLabel: {
    fontSize: normalize(22),
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    color: "white",
    marginBottom: normalize(10, "height"),
    marginTop: normalize(-10, "height"),
  },
  picker: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  itemTextStyle: {
    color: "#494B4A",
    fontFamily: "Titillium Web",
    fontSize: 18,
    padding: 5,
  },
  selectedTextStyle: {
    fontFamily: "Titillium Web",
    color: "#494B4A",
    fontSize: 18,
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: "Titillium Web",
    color: "#828282",
  },

  // Location select Styles
  selectCurrentLocation: {
    display: "flex",
    flexDirection: "row",
    marginLeft: normalize(175, "width"),
    marginTop: normalize(10, "height"),
  },
  selectCurrentLocationText: {
    textAlign: "right",
    color: "#828282",
    textDecorationLine: "underline",
    marginLeft: normalize(5, "width"),
    marginBottom: normalize(10, "height"),
    fontFamily: "Titillium Web",
    fontSize: normalize(14),
    fontWeight: 400,
  },

  container: {
    backgroundColor: "#024935",
    //height: "100%",
    flex: 1,
  },
  scrollviewstyle: {
    flexGrow: 1,
    paddingHorizontal: normalize(30),
    marginBottom: normalize(80, "height"),
  },
  screenContainer: {
    gap: normalize(20),
  },
  contentContainer: {
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
    //width: 300,
    color: "#BBB8B8",
    fontFamily: "Bebas Neue",
    //height: 47,
  },
  permissionMessage: {
    color: "#FFFFFF",
  },
  permissionContainer: {
    width: normalize(300, "width"),
  },
  cameraContainer: {
    width: normalize(350, "width"),
    height: normalize(300, "height"),
  },
  divider: {
    marginVertical: normalize(10, "height"),
    display: "flex",
    flexDirection: "row",
  },
  dividerLine: {
    backgroundColor: "#FFFFFF",
    height: normalize(1, "height"),
    flex: 1,
    //width: "42%",
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
    // marginLeft: normalize(75, "width"),
    // width: normalize(155, "width"),
    backgroundColor: "#FFFFFF",
    // height: normalize(43, "height"),
    // marginTop: normalize(10, "height"),
    padding: normalize(10),
  },
  uploadPhotoText: {
    textAlign: "center",
    //marginTop: normalize(10, "height"),
    fontSize: 22,
    fontFamily: "Bebas Neue",
    color: "#024935",
  },
  imageContainer: {
    paddingTop: 10, // just until location services are turned on
    alignItems: "center",
  },
});
