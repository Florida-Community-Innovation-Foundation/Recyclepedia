import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import naturePicture from "~/assets/naturePicture.jpg";
import diggy from "~/assets/diggy.png";
import toter from "~/assets/toter.png";
import mountain from "~/assets/Mountain.png";
import learnGameImageTwo from "~/assets/LearnGameImageTwo.png";
import cartons from "~/assets/cartons.png";
import { normalize } from "~/utils/normalize";

import { useNavigation } from "@react-navigation/native";

export default function UserAccount() {
  const [profilePicture, setProfilePicture] = useState(naturePicture);
  const [itemsRecycled, setItemsRecycled] = useState(32);
  const [totalItemsToRecycle, setTotalItemsToRecycle] = useState(100);
  const [carbonOffset, setCarbonOffset] = useState(0); //note that this is in kg CO2 saved
  const [num, setNum] = useState(0);
  const navigation = useNavigation();

  const learningGames = [
    {
      image: toter,
      title: "Recycle Round Up",
      color: "#A9DEF9",
      url: "https://kids.nationalgeographic.com/games/action-adventure/article/recycle-roundup-new",
    },
    {
      image: cartons,
      title: "Litter Critter",
      color: "#234E13",
      url: "https://www.abcya.com/games/recycling_game",
    },
    {
      image: learnGameImageTwo,
      title: "Recycle or Not",
      color: "#A9DEF9",
      url: "https://www.recycleornot.org/",
    },
    {
      image: mountain,
      title: "Recycling Waste",
      color: "#DBF4D2",
      url: "https://www.turtlediary.com/game/recycling-waste.html",
    },
  ];

  const materials = new Map([
    //not used at the moment but will be used to calculate carbon offset
    ["plastic", 1.02], // kg CO2 saved per kg of plastic
    ["paper", 0.46],
    ["glass", 0.31],
    ["metals", 5.86],
    ["scrap metals", 3.57],
    ["aluminum", 8.14],
    ["steel", 0.86],
    ["copper", 2.66],
    ["textiles", 3.37],
  ]);

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <View style={styles.screen}>
        <View style={styles.profileBackground}>
            <Pressable style={styles.settings}>
              <Link href="/(tabs)/profile/settings">
                <Ionicons name="settings-sharp" size={24} color="#FFFFFF" />
              </Link>
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
        <ScrollView style={styles.profileInfo}>
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
                  <Text style={styles.recyclingStatsInfo}>
                    {carbonOffset}kg CO2
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Interactive Games */}
          <View style={styles.interactiveGamesContainer}>
            <Text style={styles.recyclingHeaderText}> INTERACTIVE GAMES </Text>
            <ScrollView
              horizontal
              style={styles.interactiveGamesContainerScroll}
              contentContainerStyle={styles.interactiveGamesContainerContent}
            >
              <Link style={styles.gameSlot} href="/featuredGameScreen">
                <Image source={diggy} style={styles.featuredGameImg}></Image>
              </Link>
              {learningGames.map((game, index) => (
                <View key={index}>
                  <Link
                    style={styles.gameSlot}
                    href={`/learnGameScreen?image=${encodeURIComponent(game.image)}&title=${encodeURIComponent(game.title)}&color=${encodeURIComponent(game.color)}&url=${encodeURIComponent(game.url)}`}
                  >
                    <Image
                      source={game.image}
                      style={styles.learningGameImg}
                    ></Image>
                  </Link>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flexGrow: 1,
  },
  screen: {
    paddingBottom: normalize(100, "height"),
  },
  profileBackground: {
    paddingTop: normalize(80, "height"),
    backgroundColor: "#024935",
    borderBottomLeftRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
  },
  settings: {
    alignItems: "flex-end",
    marginRight: normalize(15, "width"),
  },
  profilePicture: {
    height: normalize(125, "height"),
    width: normalize(125, "width"),
    backgroundColor: "#D9D9D9",
    borderRadius: 62.5,
    marginLeft: normalize(130, "width"),
  },
  profilePictureEdit: {
    width: normalize(35, "width"),
    height: normalize(35, "height"),
    borderRadius: normalize(17.5),
    backgroundColor: "#FFFFFF",
    marginLeft: normalize(220, "width"),
    marginTop: normalize(-30, "height"),
    paddingTop: normalize(5, "height"),
    alignItems: "center",
  },
  username: {
    color: "#FFFFFF",
    fontFamily: "BebasNeue_400Regular",
    fontWeight: 400,
    fontSize: 32,
    textAlign: "center",
    marginTop: normalize(10, "height"),
    paddingBottom: normalize(20, "height"),
  },
  profileInfo: {
    backgroundColor: "#FFFFFF",
    paddingLeft: normalize(16, "width"),
    paddingRight: normalize(16, "width"),
    height: "100%",
  },
  recyclingInfoContainer: {
    marginTop: normalize(30, "height"),
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
    marginTop: normalize(10, "height"),
  },
  recyclingGoalItemsNumber: {
    color: "#024935",
    fontFamily: "Titillium Web",
    fontWeight: 700,
    fontSize: 15,
    textAlign: "center",
    marginLeft: normalize(165, "width"),
  },
  recyclingGoalBar: {
    backgroundColor: "#A5CCB7",
    height: normalize(8, "height"),
    borderRadius: normalize(10),
    marginLeft: normalize(5, "width"),
    marginTop: normalize(10, "height"),
  },
  recyclingGoalCompleted: {
    backgroundColor: "#024935",
    height: normalize(8, "height"),
    borderRadius: normalize(10),
  },
  recyclingStatsContainer: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: normalize(15, "width"),
    paddingTop: normalize(15, "height"),
    marginTop: normalize(5, "height"),
    height: normalize(250, "height"),
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
    paddingBottom: normalize(15, "height"),
  },
  updateButton: {
    width: normalize(63, "width"),
    height: normalize(25, "height"),
    borderRadius: normalize(8),
    backgroundColor: "#188038",
    marginLeft: normalize(190, "width"),
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: normalize(16),
    marginTop: normalize(3, "height"),
    marginLeft: normalize(10, "width"),
    paddingBottom: 5,
  },
  recyclingStatsText: {
    display: "flex",
    flexDirection: "row",
  },
  recyclingStatsLabel: {
    paddingTop: normalize(10, "height"),
    fontFamily: "Titillium Web",
    fontWeight: 500,
    fontSize: 12,
    color: "#024935",
  },
  recyclingStatsInfo: {
    paddingTop: normalize(10, "height"),
    fontFamily: "Titillium Web",
    fontWeight: 600,
    fontSize: 12,
    color: "#024935",
    textAlign: "right",
    marginLeft: normalize(175, "width"),
  },
  gameSlot: {
    flex: 1,
    height: normalize(140, "height"),
    backgroundColor: "#fff",
    borderRadius: normalize(20),
    borderColor: "#D9D9D9",
    borderWidth: normalize(2),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  featuredGameImg: {
    width: normalize(130, "width"),
    height: normalize(130, "height"),
    resizeMode: "contain",
    borderColor: "red",
  },
  learningGameImg: {
    width: normalize(130, "width"),
    height: normalize(130, "height"),
    resizeMode: "contain",
  },
  gameSlotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(10, "height"),
  },
  interactiveGamesContainer: {
    marginTop: normalize(20, "height"),
  },
  interactiveGamesContainerScroll: {
    marginTop: normalize(10, "height"),
  },
  interactiveGamesContainerContent: {
    flexDirection: "row",
    gap: 5,
  },
});