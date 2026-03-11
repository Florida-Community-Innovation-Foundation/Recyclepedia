import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { normalize } from "~/utils/normalize";

// list of locations after user submits category and municipality

export default function LocationList({ locations, onSelectCity }) {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.alternativeText}
      >
        Available Drop-Off Locations
      </Text>
      {
        locations.map((location, index) => (
          // <View
          //   key={index}
          //   style={styles.itemSection}
          // >
          //   <Text
          //     style={styles.itemTitle}
          //   >
          //     {location.name}
          //   </Text>
          //   <Text
          //     style={styles.itemDescription}
          //   >
          //     {location.street}
          //   </Text>
          // </View>
          <TouchableOpacity
            key={index}
            style={styles.itemSection}
            onPress={() => onSelectCity(location.name)}
          >
            <Text
              style={styles.itemTitle}
            >
              {location.name}
            </Text>
            <Text
              style={styles.itemDescription}
            >
              {location.street}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: normalize(15),
    padding: normalize(15),
    marginTop: normalize(15),
    //marginBottom: normalize(50),
    //marginHorizontal: normalize(16),
    alignItems: "center",
  },

  alternativeText: {
    fontSize: normalize(18),
    color: "#666",
    marginBottom: normalize(15),
  },

  itemSection: {
    backgroundColor: "#f9f9f9",
    borderRadius: normalize(10),
    padding: normalize(15),
    marginBottom: normalize(10),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    width: "100%",
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

