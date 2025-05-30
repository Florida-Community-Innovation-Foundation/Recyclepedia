import { useFormikContext } from "formik";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function EventTextInput({ textInputField }) {
  const { handleChange, values, errors, touched } = useFormikContext();

  return (
    <View>
      <View style={styles.textInput}>
        <TextInput
          placeholder={textInputField}
          placeholderTextColor="#888888" // Set the desired placeholder color
          onChangeText={handleChange(textInputField)}
          value={values[textInputField]}
          multiline={textInputField === "Event Description"}
        />
      </View>
      {errors[textInputField] && touched[textInputField] && (
        <Text style={styles.errorText}>{errors[textInputField]}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 13,
    color: "red",
    marginBottom: 10,
    marginLeft: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
});
