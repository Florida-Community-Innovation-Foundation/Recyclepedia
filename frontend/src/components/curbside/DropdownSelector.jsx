import FontAwesome from "@expo/vector-icons/FontAwesome";
import _ from "lodash";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function DropdownSelector({ setItem, cities, categories }) {
  const [selected, setSelected] = useState("");

  return (
    <Dropdown
      style={styles.picker}
      data={
        cities
          ? _.map(cities, (city) => {
              return { label: city, value: city };
            })
          : _.map(categories, (category) => {
              return { label: category, value: category };
            })
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
      placeholder={
        cities ? "Select municipality" : "What do you want to recycle?"
      }
      value={selected}
      onChange={(item) => {
        setSelected(item.value);
        setItem(item.value);
      }}
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
    marginTop: 5,
    paddingHorizontal: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  itemTextStyle: {
    color: "#494B4A",
    fontFamily: "Titillium Web",
    fontSize: 18,
    padding: 5,
  },
  selectedItem: {
    backgroundColor: "#CCDED6",
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
};
