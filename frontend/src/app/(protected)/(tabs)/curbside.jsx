import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { cityData } from "../../util/CityData.js";
import DropdownSelector from "../DropdownSelector.js";
import RecyclingList from "../RecyclingList.js";

const CurbsideDropoff = ({ navigation }) => {
  const [category, setCategory] = useState(null);
  const [recyclingItems, setRecyclingItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subtitle, setSubtitle] = useState(
    "FIND OUT WHAT CAN BE RECYCLED AT THE CURB IN YOUR\nMUNICIPALITY.",
  );
  const [curbsideColor, setCurbsideColor] = useState("white");
  const [dropoffColor, setDropoffColor] = useState("#024935");
  const [selectText, setSelectText] = useState("SELECT YOUR MUNICIPALITY");
  const [location, setLocation] = useState({});
  const [finalAddress, setFinalAddress] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [places, setPlaces] = useState([]);

  const MAP_LABEL = "DROP-OFF LOCATIONS:";

  useEffect(() => {
    console.log(finalAddress);
    if (finalAddress) {
      Location.geocodeAsync(finalAddress)
        .then((coordinatesList) => {
          setLocation(coordinatesList[0]);
        })
        .then(() => setRecyclingItems(cityData[finalAddress] || []))
        .catch(console.error);
    }
  }, [finalAddress]);

  useEffect(() => {
    Location.reverseGeocodeAsync(location).then((addresses) => {
      if (curbsideColor === "white") {
        if (_.hasIn(cityData, addresses[0].city)) {
          setFinalAddress(addresses[0].city);
        } else {
          setFinalAddress("");
        }
      } else {
        setFinalAddress(
          `${addresses[0].name}, ${addresses[0].city}, ${addresses[0].region}, ${addresses[0].country} ${addresses[0].postalCode}`,
        );
      }
    });
  }, [location]);

  const handleSubmit = async () => {
    if (category) {
      try {
        const fetchQuery = `${category} recycling centers near ${finalAddress}`;
        console.log(fetchQuery);
        const response = await fetch(
          "https://places.googleapis.com/v1/places:searchText",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
              "X-Goog-FieldMask":
                "places.location,places.displayName,places.formattedAddress",
            },
            body: JSON.stringify({
              textQuery: fetchQuery,
            }),
          },
        );
        const data = await response.json();
        setPlaces(data["places"]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCurrentLocationPress = async (event) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocation(currentLocation);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filterItems = (category) =>
    recyclingItems.filter((item) =>
      item.name.toLowerCase().includes(category.toLowerCase()),
    );

  const DoAndDontSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Curbside Pickup Do's and Don't's</Text>
      {/* Your Do's and Don't's items go here */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView styles={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          {/*Curbside and drop off pill buttons*/}
          <View style={styles.pillButtons}>
            <TouchableOpacity
              style={[styles.curbsidePill, { backgroundColor: curbsideColor }]} // Dynamically update background color
              onPress={() => {
                setSubtitle(
                  "FIND OUT WHAT CAN BE RECYCLED AT THE CURB IN YOUR\nMUNICIPALITY.",
                );
                setCurbsideColor("white");
                setDropoffColor("#024935");
                setSelectText("SELECT YOUR MUNICIPALITY:");
              }}
            >
              <Text
                style={[
                  { fontFamily: "BebasNeue_400Regular" },
                  styles.pillText,
                  { color: curbsideColor === "white" ? "#024935" : "white" },
                ]}
              >
                CURBSIDE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dropOffPill, { backgroundColor: dropoffColor }]}
              onPress={() => {
                setSubtitle(
                  "FIND DROP-OFF LOCATIONS FOR ITEMS THAT CAN'T GO IN \nYOUR CURBSIDE BIN.",
                );
                setCurbsideColor("#024935");
                setDropoffColor("white");
                setFinalAddress("");
                setSelectText("FIND DROP-OFF LOCATIONS FOR SPECIFIC ITEMS:");
              }}
            >
              <Text
                style={[
                  styles.pillText,
                  { fontFamily: "BebasNeue_400Regular" },
                  { color: dropoffColor === "white" ? "#024935" : "white" },
                ]}
              >
                DROP-OFF
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.subtitle,
              { color: "#BBB8B8" },
              { fontFamily: "BebasNeue_400Regular" },
            ]}
          >
            {subtitle}
          </Text>
        </View>

        {/*Conditionally rendering drop downs based on color */}
        {curbsideColor === "white" && (
          <View>
            <View style={styles.cityPickerContainer}>
              <Text
                style={[
                  styles.cityPickerLabel,
                  { fontSize: 25 },
                  { fontFamily: "BebasNeue_400Regular" },
                ]}
              >
                {selectText}
              </Text>
              <DropdownSelector itemType="city" setItem={setFinalAddress} />
            </View>
          </View>
        )}

        {dropoffColor === "white" && (
          <View>
            <View style={styles.cityPickerContainer}>
              <Text
                style={[
                  styles.cityPickerLabel,
                  { fontSize: 22 },
                  { fontFamily: "BebasNeue_400Regular" },
                ]}
              >
                {selectText}
              </Text>
              <DropdownSelector itemType="category" setItem={setCategory} />
              <DropdownSelector itemType="city" setItem={setFinalAddress} />
            </View>
          </View>
        )}

        {/* Show "Use my current location" for users to populate location data automatically */}
        <Pressable
          style={styles.selectCurrentLocation}
          onPress={handleCurrentLocationPress}
        >
          <FontAwesome name="location-arrow" size={18} color="#828282" />
          <Text style={styles.selectCurrentLocationText}>
            Use my current location
          </Text>
        </Pressable>

        {dropoffColor === "white" && (
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}> Submit </Text>
          </Pressable>
        )}

        {dropoffColor === "white" && (
          <Text
            style={[
              styles.subtitle,
              {
                marginTop: 10,
                marginBottom: 10,
                color: "#FFFFFF",
                textAlign: "left",
                marginHorizontal: 32,
              },
              { fontFamily: "BebasNeue_400Regular" },
            ]}
          >
            {MAP_LABEL}
          </Text>
        )}

        {/* Map */}
        <MapView
          region={location}
          style={
            curbsideColor === "white"
              ? [styles.map, { marginTop: 30 }]
              : styles.map
          }
          provider={PROVIDER_GOOGLE}
        >
          {places &&
            places.map((place, index) => (
              <Marker
                key={index}
                coordinate={place.location}
                title={place.displayName.text}
                description={place.formattedAddress}
              />
            ))}
        </MapView>

        {/* Show recycling information */}
        {finalAddress && (
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder="Search for recycling items..."
              />
              <FontAwesome name="search" size={20} color="#024935" />
            </View>

            <RecyclingList
              items={filterItems(searchQuery)}
              city={finalAddress}
              cityData={cityData}
            />

            <DoAndDontSection />
            <View style={styles.alternativeContainer}>
              <Text style={styles.alternativeText}>
                Can't find what you're looking for?
              </Text>
              <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>Paper</Text>
                <Text style={styles.itemDescription}>
                  Clean and dry newspaper, magazines, catalogs, telephone books,
                  printer paper, copier paper, mail, and all other office paper
                  without wax liners.
                </Text>
              </View>

              <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>Cardboard</Text>
                <Text style={styles.itemDescription}>
                  Packing boxes, cereal boxes, pizza boxes, gift boxes, and
                  corrugated cardboard. Flatten all boxes before placing them in
                  your cart.
                </Text>
              </View>

              <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>Cans</Text>
                <Text style={styles.itemDescription}>
                  Steel and aluminum food and beverage cans. Aluminum bottles
                  are also accepted.
                </Text>
              </View>

              <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>Cartons</Text>
                <Text style={styles.itemDescription}>
                  Aseptic poly-coated drink boxes, juice cartons, and milk
                  cartons.
                </Text>
              </View>

              <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>Bottles (plastic & glass)</Text>
                <Text style={styles.itemDescription}>
                  Plastic bottles such as milk, water, detergent, soda, and
                  shampoo bottles (flatten and replace the cap); glass bottles.
                </Text>
              </View>

              <View style={styles.itemSection}>
                <Text style={styles.itemTitle}>Plastic tubs and jugs</Text>
                <Text style={styles.itemDescription}>
                  Plastic tubs, such as butter or yogurt tubs, and plastic jugs,
                  such as milk or detergent jugs.
                </Text>
              </View>

              <TouchableOpacity style={styles.alternativeButton}>
                <Text style={styles.alternativeButtonText}>
                  Find Alternative Recycling Options
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // General Containers
  container: {
    flex: 1,
    backgroundColor: "#024935",
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  //Button container
  pillButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  curbsidePill: {
    backgroundColor: "",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: -6,
    borderWidth: 1,
    borderColor: "white",
  },
  dropOffPill: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: -6,
    borderWidth: 1,
    borderColor: "white",
  },
  pillText: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 35,
  },

  // Header Styles
  headerContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    color: "#6ad04b",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
  },

  // City Picker Styles
  cityPickerContainer: {
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: "#828282",
  },
  cityPickerLabel: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
    marginTop: -10,
  },
  pickerWrapper: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    paddingLeft: 10,
  },
  pickerText: {
    color: "#828282",
    height: 50,
  },
  // Location select Styles
  selectCurrentLocation: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 185,
  },
  selectCurrentLocationText: {
    textAlign: "right",
    color: "#828282",
    textDecorationLine: "underline",
    marginLeft: 5,
    fontFamily: "Titillium Web",
    fontSize: 14,
    fontWeight: 400,
  },

  //Submit Button Styles
  submitButton: {
    backgroundColor: "#24A0ED",
    width: 150,
    height: 40,
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 32,
    marginRight: 32,
    marginLeft: 200,
  },
  submitButtonText: {
    color: "#FFFFFF",
    marginTop: 10,
    textAlign: "center",
  },
  //Map Styles
  map: {
    width: 320,
    height: 300,
    marginHorizontal: 32,
    borderRadius: 11,
  },
  callout: {
    backgroundColor: "white",
    padding: 10,
  },
  // Search Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },

  // Section Styles
  sectionContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#234E13",
    marginBottom: 15,
    textAlign: "center",
  },

  // Alternative Section Styles
  alternativeContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 50,
    marginHorizontal: 16,
    alignItems: "center",
  },
  alternativeText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15,
  },
  alternativeButton: {
    backgroundColor: "#234E13",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  alternativeButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  // Item Section Styles
  itemSection: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#234E13",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
