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
import DropdownSelector from "~/components/curbside/DropdownSelector";
import RecyclingList from "~/components/curbside/RecyclingList";
import DoAndDontSection from "~/components/curbside/DoAndDontSection";
import { normalize } from "~/utils/normalize";

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
    const filteredItems =
      _.chain(curbsideData)
        .filter((obj) => _.keys(obj)[0] === city)
        .head()
        .values()
        .map((obj) => obj["items"])
        .head()
        .toLower()
        .split(",")
        .value() || [];
    return _.filter(itemsData, (item) => {
      return (
        filteredItems.includes(item.name.toLowerCase()) &&
        item.category.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          {/*Curbside and drop off pill buttons*/}

          {/* Curbside button */}
          <View style={ styles.pillButtonsContainer }>
            <TouchableOpacity
              onPress={() => {
                setSubtitle(
                  "FIND OUT WHAT CAN BE RECYCLED AT THE CURB IN YOUR\nMUNICIPALITY.",
                );
                setCurbsideColor("white");
                setDropoffColor("#024935");
                setSelectText("SELECT YOUR MUNICIPALITY:");
              }}
            >
              {/* Curbside selected */}
              {
                curbsideColor === "white" &&
                <View style={ styles.pillButtonSelected }>
                  <Text style={[ styles.pillText, { color: curbsideColor === "white" ? "#024935" : "white" } ]}> Curbside </Text>
                </View>
                
              }
              {/* Curbside not selected */}
              {
                curbsideColor !== "white" &&
                <View style={ styles.pillButtonNotSelected }>
                  <Text style={[ styles.pillText, { color: curbsideColor === "white" ? "#024935" : "white" } ]}> Curbside </Text>
                </View>                
              }              
            </TouchableOpacity>            
            
            {/* Drop-Off Button */}
            <TouchableOpacity
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
              {/* Drop-off selected */}
              {
                dropoffColor === "white" &&
                <View style={ styles.pillButtonSelected }>
                  <Text style={[ styles.pillText, { color: dropoffColor === "white" ? "#024935" : white } ]}> Drop-Off </Text>
                </View>
                
              }

              {/* Drop-off not selected */}
              {
                dropoffColor !== "white" &&
                <View style={ styles.pillButtonNotSelected }>
                  <Text style={[ styles.pillText, { color: dropoffColor === "white" ? "#024935" : "white" } ]}> Drop-Off </Text>
                </View>                
              }
            </TouchableOpacity>
          </View>

          <Text style={[styles.subtitle, { color: "#BBB8B8" }]}>
            {subtitle}
          </Text>
        </View>

        {/*Conditionally rendering drop downs based on color */}
        {curbsideColor === "white" && (
          <View>
            <View style={styles.cityPickerContainer}>
              <Text style={styles.cityPickerLabel}>{selectText}</Text>
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
              <Text style={styles.cityPickerLabel}>{selectText}</Text>
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
            ]}
          >
            {MAP_LABEL}
          </Text>
        )}

        {/* Map 
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
        </MapView>*/}

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
            {city && (
              <RecyclingList items={_.sortBy(filterItems(), "category")} />
            )}
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
    flex: normalize(1),
    backgroundColor: "#024935",
  },
  contentContainer: {
    marginHorizontal: normalize(10, "width"),
    marginVertical: normalize(10, "height"),
  },

  //Button container
  pillButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: normalize(10, "height"),

    borderColor: "white",
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(30),
  },
  // Selected pill (if selected, this will should draw over, but doesn't FIXME)
  pillButtonSelected: {
    padding: 2,

    borderColor: "#024935",
    backgroundColor: "white",
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(30),
  },
  // Deselected pill
  pillButtonNotSelected: {
    padding: 2,

    borderColor: "transparent",
    borderWidth: normalize(1, "width"),
    borderRadius: normalize(30),
  },

  pillButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: normalize(10, "height"),
  },
  curbsidePill: {
    backgroundColor: "",
    paddingVertical: 2,
    paddingHorizontal: 22,
    borderRadius: normalize(30),
    marginHorizontal: -10,
    borderWidth: normalize(1, "width"),
    borderColor: "white",
  },
  dropOffPill: {
    backgroundColor: "green",
    paddingVertical: normalize(2, "height"),
    paddingHorizontal: normalize(22, "width"),
    borderRadius: normalize(30),
    marginHorizontal: normalize(-10, "width"),
    borderWidth: normalize(1, "width"),
    borderColor: "white",
  },
  pillText: {
    color: "white",
    //color: "black",
    fontWeight: 400,
    fontFamily: "Bebas Neue",
    fontSize: normalize(30),
    textAlign: "center",
    //padding: 4,
    paddingHorizontal: normalize(16, "width"),
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: normalize(10, "width"),
    paddingVertical: normalize(35, "height"),
  },

  // Header Styles
  headerContainer: {
    alignItems: "center",
    paddingVertical: normalize(10, "height"),
  },
  title: {
    fontSize: normalize(28),
    color: "#6ad04b",
    marginBottom: normalize(10, "height"),
  },
  subtitle: {
    fontSize: normalize(20),
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    textAlign: "center",
    marginTop: normalize(5, "height"),
  },

  // City Picker Styles
  cityPickerContainer: {
    borderRadius: normalize(20),
    padding: normalize(15),
    marginHorizontal: normalize(20),
  },
  input: {
    height: normalize(50, "height"),
    fontSize: normalize(16),
    color: "#828282",
  },
  cityPickerLabel: {
    fontSize: normalize(22),
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    color: "white",
    marginBottom: normalize(10, "height"),
    marginTop: normalize(-10, "height"),
  },
  pickerWrapper: {
    backgroundColor: "white",
    borderWidth: normalize(1, "width"),
    borderColor: "#ddd",
    borderRadius: normalize(10),
    height: normalize(50, "height"),
    marginTop: normalize(10, "height"),
    paddingLeft: normalize(10, "width"),
  },
  pickerText: {
    color: "#828282",
    height: normalize(50, "height"),
  },
  // Location select Styles
  selectCurrentLocation: {
    display: "flex",
    flexDirection: "row",
    marginLeft: normalize(185, "width"),
  },
  selectCurrentLocationText: {
    textAlign: "right",
    color: "#828282",
    textDecorationLine: "underline",
    marginLeft: normalize(5, "width"),
    fontFamily: "Titillium Web",
    fontSize: normalize(14),
    fontWeight: 400,
  },

  //Submit Button Styles
  submitButton: {
    backgroundColor: "#24A0ED",
    width: normalize(150, "width"),
    height: normalize(40, "height"),
    borderRadius: normalize(8),
    marginBottom: normalize(5, "height"),
    marginTop: normalize(15, "height"),
    marginLeft: normalize(32, "width"),
    marginRight: normalize(32, "width"),
    marginLeft: normalize(200, "width"),
  },
  submitButtonText: {
    color: "#FFFFFF",
    marginTop: normalize(10, "height"),
    textAlign: "center",
  },
  //Map Styles
  map: {
    width: normalize(340, "width"),
    height: normalize(300, "height"),
    marginHorizontal: normalize(32, "width"),
    borderRadius: normalize(11),
  },
  callout: {
    backgroundColor: "white",
    padding: normalize(10),
  },
  // Search Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: normalize(15),
    paddingHorizontal: normalize(15),
    marginBottom: normalize(15),
    marginHorizontal: normalize(16),
  },
  searchInput: {
    flex: 1,
    height: normalize(50, "height"),
    fontSize: normalize(16),
  },
  searchIcon: {
    width: normalize(20, "width"),
    height: normalize(20, "height"),
  },

  // Alternative Section Styles
  alternativeContainer: {
    backgroundColor: "white",
    borderRadius: normalize(15),
    padding: normalize(15),
    marginBottom: normalize(50),
    marginHorizontal: normalize(16),
    alignItems: "center",
  },
  alternativeText: {
    fontSize: normalize(18),
    color: "#666",
    marginBottom: normalize(15),
  },
  alternativeButton: {
    backgroundColor: "#234E13",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(12),
    borderRadius: normalize(15),
  },
  alternativeButtonText: {
    color: "white",
    fontSize: normalize(16),
    textAlign: "center",
  },

  // Item Section Styles
  itemSection: {
    backgroundColor: "#f9f9f9",
    borderRadius: normalize(10),
    padding: normalize(15),
    marginBottom: normalize(10),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  itemTitle: {
    fontSize: normalize(18),
    fontWeight: "bold",
    color: "#234E13",
    marginBottom: normalize(5),
  },
  itemDescription: {
    fontSize: normalize(14),
    color: "#666",
    lineHeight: normalize(20),
  },
});

export default CurbsideDropoff;
