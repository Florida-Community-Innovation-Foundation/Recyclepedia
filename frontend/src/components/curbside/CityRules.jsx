import { Text, View, StyleSheet, FlatList } from "react-native";
import { normalize } from "~/utils/normalize";

// knot ideal but we need something for saturday
// print list of city recycling rules based on location
// note: finish this off, should be easy, just takes a while

// General Items (big list of locations w/ same recycling plan)
const bigListGood = [
  "Aluminum Cans",
  "Drink Cartons (Aseptic Containers)",
  "Books",
  "Plastic and Glass Bottles",
  "Plastic Butter Tubs",
  "Cans",
  "Cardboard",
  "Shredded Documents",
  "Paper Egg Cartons",
  "Magazines and News Paper",
  "Paper Products (non-waxed)",
  "Plastic Cups",
  "Toilet Paper Rolls",
  "Yogurt Cups",
];

const bigListTrash = [
  "Incandescent Light Bulbs",
  "Ceramic",
  "Christmas Lights",
  "Clothing",
  "Small Amounts of Cooking Oil",
  "Plastic or Styrofoam Egg Cartons",
  "Non-Hazardous Electronics (such as a Vacuum Cleaner)",
  "Eyeglasses",
  "Foam Products",
  "Garden Hoses",
  "Empty Gas Cans",
  "Glass Storage Containers",
  "Clothes Hangers",
  "Juice Pouches",
  "Kitchen Appliances",
  "Latex/Rubber Gloves",
  "Medicine Bottles",
  "Packing Materials (Foam or Bubble Wrap)",
  "Plastic Bags",
  "Plastic Plant Pots, Plates, and Utensils",
  "Tea Bags",
  "Electronic Cables",
  "Wax Paper",
  "Yard Waste",
  "Zip-Lock Bags",
];

const bigListSpecial = [
  "Aerosol Cans",
  "Batteries",
  "Fluorescent Light Bulbs",
  "Ink Cartridges",
  "Household Chemicals such as Paint, Pesticides, or Fertilizers",
  "Barrels",
  "Hazardous Electronics (such as Computers)",
  "Furniture",
  "Filled Gas Cans (maximum 10 Gallons)",
  "Motor Oil",
  "Oil Filters",
];

// key biscayne
const kbGood = [
  "Clean Aluminum/Steel Cans",
  "Plastic Bottles",
  "Aluminum Foil",
  "Paper Cartons",
  "Cereal Boxes",
  "Newspaper/Magazines",
  "Cardboard Boxes"
];

const kbTrash = [
  "Light Bulbs",
  "China/Glassware",
  "Food Trays",
  "Plastic Wrap",
  "Styrofoam"
];

const kbSpecial = [
  "Hazardous Waste",
  "Batteries",
  "Paint",
  "Propane Cylinders",
  "Chemicals"
];

// Hialeah
const hiaGood = [
  "Plastic Bottles",
  "Jugs",
  "Tubs",
  "Aluminum/Steel Cans",
  "Clean Trays",
  "Cardboard",
  "Paper",
];

const hiaTrash = [
  "Glass",
  "Grocery Bags",
  "Plastic Utensils",
  "Trash Bags",
  "Hoses",
  "Electronics",
  "Clothing",
  "Food Waste",
  "Styrofoam",
  "Shredded Paper",
  "Scrap Metal",
  "Drink Cups",
];

const hiaSpecial = [
  "Oil-Based Paints",
  "Pool Chemicals",
  "Pesticides",
  "Solvents",
  "Propane Cylinders",
  "Oxygen Tanks",
  "Fencing",
];

// Golden Beach
const gbGood = [
  "Newspapers",
  "Aluminum/Steel Cans",
  "Glass/Plastic Bottles",
  "Jars",
];

const gbTrash = [
  "Telephone Books",
  "Cardboard",
  "Plastic Bags",
];

const gbSpecial = [
  "Batteries",
  "Hazardous Waste",
];

