import FontAwesome from "@expo/vector-icons/FontAwesome";
import _ from "lodash";
import React from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { categoryData, cityData } from "../util/CityData.js";

export default function DropdownSelector({ itemType, setItem }) {
  let selectorData;
  if (itemType === "city") {
    selectorData = _.chain(cityData)
      .keys()
      .map((city) => {
        return { label: city, value: city };
      })
      .value();
  } else if (itemType === "category") {
    selectorData = _.chain(categoryData)
      .map((category) => {
        return { label: category, value: category };
      })
      .value();
  }

  return (
    <Dropdown
      style={styles.picker}
      data={selectorData}
      renderItem={(item) => (
        <View>
          <Text style={styles.itemTextStyle}>{item.label}</Text>
        </View>
      )}
      placeholder="Select a municipality"
      onChange={(item) => setItem(item.value)}
      renderRightIcon={() => (
        <FontAwesome name="caret-down" size={20} color="#024935" />
      )}
    />
  );
}

const styles = {
  picker: {
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
