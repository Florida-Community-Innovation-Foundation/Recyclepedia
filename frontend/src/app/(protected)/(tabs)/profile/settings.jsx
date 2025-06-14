import { 
  StyleSheet,
  View,
  Text,
 } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Entypo from '@expo/vector-icons/Entypo';

 // this should load/save the user's settings from the profile stuff
 // update this when that is added to the project
export default function Settings() {
  return (
    <View style={styles.screen}>
      <View style={styles.profileInfo}>
        <View style={styles.recyclingInfoContainer}>
          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> Account </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Account </Text>
                {/*idk why 1st option won't work*/}
                {/*<Entypo name="arrow-with-circle-right" style={styles.settingButton} />*/}
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Privacy </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Security & Permissions </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Share Profile </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>
            </View>
          </View>

          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> Content & Display </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Notifications </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Language </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>
            </View>
          </View>

          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> Support & About </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Report A Problem </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Support </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Rate Our App </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Terms & Policies </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>
            </View>
          </View>
          
          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> Login </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Switch Account </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> Log Out </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  settingGroupContainer: {
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: "95%",
  },
  settingButton: {
    size: 18,
    color: "#024935",
  },

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
    //justifyContent: "space-between",
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
  recyclingHeaderText2: {
    color: "#024935",
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: 18,
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
    paddingBottom: 15,
    marginTop: 5,
    marginBottom: 6,
    //height: 250,
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
  gameSlotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  interactiveGamesContainer: {
    marginTop: 20,
  },
});