// hialeah gardens
const hgGood = [
  "Plastic Bottles",
  "Cans",
  "Paper",
  "Cardboard",
];

const hgTrash = [
  "Household Waste",
];

const hgSpecial = [
  "Batteries",
  "Hazardous Waste",
];

// others (fix somehow)
// Bal Harbour 305-866-4633
// Bay Harbor Island 305-866-6241
// Biscayne Park 305-893-4346
// Coral Gables 305-460-5346
// Homestead 305-224-4860
// Indian Creek 305-865-4121
// Miami 311
// Miami Shores 305-795-2210
// North Miami 305-895-9870
// North Miami Beach 305-948-2904
// Surfside 305-861-4863
const otherGood = [ "No Data" ];
const otherTrash = [ "No Data" ];
const otherSpecial = [ "No Data" ];

function makeDiv({item}) {
  <View>
    <Text>
      {item}
    </Text>
  </View>
}

export default function CityRules({ location }) {
  let good, trash, special;

  switch (location) {
    case "Aventura":
    case "Cutler Bay":
    case "Doral":
    case "Miami":
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
      good = bigListGood;
      trash = bigListTrash;
      special = bigListSpecial;
      break;

    case "Key Biscayne":
      good = kbGood;
      trash = kbTrash;
      special = kbSpecial;
      break;

    case "Hialeah":
      good = hiaGood;
      trash = hiaTrash;
      special = hiaSpecial;
      break;

    case "Golden Beach":
      good = gbGood;
      trash = gbTrash;
      special = gbSpecial;
      break;

    case "Hialeah Gardens":
      good = hgGood;
      trash = hgTrash;
      special = hgSpecial;
      break;

    default:
      console.error("NO INFO FOR THIS LOCATION");
      good = otherGood;
      trash = otherTrash;
      special = otherSpecial;
      break;
  }

  if (good.length === 0 && trash.length === 0 && special.length === 0) {
    //console.error("NO INFO FOR LOCATION ", location);
    <View>
      <Text>
        No info for location: {location}!
      </Text>
    </View>
  }

  return (
    <View style={styles.listContainer}>
      {/* city name */}
      <Text style={styles.cityTitle}>
        {location}
      </Text>

      <View style={styles.sectionContainer}>
      {/* section header */}
      <Text style={styles.sectionHeader}>
        Recycleable Items
      </Text>
      
      {/* item list */}
      <View>
        {good.map((item, index) => (
          <Text style={styles.itemEntry} key={index}>
                {item}
              </Text>
        ))}
      </View>
      </View>

      {/* trash */}
      <View style={styles.sectionContainer}>
      {/* section header */}
      <Text style={styles.sectionHeader}>
        Trash
      </Text>
      
      {/* item list */}
      <View>
        {trash.map((item, index) => (
          <Text style={styles.itemEntry} key={index}>
                {item}
              </Text>
        ))}
      </View>
      </View>

      {/* drop-off */}
      <View style={styles.sectionContainer}>
      {/* section header */}
      <Text style={styles.sectionHeader}>
        Drop-Off
      </Text>

      <Text style={styles.sectionSubtitle}>
        Consider checking out the Drop-Off tab to find locations for special items!
      </Text>
      
      {/* item list */}
      <View>
        {special.map((item, index) => (
          <Text style={styles.itemEntry} key={index}>
                {item}
              </Text>
        ))}
      </View>
      </View>
    </View>
  );
};

// export default function CityRules({ location }) {
//   // console.log("Locatoin: ", location);
//   switch (location) {
//     default:
//     // case "Aventura":
//     // case "Cutler Bay":
//     // case "Doral":
//     // case "Miami Gardens":
//     // case "Miami Lakes":
//     // case "Opa-locka":
//     // case "Palmetto Bay":
//     // case "Pinecrest":
//     // case "Sunny Isles Beach":
//     // case "Sweetwater":
//     // case "El Portal":
//     // case "Florida City":
//     // case "Medley":
//     // case "Miami Beach":
//     // case "Miami Springs":
//     // case "North Bay Village":
//     // case "South Miami":
//     // case "Virginia Gardens":
//     // case "West Miami":
//       return (
//         <View style={styles.container}>
//           {/* city name */}
//           <Text style={styles.itemTitle}>
//             {location}
//           </Text>

