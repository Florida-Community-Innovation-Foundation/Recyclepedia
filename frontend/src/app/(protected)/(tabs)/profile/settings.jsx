import { 
  StyleSheet,
  View,
  Text,
 } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Entypo from '@expo/vector-icons/Entypo';
import { normalize } from "~/utils/normalize";
import { useTranslation } from "~/i18n";
import LanguageToggle from "~/components/common/LanguageToggle";

 // this should load/save the user's settings from the profile stuff
 // update this when that is added to the project
export default function Settings() {
  const { t } = useTranslation();
  return (
    <View style={styles.screen}>
      <View style={styles.profileInfo}>
        <View style={styles.recyclingInfoContainer}>
          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> {t("settings.account")} </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.account")} </Text>
                {/*idk why 1st option won't work*/}
                {/*<Entypo name="arrow-with-circle-right" style={styles.settingButton} />*/}
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.privacy")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.security")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.shareProfile")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>
            </View>
          </View>

          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> {t("settings.contentDisplay")} </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.notifications")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.language")} </Text>
                <LanguageToggle />
              </View>
            </View>
          </View>

          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> {t("settings.supportAbout")} </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.reportProblem")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.support")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.rate")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.terms")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>
            </View>
          </View>
          
          <View style={styles.recyclingHeader}>
            <Text style={styles.recyclingHeaderText}> {t("settings.loginSection")} </Text>
          </View>

          <View style={styles.recyclingStatsContainer}>
            <View style={styles.settingGroupContainer}>
              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.switchAccount")} </Text>
                <Entypo name="arrow-with-circle-right" size={18} color="#024935" />
              </View>

              <View style={styles.settingContainer}>
                <Text style={styles.recyclingHeaderText2}> {t("settings.logout")} </Text>
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
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 4,
    width: "95%",
  },
  settingButton: {
    size: normalize(18),
    color: "#024935",
  },

  screen: {},
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
    borderRadius: normalize(62.5),
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
    fontSize: normalize(32),
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
    fontSize: normalize(20),
  },
  recyclingHeaderText2: {
    color: "#024935",
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: normalize(18),
  },
  recyclingGoalItemsNumber: {
    color: "#024935",
    fontFamily: "Titillium Web",
    fontWeight: 700,
    fontSize: normalize(15),
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
    paddingBottom: normalize(15, "height"),
    marginTop: normalize(5, "height"),
    marginBottom: normalize(6, "height"),
    //height: 250,
  },
  recyclingStatsContainerShadow: {
    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: normalize(-2, "width"), height: normalize(4, "height") },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  recyclingStatsTextContainer: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: normalize(1),
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
    fontSize: 16,
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
    borderRadius: 20,
    borderColor: "#D9D9D9",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize(8, "width"),
  },
  gameSlotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(10, "height"),
  },
  interactiveGamesContainer: {
    marginTop: normalize(20, "height"),
  },
});
