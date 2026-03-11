import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQueries } from "@tanstack/react-query";
import * as Location from "expo-location";
import _ from "lodash";
import { useEffect } from "react";
import { useStatusBarStyle } from "~/utils/useStatusBarStyle";
import { useState } from "react";
import { useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import DropdownSelector from "~/components/curbside/DropdownSelector";
import {
  getCurbsideData,
  getDropoffData,
  getItemsData,
} from "~/utils/baselineData.js";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "~/utils/normalize";
import { useRecycling } from "../../../../utils/recyclingContext";
import LocationList from "../../../../components/curbside/LocationList";
import CityRules from "../../../../components/curbside/CityRules";
import { Dropdown } from "react-native-element-dropdown";

const CurbsideDropoff = () => {
  useStatusBarStyle("light");

  const navigation = useNavigation();
  const {
    itemsRecycled,
    setItemsRecycled,
    carbonOffset,
    setCarbonOffset,
    chosenItem,
    setChosenItem
  } = useRecycling();
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
    "FIND OUT WHAT CAN BE RECYCLED AT THE CURB IN YOUR\nTOWN OR CITY.",
  );
  const [curbsideColor, setCurbsideColor] = useState("white");
  const [dropoffColor, setDropoffColor] = useState("#024935");
  const [selectText, setSelectText] = useState("SELECT YOUR TOWN OR CITY:");
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [testing, setTesting] = useState(false);
  const mapRef = useRef(null);

  // update places once curbside data loads
  useEffect(() => {
    const newPlaces = _.map(curbsideData, (row) => {
      const location = _.chain(row)
        .values()
        .head()
        .pick(["latitude", "longitude"])
        .value();

      return {
        name: _.keys(row)[0],
        location: location,
      };
    });

    setPlaces(newPlaces);
  }, [curbsideData]);

  // update when city changes
  useEffect(() => {
    if (city == null) {
      return;
    }

    let loc = curbsideData.find(entry => entry[city]);

    // if user selects a drop-off location, loc won't have anything
    if (!loc) {
      loc = places.find((place) => place.name === city);

      // get city coords for map transition
      const testCoord = {
        latitude: loc.location.latitude,
        longitude: loc.location.longitude,
      };

      // update map to zoom in on marker
      mapRef.current.animateToRegion({
        ...testCoord,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421,
      }, 500);

      return;
    }

    // get city coords for map transition
    const testCoord = {
      latitude: loc[city].latitude,
      longitude: loc[city].longitude,
    }

    // update map to zoom in on marker
    mapRef.current.animateToRegion({
      ...testCoord,
      longitudeDelta: 0.0922,
      latitudeDelta: 0.0421,
    }, 500);

  }, [city]);

  // use hardcoded miami coordinates as default, replaced with whatever's loaded in curbside data
  const [region, setRegion] = useState({
    latitude: 25.7617,
    longitude: -80.1918,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  // update the region when curbside data's places finishes loading
  useEffect(() => {
    if (places.length > 0) {
      const miami = places.find((place) => place.name === "Miami");

      if (miami && miami.location) {
        setRegion({
          latitude: miami.location.latitude,
          longitude: miami.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    }
  }, [places]);

  const getCities = (curbsideData) =>
    _.map(curbsideData, (obj) => _.keys(obj)[0]);

  const onSelectCity = (location) =>
      setCity(location);

  const handleSubmit = async () => {
    // debug
    console.log("City: ", city);
    console.log("Places: ", places);

    const materials = new Map([
      //used to calculate carbon offset
      ["plastic", 1.02], // kg CO2 saved per kg of plastic
      ["paper", 0.46],
      ["glass", 0.31],
      ["metals", 5.86],
      ["scrap metals", 3.57],
      ["aluminum", 8.14],
      ["steel", 0.86],
      ["copper", 2.66],
      ["textiles", 3.37],
    ]);

    if (category) {
      setItemsRecycled(itemsRecycled + 1);
      setChosenItem(category);
      setCarbonOffset(prev => prev + materials.get(category));

      setPlaces(
        _.chain(dropOffData)
          .filter((dropOffLocation) => dropOffLocation["Category"] === category)
          .map((dropOffLocation) => {
            return {
              name: dropOffLocation["Name"],
              location: {
                latitude: parseFloat(dropOffLocation["Latitude"]) || 0,
                longitude: parseFloat(dropOffLocation["Longitude"]) || 0,
              },
              street: dropOffLocation["Street"],
            };
          })
          .uniqBy((location) => `${String(location.name).toLowerCase().trim()}_${location.latitude}_${location.longitude}`) // this is just in testing
          .value(),
      );

      //setCity(places.at(0));

      setTesting(true);
    }
  };

  // const handleCurrentLocationPress = async () => {
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
  // };

  // allow users to select municiplaity from map markers
  const handleMapPoiClick = (marker) => {
    if (marker) {
      setCity(marker.name);
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
      <ScrollView style={styles.newScrollViewStyle}>
        <View style={styles.headerContainer}>
          {/*Curbside and drop off pill buttons*/}
          {/* Curbside button */}
          <View style={styles.pillButtonsContainer}>
            <TouchableOpacity
              onPress={() => {
                setSubtitle(
                  "FIND OUT WHAT CAN BE RECYCLED AT THE CURB IN YOUR\nTOWN OR CITY.",
                );
                setCurbsideColor("white");
                setDropoffColor("#024935");
                setSelectText("SELECT YOUR TOWN OR CITY:");
              }}
            >
              {/* Curbside selected */}
              {curbsideColor === "white" && (
                <View style={styles.pillButtonSelected}>
                  <Text
                    style={[
                      styles.pillText,
                      {
                        color: curbsideColor === "white" ? "#024935" : "white",
                      },
                    ]}
                  >
                    {" "}
                    Curbside{" "}
                  </Text>
                </View>
              )}
              {/* Curbside not selected */}
              {curbsideColor !== "white" && (
                <View style={styles.pillButtonNotSelected}>
                  <Text
                    style={[
                      styles.pillText,
                      {
                        color: curbsideColor === "white" ? "#024935" : "white",
                      },
                    ]}
                  >
                    {" "}
                    Curbside{" "}
                  </Text>
                </View>
              )}
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
              {dropoffColor === "white" && (
                <View style={styles.pillButtonSelected}>
                  <Text
                    style={[
                      styles.pillText,
                      { color: dropoffColor === "white" ? "#024935" : white },
                    ]}
                  >
                    {" "}
                    Drop-Off{" "}
                  </Text>
                </View>
              )}

              {/* Drop-off not selected */}
              {dropoffColor !== "white" && (
                <View style={styles.pillButtonNotSelected}>
                  <Text
                    style={[
                      styles.pillText,
                      { color: dropoffColor === "white" ? "#024935" : "white" },
                    ]}
                  >
                    {" "}
                    Drop-Off{" "}
                  </Text>
                </View>
              )}
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
              {/* Municipality dropdown */}
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
                  setCity(item.value);
                }}
                renderRightIcon={() => (
                  <FontAwesome name="caret-down" size={20} color="#024935" />
                )}
                key="curbsideCityDropdown"
              />


                {/* This is currently disabled since it's buggy and hard to test */}
              {/* Show "Use my current location" for users to populate location data automatically */}
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
                  key="dropoffCategoryDropdown"
                />

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
                    setCity(item.value);
                  }}
                  renderRightIcon={() => (
                    <FontAwesome name="caret-down" size={20} color="#024935" />
                  )}
                  key="curbsideCityDropdown"
                />

                {/* <DropdownSelector
                    itemType="city"
                    setItem={setCity}
                    cities={getCities(curbsideData)}
                    key="dropoffCityDropdown"
                  /> */}
              </>


              {/* This is currently disabled since it's buggy and hard to test */}
              {/* Show "Use my current location" for users to populate location data automatically */}
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
          </View>
        )}

        {/* Show "Use my current location" for users to populate location data automatically */}
        {/* <Pressable
            style={styles.selectCurrentLocation}
            onPress={handleCurrentLocationPress}
          >
            <FontAwesome name="location-arrow" size={18} color="#828282" />
            <Text style={styles.selectCurrentLocationText}>
              Use my current location
            </Text>
          </Pressable> */}

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
                //marginHorizontal: 32,
              },
            ]}
          >
            {MAP_LABEL}
          </Text>
        )}

        <View style={styles.mapRulesContainer}>
          {/* Map */}
          <MapView
            region={region}
            style={
              curbsideColor === "white"
                ? [styles.map, { marginTop: 30, }]
                : styles.map
            }
            scrollDuringRotateOrZoomEnabled={false}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
          >
            {places &&
              places.map((place, index) => (
                <Marker
                  key={index}
                  coordinate={place.location}
                  title={place.name}
                  description={place.street}
                  titleVisibility="visible" // [note]: this is only on ios (so no android emulator)
                  onPress={() => handleMapPoiClick(place)}
                />
              ))}
          </MapView>

          {/* Show list of recycling locations */}
          {dropoffColor === "white" &&
            <LocationList locations={places} onSelectCity={onSelectCity} />
          }
          {
            curbsideColor === "white" && city != null &&
            <CityRules location={city} />
          }
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  picker: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    //fontFamily: "Titillium Web",
  },

  placeholderStyle: {
    fontSize: 18,
    fontFamily: "Titillium Web",
    color: "#828282",
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

  // testing
  scrollviewstyle: {
    flexGrow: 1,
  },

  newScrollViewStyle: {
    flexGrow: 1,
    paddingHorizontal: normalize(30),
  },

  // General Containers
  container: {
    flex: 1,
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
    //padding: normalize(15),
    //marginHorizontal: normalize(20),
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
    marginLeft: normalize(175, "width"),
    marginTop: normalize(10, "height"),
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
    marginLeft: normalize(185, "width"),
    marginRight: normalize(32, "width"),
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
    //marginHorizontal: normalize(32, "width"),
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

  // style for view containing map and rules for locations
  mapRulesContainer: {
    marginBottom: normalize(100),
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
