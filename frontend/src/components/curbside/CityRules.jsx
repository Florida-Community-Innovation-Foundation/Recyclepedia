import { Text, View, StyleSheet } from "react-native";
import { normalize } from "~/utils/normalize";

// not ideal but we need something for saturday
// print list of city recycling rules based on location
// note: finish this off, should be easy, just takes a while

export default function CityRules({ location }) {
  switch (location) {
    case "Aventura":
    case "Cutler Bay":
    case "Doral":
    case "Miami Gardens":
    case "Miami Lakes":
    case "Opa-locka":
    case "Palmetto Bay":
    case "Pinecrest":
    case "Sunny Isles Beach":
    case "Sweetwater":
    case "El Portal":
    case "Florida City":
    case "Medley":
    case "Miami Beach":
    case "Miami Springs":
    case "North Bay Village":
    case "South Miami":
    case "Virginia Gardens":
    case "West Miami":
      return (
        <View style={styles.container}>
          {/* city name */}
          <Text style={styles.itemTitle}>
            {location}
          </Text>

          {/* header */}
          <Text style={styles.alternativeText}>
            Recyclable Items:
          </Text>

          {/* list of recyclable items */}
          <Text style={styles.alternativeText}> Aluminum Cans </Text>
          <Text style={styles.alternativeText}> Juice/Milk Cartons </Text>
          <Text style={styles.alternativeText}> Books </Text>
          <Text style={styles.alternativeText}> Plastic & Glass Bottles </Text>
          <Text style={styles.alternativeText}> Plastic Butter & Margarine Tubs </Text>
          <Text style={styles.alternativeText}> Cans </Text>
          <Text style={styles.alternativeText}> Clean Cardboard</Text>
          <Text style={styles.alternativeText}> Paper Documents</Text>
          <Text style={styles.alternativeText}> Paper egg cartons</Text>

          {/* header */}
          <Text style={styles.alternativeText}>
            Non-Recyclable Items:
          </Text>

          {/* list of non-recyclable items */}
          <Text style={styles.alternativeText}> Aerosol Cans </Text>
          <Text style={styles.alternativeText}> Batteries (Rechargeable, coin cell, and vehicle batteries may not be thrown away, either. Check the Drop-Off tab for a suitable disposal location) </Text>
          <Text style={styles.alternativeText}> Ceramics</Text>
          <Text style={styles.alternativeText}> Christmas Trees</Text>
          <Text style={styles.alternativeText}> Christmas Lights</Text>
          <Text style={styles.alternativeText}> Eye Glasses</Text>
          <Text style={styles.alternativeText}> Foam Products</Text>
          <Text style={styles.alternativeText}> Furniture</Text>
          <Text style={styles.alternativeText}> Garden Hoses</Text>

          <Text style={styles.alternativeText}>
            Non-Recyclable & Non-Trash Items:
          </Text>

          <Text style={styles.alternativeText}>Rechargeable, coin cell, and vehicle batteries</Text>
          <Text style={styles.alternativeText}>Light Bulbs</Text>
          <Text style={styles.alternativeText}>Ink cartridges</Text>

        </View>
      );

    default:
      return (
        <View style={styles.container}>
          {/* city name */}
          <Text style={styles.itemTitle}>
            {location}
          </Text>

          {/* header */}
          <Text style={styles.alternativeText}>
            Recyclable Items:
          </Text>

          {/* list of recyclable items */}
          <Text style={styles.alternativeText}> Data not yet available for {location}! </Text>

        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: normalize(16),
    color: "#666",
    lineHeight: normalize(20),
  },
});

