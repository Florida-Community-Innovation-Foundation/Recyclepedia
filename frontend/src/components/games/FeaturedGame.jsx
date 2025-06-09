import {
  Dimensions,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import diggy from "~/assets/diggy.png";

const { width, height } = Dimensions.get("window");
const baseWidth = 375;
const referenceHeight = 812;

const calcFont = (percent) => {
  const scale = width / baseWidth;
  return Math.round(percent * scale);
};

const calcHeight = (size) => {
  const scaleFactor = height / referenceHeight;
  return Math.round(size * scaleFactor);
};
const FeaturedGame = () => {
  return (
    <View style={styles.imageContainer}>
      <Image source={diggy} style={styles.learnGameImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Diggy Recycling Game</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Play Now</Text>
          <Icon name="play-arrow" size={calcFont(30)} color="#d3d3d3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: calcHeight(200),
    width: "90%",
    left: 5,
    right: 5,
    backgroundColor: "#6ad04b",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"#34D399",
    marginVertical: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  learnGameImage: {
    width: "60%",
    height: "60%",
    marginBottom: calcHeight(40),
    resizeMode: "contain",
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: calcHeight(8),
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    marginRight: 4,
  },
});

export default FeaturedGame;
