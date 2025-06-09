import FeaturedGame from "../components/games/FeaturedGame";
import { View, StyleSheet } from "react-native";
import BackButton from "../components/common/BackButton";

export default function FeaturedGameScreen() {
  return (
    <View style={styles.screen}>
      <BackButton />
      <View style={styles.featuredGameContainer}>
        <FeaturedGame />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#024935",
  },
  featuredGameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
