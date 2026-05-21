import { useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
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
  "Filled Gas Cans (Maximum 10 Gallons)",
  "Motor Oil",
  "Oil Filters",
];

// Specific Items (big list of locations w/ same recycling plan)

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

// bal harbour
const bhGood = [
  "Aluminum Cans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
  "Pizza Boxes",
  "Yogurt Containers (All Sizes)"
];

const bhTrash = [
  "Aluminum Foil",
  "Aluminum Pie Pans",
];

const bhSpecial = [
];

// bay harbor island
const bhiGood = [
  "Aluminum Cans",
  "Aluminum Foil",
  "Aluminum Pie Pans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
  "Pizza Boxes",
  "Yogurt Containers (All Sizes)"
];

const bhiTrash = [
];

const bhiSpecial = [
];

// biscayne park
const bpGood = [
  "Aluminum Cans",
  "Aluminum Foil",
  "Aluminum Pie Pans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
];

const bpTrash = [
  "Pizza Boxes",
  "Yogurt Containers (All Sizes)"
];

const bpSpecial = [
];

// coral gables
const cgGood = [
  "Aluminum Cans",
  "Aluminum Foil",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
  "Pizza Boxes",
];

const cgTrash = [
  "Aluminum Pie Pans",
  "Yogurt Containers (All Sizes)"
];

const cgSpecial = [
];

// homestead
const hGood = [
  "Aluminum Cans",
  "Aluminum Pie Pans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
  "Pizza Boxes (Not Greasy)",
  "Yogurt Containers (All Sizes)"
];

const hTrash = [
  "Aluminum Foil",
];

const hSpecial = [
];

// indian creek
const icGood = [
  "Aluminum Cans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
  "Pizza Boxes",
  "Yogurt Containers (All Sizes)"
];

const icTrash = [
  "Aluminum Foil",
  "Aluminum Pie Pans",
];

const icSpecial = [
];

// miami
const mGood = [
  "Aluminum Cans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Toilet Paper Rolls",
  "Pizza Boxes",
];

const mTrash = [
  "Aluminum Foil",
  "Aluminum Pie Pans",
  "Cartons",
  "Steel Cans",
  "Yogurt Containers (All Sizes)"
];

const mSpecial = [
];

// miami shores
const msGood = [
  "Aluminum Cans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
];

const msTrash = [
  "Aluminum Foil",
  "Aluminum Pie Pans",
];

const msSpecial = [
];

// north miami
const nmGood = [
  "Aluminum Cans",
  "Aluminum Foil",
  "Aluminum Pie Pans",
  "Books (Paperback)",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Steel Cans",
  "Toilet Paper Rolls",
  "Pizza Boxes",
  "Yogurt Containers (All Sizes)"
];

const nmTrash = [
  "Shampoo Bottles",
];

const nmSpecial = [
];

// north miami beach
const nmbGood = [
  "Aluminum Cans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
];

const nmbTrash = [
  "Aluminum Foil",
  "Aluminum Pie Pans",
  "Pizza Boxes",
  "Yogurt Containers (All Sizes)"
];

const nmbSpecial = [
];

// surfside
const sGood = [
  "Aluminum Cans",
  "Aluminum Foil",
  "Aluminum Pie Pans",
  "Books",
  "Narrow Neck Bottles",
  "Bottles",
  "Bottles",
  "Cans",
  "Cardboard",
  "Cereal Boxes",
  "Cartons",
  "Detergent Bottles",
  "Documents",
  "Drink Boxes",
  "Glass Bottles",
  "Juice Boxes",
  "Mail",
  "Magazines",
  "Milk Bottles",
  "Milk Cartons",
  "Newspapers",
  "Paper",
  "Paper Egg Cartons",
  "Paper Shopping Bags",
  "Phone Books",
  "Shampoo Bottles",
  "Steel Cans",
  "Toilet Paper Rolls",
  "Pizza Boxes",
  "Yogurt Containers (All Sizes)"
];

const sTrash = [
];

const sSpecial = [
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
const otherGood = ["No Data"];
const otherTrash = ["No Data"];
const otherSpecial = ["No Data"];

function makeDiv({ item }) {
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

    case "Bal Harbour":
      good = bhGood;
      trash = bhTrash;
      special = bhSpecial;
      break;

    case "Bay Harbor Islands":
      good = bhiGood;
      trash = bhiTrash;
      special = bhiSpecial;
      break;

    case "Biscayne Park":
      good = bpGood;
      trash = bpTrash;
      special = bpSpecial;
      break;

    case "Coral Gables":
      good = cgGood;
      trash = cgTrash;
      special = cgSpecial;
      break;

    case "Homestead":
      good = hGood;
      trash = hTrash;
      special = hSpecial;
      break;

    case "Indian Creek":
      good = icGood;
      trash = icTrash;
      special = icSpecial;
      break;

    case "Miami":
      good = mGood;
      trash = mTrash;
      special = mSpecial;
      break;

    case "Miami Shores":
      good = msGood;
      trash = msTrash;
      special = msSpecial;
      break;

    case "North Miami":
      good = nmGood;
      trash = nmTrash;
      special = nmSpecial;
      break;

    case "North Miami Beach":
      good = nmbGood;
      trash = nmbTrash;
      special = nmbSpecial;
      break;

    case "Surfside":
      good = sGood;
      trash = sTrash;
      special = sSpecial;
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

  const [activeTab, setActiveTab] = useState('good');
  const data = {
    good,
    trash,
    special,
  };
  const tabs = [
    { key: 'good', label: 'recycle'},
    { key: 'trash', label: 'trash'},
    { key: 'special', label: 'drop-off'},
  ];

  return (
    <View style={styles.listContainer}>
      {/* tabs */}
      <View style={{ flexDirection: 'row',  }}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={{
              flex: 1, 
              alignItems: 'center', 
              paddingVertical: 12, 
              borderColor: "#024935",
              borderTopWidth: activeTab === tab.key ? 3 : 0,
              borderLeftWidth: activeTab === tab.key ? 3 : 0,
              borderRightWidth: activeTab === tab.key ? 3 : 0,
              borderBottomWidth: activeTab === tab.key ? 0 : 3,
              borderBottomEndRadius: 0,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <Text style={{
              fontSize: 18, fontWeight: activeTab === tab.key ? '500' : '400', color: activeTab === tab.key ? 'black' : '#888'
            }}>
              {tab.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* list */}
      <FlatList
        style={{ borderLeftWidth: 3, borderRightWidth: 3, borderBottomWidth: 3, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderColor: "#024935", paddingHorizontal: 6 }}
        data={data[activeTab]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ paddingVertical: 5, fontSize: 18 }}>
            {item}
          </Text>
        )}
      />

    </View>
  );
}

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
    padding: normalize(8),
    //paddingHorizontal: normalize(8),
    //paddingVertical: normalize(8),
    //gap: normalize(16),
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

