import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQueries } from "@tanstack/react-query";
import * as Location from "expo-location";
import _ from "lodash";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  getCurbsideData,
  getDropoffData,
  getItemsData,
} from "~/utils/baselineData.js";
import DropdownSelector from "~/components/DropdownSelector";
import RecyclingList from "~/components/RecyclingList";

const CurbsideDropoff = ({ navigation }) => {
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

  const MAP_LABEL = "DROP-OFF LOCATIONS:";

  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [subtitle, setSubtitle] = useState(
    "FIND OUT WHAT CAN BE RECYCLED AT THE CURB IN YOUR\nMUNICIPALITY.",
  );
  const [curbsideColor, setCurbsideColor] = useState("white");
  const [dropoffColor, setDropoffColor] = useState("#024935");
  const [selectText, setSelectText] = useState("SELECT YOUR MUNICIPALITY");
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState(
    _.map(curbsideData, (row) => {
      const location = _.chain(row)
        .values()
        .head()
        .pick(["latitude", "longitude"])
        .value();
      return {
        name: _.keys(row)[0],
        location: location,
      };
    }),
  );

  const getCities = (curbsideData) =>
    _.map(curbsideData, (obj) => _.keys(obj)[0]);

  const handleSubmit = async () => {
    if (category) {
      setPlaces(
        _.chain(dropOffData)
          .filter((dropOffLocation) => dropOffLocation["Category"] === category)
          .map((dropOffLocation) => {
            return {
              latitude: dropOffLocation["Latitude"],
              longitude: dropOffLocation["Longitude"],
            };
          })
          .uniq()
          .value(),
      );
    }
  };

  const handleCurrentLocationPress = async () => {
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
      const addresses = await Location.reverseGeocodeAsync(currentLocation);
      setCity(addresses[0].city);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filterItems = () => {
    const filteredItems = _.filter(
      curbsideData,
      (obj) => _.keys(obj)[0] === city,
    );
    const filteredItemCategories = _.chain(filteredItems)
      .head()
      .valuesIn()
      .map((item) => item.categories)
      .head()
      .map((category) => _.toLower(category))
      .uniq()
      .value();
    return _.filter(itemsData, (itemData) => {
      return (
        filteredItemCategories.includes(itemData.category.toLowerCase()) &&
        itemData.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const DoAndDontSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Curbside Pickup Do's and Don't's</Text>
      {/* Your Do's and Don't's items go here */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
                setCity("Miami");
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
              <DropdownSelector
                setItem={setCity}
                cities={getCities(curbsideData)}
              />
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
              <>
                <DropdownSelector
                  itemType="category"
                  setItem={setCategory}
                  categories={_.chain(itemsData)
                    .map((item) => item.category)
                    .uniq()
                    .value()}
                />
                <DropdownSelector
                  itemType="city"
                  setItem={setCity}
                  cities={getCities(curbsideData)}
                />
              </>
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
          region={_.chain(curbsideData)
            .filter((row) => _.keys(row)[0] === "Miami")
            .head()
            .values()
            .head()
            .pick(["latitude", "longitude"])
            .value()}
          style={
            curbsideColor === "white"
              ? [styles.map, { marginTop: 30 }]
              : styles.map
          }
          scrollDuringRotateOrZoomEnabled={false}
          provider={PROVIDER_GOOGLE}
        >
          {places &&
            places.map((place, index) => (
              <Marker
                key={index}
                coordinate={place.location}
                title={place.name}
              />
            ))}
        </MapView>

        {/* Show recycling information */}
        {city && (
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
            {city && <RecyclingList items={filterItems()} />}
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

              <TouchableOpacity
                style={styles.alternativeButton}
                onPress={() => navigation.navigate("Items")}
              >
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
    fontFamily: "Bebas Neue",
    fontSize: 25,
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
    fontSize: 17,
    fontFamily: "Bebas Neue",
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

export default CurbsideDropoff;
