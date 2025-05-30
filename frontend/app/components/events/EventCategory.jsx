import { Picker } from "@react-native-picker/picker";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const eventCategories = [
  "Workshop",
  "Seminar",
  "Community Event",
  "Recycling Drive",
  "Educational Event",
  "Others",
];

export default function EventCategory() {
  const { values, setFieldValue } = useFormikContext();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setFieldValue("Event Category", selectedCategory);
  }, [selectedCategory]);

  return (
    <Picker
      selectedValue={selectedCategory}
      onValueChange={setSelectedCategory}
      style={{
        ...styles.categoryPicker,
        color: values.pickerColor,
      }}
    >
      <Picker.Item label="Select a category" value="" />
      {eventCategories.map((category) => (
        <Picker.Item
          key={category}
          label={category}
          value={category}
          color={values.pickerColor}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  categoryPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
});
