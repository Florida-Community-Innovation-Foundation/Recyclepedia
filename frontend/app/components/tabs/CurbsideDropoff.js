import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { cityData } from "../../util/CityData.js";
import RecyclingList from "../RecyclingList.js";

const CurbsideDropoff = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [recyclingItems, setRecyclingItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subtitle, setSubtitle] = useState(
    "FIND OUT WHAT CAN BE RECYCLED AT THE CURB IN YOUR\nMUNICIPALITY.",
  );
  const [curbsideColor, setCurbsideColor] = useState("white");
  const [dropoffColor, setDropoffColor] = useState("#024935");
  const [selectText, setSelectText] = useState("SELECT YOUR MUNICIPALITY");
  const [address, setAddress] = useState("");

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    setRecyclingItems(cityData[selectedCity] || []);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filteredItems = recyclingItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const DoAndDontSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Curbside Pickup Do's and Don't's</Text>
      {/* Your Do's and Don't's items go here */}
    </View>
  );

  const curbside = () => {
    return (
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
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.pickerText}
              selectedValue={city}
              onValueChange={handleCityChange}
            >
              <Picker.Item label="Select municipality" value="" />
              {Object.keys(cityData).map((cityName) => (
                <Picker.Item key={cityName} label={cityName} value={cityName} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  };

  const dropOff = () => {
    return (
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

          <View style={styles.pickerWrapper}>
            {/*This needs to display categories not areas of miami-dade*/}
            <Picker
              style={styles.pickerText}
              selectedValue={city}
              onValueChange={handleCityChange}
            >
              <Picker.Item label="What do you want to recycle?" value="" />
              {Object.keys(cityData).map((cityName) => (
                <Picker.Item key={cityName} label={cityName} value={cityName} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            ></TextInput>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          /Curbside and drop off buttons*/
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
              </Text>{" "}
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.subtitle,
              { color: "#BBB8B8" },
              { fontFamily: "BebasNeue_400Regular" },
            ]}
          >
            {" "}
            {subtitle}{" "}
          </Text>
        </View>

        {/*Conditionally rendering drop downs based on color */}
        {curbsideColor === "white" && curbside()}
        {dropoffColor === "white" && dropOff()}

        {city && (
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder="Search for recycling items..."
              />
              <Image
                source={require("../../../assets/magnifyingGlass.png")}
                style={styles.searchIcon}
              />
            </View>

            <RecyclingList
              items={filteredItems}
              city={city}
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
  },

  //Button container
  pillButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 45,
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    color: "#6ad04b",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: -30,
  },

  // City Picker Styles
  cityPickerContainer: {
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
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
    marginTop: -20,
  },
  pickerWrapper: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 50,
    marginBottom: 15,
  },
  pickerText: {
    color: "#828282",
    height: 50,
  },
  // Search Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
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
