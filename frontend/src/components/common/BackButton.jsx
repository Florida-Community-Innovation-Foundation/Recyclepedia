import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export default function BackButton({ color }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backButtonContainer}
      onPress={() => navigation.goBack()}
    >
      <Entypo name="chevron-left" size={24} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    marginTop: 60,
    marginLeft: 20,
  },
});
