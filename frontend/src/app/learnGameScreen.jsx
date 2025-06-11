import LearnGame from "~/components/games/LearnGame";
import BackButton from "~/components/common/BackButton";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function LearnGameScreen() {
  const { image, title, color, url } = useLocalSearchParams();
  return (
    <View style={styles.screen}>
      <BackButton color="#FFFFFF" />
      <View style={styles.learnGameContainer}>
        <LearnGame image={image} title={title} color={color} url={url} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#024935",
  },
  learnGameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
