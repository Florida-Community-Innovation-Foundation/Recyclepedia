import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "~/utils/normalize";
import CategoryCard from "./CategoryCard";
import RecyclingItemCard from "./RecyclingItemCard";

const RecyclingList = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  const images = {
    Paper: require("~/assets/img/Paper.jpg"),
    Cans: require("~/assets/img/Cans.jpg"),
    "Hazardous Waste": require("~/assets/img/Hazardous Waste.jpg"),
    Metals: require("~/assets/img/Metals.jpg"),
    Miscellaneous: require("~/assets/img/Miscellaneous.jpg"),
    Electronics: require("~/assets/img/Electronics.jpg"),
    "Household Items": require("~/assets/img/Household Items.jpg"),
    Cardboard: require("~/assets/img/Cardboard.jpg"),
    Furniture: require("~/assets/img/Furniture.jpg"),
    Plastics: require("~/assets/img/Plastics.jpg"),
    Textiles: require("~/assets/img/Textiles.jpg"),
    Batteries: require("~/assets/img/Batteries.jpg"),
    Medication: require("~/assets/img/Medication.jpg"),
    Appliances: require("~/assets/img/Appliances.jpg"),
    Glass: require("~/assets/img/Glass.jpg"),
    "Plastic Bottles": require("~/assets/img/Plastic Bottles.jpg"),
    Cartons: require("~/assets/img/Cartons.jpg"),
    "Yard Waste": require("~/assets/img/Yard Waste.jpg"),
  };

  const categories = _.chain(items)
    .map((item) => item.category)
    .uniq()
    .map((category) => {
      return {
        name: category,
        image: images[category],
      };
    })
    .value();

  const filteredItems = selectedCategory
    ? _.filter(items, (item) => item.category === selectedCategory)
    : items;

  return (
    <View style={styles.container}>
      {/* Categories */}
      {!selectedCategory && (
        <View style={styles.categoriesGrid}>
          {_.map(categories, (category, index) => (
            <CategoryCard
              key={index}
              image={category.image}
              category={category.name}
              onSelect={setSelectedCategory}
            />
          ))}
        </View>
      )}

      {/* Back button when category is selected */}
      {selectedCategory && (
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={styles.backButtonIcon}
            />
            <Text style={styles.backButtonText}>Back to Categories</Text>
          </TouchableOpacity>
          <Text style={styles.categoryTitle}>{selectedCategory} Items</Text>
        </View>
      )}

      {/* Items List */}
      {selectedCategory && (
        <ScrollView
          contentContainerStyle={styles.itemsScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.itemsGrid}>
            {filteredItems.map((item, index) => {
              return (
                <RecyclingItemCard
                  key={index}
                  item={item}
                  onPress={() => setExpandedItem(item)}
                />
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* Expanded Item Modal */}
      {expandedItem && (
        <Modal
          transparent={true}
          visible={!!expandedItem}
          onRequestClose={() => setExpandedItem(null)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => setExpandedItem(null)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>
              <Image
                source={{ uri: expandedItem.image || "default_image_url" }}
                style={styles.expandedItemImage}
                resizeMode="cover"
              />
              <Text style={styles.expandedItemName}>{expandedItem.name}</Text>
              <Text style={styles.expandedItemDescription}>
                {expandedItem.description}
              </Text>
              <Text style={styles.expandedItemRecycleStatus}>
                {canRecycle ? "Can be recycled" : "Cannot be recycled"}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButtonContainer: {
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#234E13",
    paddingHorizontal: 10,
    paddingVertical: normalize(5),
    borderRadius: 10,
  },
  backButtonIcon: { marginRight: 5 },
  backButtonText: { color: "white" },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#234E13",
    paddingVertical: normalize(20),
  },
  itemsScrollView: {
    paddingBottom: 30,
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "80%",
  },
  expandedItemImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  expandedItemName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#234E13",
    marginTop: 10,
  },
  expandedItemDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  expandedItemRecycleStatus: {
    fontSize: 18,
    color: "#234E13",
    marginTop: 15,
  },
});

export default RecyclingList;
