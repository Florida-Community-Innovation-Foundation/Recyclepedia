import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {router} from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import diggy from "~/assets/diggy.png";
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { useNavigation } from '@react-navigation/native';

export default function UserAccount() {
  const [profilePicture, setProfilePicture] = useState(diggy);
  const [itemsRecycled, setItemsRecycled] = useState(32);
  const [totalItemsToRecycle, setTotalItemsToRecycle] = useState(100);
  const [carbonOffset, setCarbonOffset] = useState(0); //note that this is in kg CO2 saved
  const [num, setNum] = useState(0);
  const navigation = useNavigation();


  const materials =  new Map([ //not used at the moment but will be used to calculate carbon offset
        ["plastic", 1.02 ], // kg CO2 saved per kg of plastic 
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
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
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
                <Text style={styles.recyclingStatsInfo}>{carbonOffset}kg CO2</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Interactive Games */}
        <View style={styles.interactiveGamesContainer}>
          <Text style={styles.recyclingHeaderText}> INTERACTIVE GAMES </Text>
          <ScrollView horizontal style={{marginTop: 10 }} contentContainerStyle={{ flexDirection: 'row', gap: 5}}>
            <Pressable  style={styles.gameSlot} onPress={() => router.push('/featuredGameScreen')} >
              <Image source={require("/assets/FeatureGameImage.png")} style={styles.featuredGameImg}></Image>
            </Pressable>
            <Pressable  style={styles.gameSlot} onPress={() => router.push('/learnGameScreen')}>
              <Image source={require("/assets/LearnGameImageTwo.png")} style={styles.learningGameImg}></Image>
            </Pressable>
            <Pressable  style={styles.gameSlot}></Pressable>
          </ScrollView>
         </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 100
  },
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
    borderRadius: 62.5,
    marginLeft: 130,
  },
  profilePictureEdit: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#FFFFFF",
    marginLeft: 220,
    marginTop: -30,
    paddingTop: 5,
    alignItems: "center",
  },
  username: {
    color: "#FFFFFF",
    fontFamily: "BebasNeue_400Regular",
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
    marginTop: 30,
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
    marginTop: 10,
  },
  recyclingGoalItemsNumber: {
    color: "#024935",
    fontFamily: "Titillium Web",
    fontWeight: 700,
    fontSize: 15,
    textAlign: "center",
    marginLeft: 165,
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
    width: 63,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#188038",
    marginLeft: 190,
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
  gameSlot: {
    flex: 1,
    height: 140,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  featuredGameImg: {
    width: 130,
    height: 130,
    resizeMode: "contain",
     borderColor: 'red',
  },
  learningGameImg: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  }
  gameSlotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  interactiveGamesContainer: {
    marginTop: 20,
  },
});
