import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import diggy from "~/assets/Diggy.png";

export default function UserProfile() {
  const [profilePicture, setProfilePicture] = useState(diggy);
  const [itemsRecycled, setItemsRecycled] = useState(32);
  const [totalItemsToRecycle, setTotalItemsToRecycle] = useState(100);

  const handleProfilePictureEdit = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.profileBackground}>
        <Pressable style={styles.settings}>
          <Ionicons name="settings-sharp" size={24} color="#FFFFFF" />
        </Pressable>
        {/* Profile Picture */}
        <Image source={profilePicture} style={styles.profilePicture} />
        <Pressable
          style={styles.profilePictureEdit}
          onPress={handleProfilePictureEdit}
        >
          <MaterialIcons name="edit" size={24} color="#024935" />
        </Pressable>
        <Text style={styles.username}> HELI </Text>
      </View>
      <View style={styles.profileInfo}>
        {/* Recycling Goal */}
        <View style={styles.recyclingInfoContainer}>
          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> RECYCLING GOAL </Text>
            <Text
              style={styles.recyclingGoalItemsNumber}
            >{`${itemsRecycled}/${totalItemsToRecycle} Items`}</Text>
          </View>
          {/* Recycling Goal Bar */}
          <View style={styles.recyclingGoalBar}>
            <View
              style={[
                styles.recyclingGoalCompleted,
                {
                  width: `${new Number((itemsRecycled * 100) / totalItemsToRecycle).toFixed(2)}%`,
                },
              ]}
            />
          </View>
        </View>
        {/* Recycling Stats */}
        <View style={styles.recyclingInfoContainer}>
          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> RECYCLING STATS </Text>
            <Pressable style={styles.updateButton}>
              <Text style={styles.updateButtonText}> UPDATE </Text>
            </Pressable>
          </View>
          <View
            style={[
              styles.recyclingStatsContainer,
              styles.recyclingStatsContainerShadow,
            ]}
          >
            <View style={styles.recyclingStatsTextContainer}>
              <View style={styles.recyclingStatsText}>
                <Text style={styles.recyclingStatsLabel}>
                  Total Items Recycled:
                </Text>
                <Text style={styles.recyclingStatsInfo}>
                  {`${itemsRecycled}`}
                </Text>
              </View>
              <View style={styles.recyclingStatsText}>
                <Text style={styles.recyclingStatsLabel}>Carbon Offset:</Text>
                <Text style={styles.recyclingStatsInfo}>2.5kg CO2</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {},
  profileBackground: {
    paddingTop: 80,
    backgroundColor: "#024935",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  settings: {
    alignItems: "flex-end",
    marginRight: 15,
  },
  profilePicture: {
    height: 125,
    width: 125,
    backgroundColor: "#D9D9D9",
    borderRadius: "50%",
    marginLeft: 130,
  },
  profilePictureEdit: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
    marginLeft: 220,
    marginTop: -30,
    paddingTop: 5,
    alignItems: "center",
  },
  username: {
    color: "#FFFFFF",
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 32,
    textAlign: "center",
    marginTop: 10,
    paddingBottom: 20,
  },
  profileInfo: {
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
    height: "100%",
  },
  recyclingInfoContainer: {
    marginTop: 20,
  },
  recyclingHeader: {
    display: "flex",
    flexDirection: "row",
  },
  recyclingHeaderText: {
    color: "#024935",
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 20,
  },
  recyclingGoalItemsNumber: {
    color: "#024935",
    fontFamily: "Titillium Web",
    fontWeight: 500,
    fontSize: 15,
    textAlign: "center",
    marginLeft: 150,
  },
  recyclingGoalBar: {
    backgroundColor: "#A5CCB7",
    height: 8,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 10,
  },
  recyclingGoalCompleted: {
    backgroundColor: "#024935",
    height: 8,
    borderRadius: 10,
  },
  recyclingStatsContainer: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 15,
    marginTop: 5,
    height: 250,
  },
  recyclingStatsContainerShadow: {
    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  recyclingStatsTextContainer: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  updateButton: {
    width: 62,
    height: 23,
    borderRadius: 8,
    backgroundColor: "#188038",
    marginLeft: 175,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 16,
    marginTop: 3,
    marginLeft: 10,
    paddingBottom: 5,
  },
  recyclingStatsText: {
    display: "flex",
    flexDirection: "row",
  },
  recyclingStatsLabel: {
    paddingTop: 10,
    fontFamily: "Titillium Web",
    fontWeight: 500,
    fontSize: 12,
    color: "#024935",
  },
  recyclingStatsInfo: {
    paddingTop: 10,
    fontFamily: "Titillium Web",
    fontWeight: 600,
    fontSize: 12,
    color: "#024935",
    textAlign: "right",
    marginLeft: 175,
  },
});
