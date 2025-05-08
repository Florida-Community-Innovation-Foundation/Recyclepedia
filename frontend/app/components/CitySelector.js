import FontAwesome from "@expo/vector-icons/FontAwesome";
import _ from "lodash";
import React from "react";
import { Platform, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { cityData } from "../util/CityData.js";

export default function CitySelector({ setCity }) {
  const selectorData = _.chain(cityData)
    .keys()
    .map((city) => {
      return { label: city, value: city };
    })
    .value();

  if (Platform.OS === "android") {
    return (
      <View style={styles.androidPickerContainer}>
        <Dropdown
          style={styles.androidPicker}
          data={selectorData}
          renderItem={(item, selected) => (
            <View style={selected ? styles.selectedItem : {}}>
              <Text style={itemTextStyle}>{item.label}</Text>
            </View>
          )}
          placeholder="Select a municipality"
          onChange={(item) => setCity(item.value)}
          renderRightIcon={() => (
            <FontAwesome name="caret-down" size={20} color="#024935" />
          )}
        />
      </View>
    );
  } else {
    return (
      <Dropdown
        style={styles.iosPicker}
        data={selectorData}
        renderItem={(item) => (
          <View>
            <Text style={styles.itemTextStyle}>{item.label}</Text>
          </View>
        )}
        placeholder="Select a municipality"
        onChange={(item) => setCity(item.value)}
        renderRightIcon={() => (
          <FontAwesome name="caret-down" size={20} color="#024935" />
        )}
      />
    );
  }
}

const styles = {
  androidPickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
  androidPicker: {
    height: 50,
    width: "100%",
  },
  iosPicker: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  itemTextStyle: {
    color: "#494B4A",
    fontFamily: "Titillium Web",
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: "#CCDED6",
  },
};
