import { View, Text, TextInput, StyleSheet } from "react-native";
import BackButton from "~/components/common/BackButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";

const data = {
  Account: ["Account", "Privacy", "Security & Permissions", "Share Profile"],
  "Content & Display": ["Notifications", "Language"],
  "Support & About": [
    "Report A Problem",
    "Support",
    "Rate Our App",
    "Terms of Service",
    "Privacy Policy",
  ],
  Login: ["Logout"],
};

export default function SettingsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.screen}>
      <BackButton color="#024935" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>SETTINGS AND PRIVACY </Text>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#024935" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search"
          />
        </View>
        {}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    color: "#024935",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 15,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    marginLeft: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});
