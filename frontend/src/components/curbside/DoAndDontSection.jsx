import {
    Text,
    View,
    StyleSheet
  } from "react-native";

export default function DoAndDontSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Curbside Pickup Do's and Don't's</Text>
      {/* Your Do's and Don't's items go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#234E13",
    marginBottom: 15,
    textAlign: "center",
  },
});