//           {/* header */}
//           <Text style={styles.alternativeText}>
//             Recyclable Items:
//           </Text>

//           {/* list of recyclable items */}
//           <Text style={styles.alternativeText}> Aluminum Cans </Text>
//           <Text style={styles.alternativeText}> Juice/Milk Cartons </Text>
//           <Text style={styles.alternativeText}> Books </Text>
//           <Text style={styles.alternativeText}> Plastic & Glass Bottles </Text>
//           <Text style={styles.alternativeText}> Plastic Butter & Margarine Tubs </Text>
//           <Text style={styles.alternativeText}> Cans </Text>
//           <Text style={styles.alternativeText}> Clean Cardboard</Text>
//           <Text style={styles.alternativeText}> Paper Documents</Text>
//           <Text style={styles.alternativeText}> Paper egg cartons</Text>

//           {/* header */}
//           <Text style={styles.alternativeText}>
//             Non-Recyclable Items:
//           </Text>

//           {/* list of non-recyclable items */}
//           <Text style={styles.alternativeText}> Aerosol Cans </Text>
//           <Text style={styles.alternativeText}> Batteries (Rechargeable, coin cell, and vehicle batteries may not be thrown away, either. Check the Drop-Off tab for a suitable disposal location) </Text>
//           <Text style={styles.alternativeText}> Ceramics</Text>
//           <Text style={styles.alternativeText}> Christmas Trees</Text>
//           <Text style={styles.alternativeText}> Christmas Lights</Text>
//           <Text style={styles.alternativeText}> Eye Glasses</Text>
//           <Text style={styles.alternativeText}> Foam Products</Text>
//           <Text style={styles.alternativeText}> Furniture</Text>
//           <Text style={styles.alternativeText}> Garden Hoses</Text>

//           <Text style={styles.alternativeText}>
//             Non-Recyclable & Non-Trash Items:
//           </Text>

//           <Text style={styles.alternativeText}>Rechargeable, coin cell, and vehicle batteries</Text>
//           <Text style={styles.alternativeText}>Light Bulbs</Text>
//           <Text style={styles.alternativeText}>Ink cartridges</Text>

//         </View>
//       );

//     //default:
//       // return (
//       //   <View style={styles.container}>
//       //     {/* city name */}
//       //     <Text style={styles.itemTitle}>
//       //       {location}
//       //     </Text>

//       //     {/* header */}
//       //     <Text style={styles.alternativeText}>
//       //       Recyclable Items:
//       //     </Text>

//       //     {/* list of recyclable items */}
//       //     <Text style={styles.alternativeText}> Data not yet available for {location}! </Text>

//       //   </View>
//       // );
//   }
// }

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(15),
    backgroundColor: "white",
    borderRadius: normalize(15),
    padding: normalize(15),
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
    fontSize: normalize(16),
    color: "#666",
    lineHeight: normalize(20),
  },

  listContainer: {
    backgroundColor: "#fff",
    marginTop: normalize(15),
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(8),
    gap: normalize(16),
    borderRadius: normalize(8),
  },

  cityTitle: {
    alignSelf: "center",
    fontSize: normalize(24),
    color: "#234E13",
    fontWeight: "bold",
  },

  sectionContainer: {
    borderRadius: normalize(8),
    backgroundColor: "white",
    padding: normalize(15),

    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },

  sectionHeader: {
    fontSize: normalize(20),
    color: "#16320cff",
    alignSelf: "center",
  },

  sectionSubtitle: {
    alignSelf: "center",
  },

  itemEntry: {
    fontSize: normalize(18),
  },
});

