import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BarcodeInstructions({ itemChecked, itemAccepted }) {
  const navigation = useNavigation();

  const itemAcceptedButtonPress = () => {
    navigation.navigate("Curbside Dropoff");
  };

  return (
    <View
      style={
        itemAccepted ? styles.container : { ...styles.container, height: 150 }
      }
    >
      {!itemChecked && (
        <View style={styles.instructionContainer}>
          <Entypo name="warning" size={24} color="black" />
          <Text style={styles.instructionText}>
            SCAN A BARCODE TO VIEW RECYCLING INFORMATION.
          </Text>
        </View>
      )}
      {itemChecked && (
        <>
          <Text style={styles.instructionHeader}> Next Steps: </Text>
          {itemAccepted && (
            <Text style={styles.itemAcceptanceStatus}>
              This item is accepted in your area! It should be rinsed off and
              placed in your recycling bin.
            </Text>
          )}
          {!itemAccepted && (
            <>
              <Text style={styles.itemAcceptanceStatus}>
                This item cannot go in your curbside bin. It must be disposed of
                in a special drop-off center.
              </Text>
              <Pressable
                style={styles.button}
                onPress={itemAcceptedButtonPress}
              >
                <Text style={styles.buttonText}>FIND ONE HERE!</Text>
              </Pressable>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 310,
    height: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginTop: 20,
  },
  instructionContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    fontWeight: 400,
    width: 270,
    marginTop: 10,
    marginLeft: 10,
    color: "#024935",
    fontFamily: "Bebas Neue",
  },
  instructionHeader: {
    fontFamily: "Titillium Web",
    fontWeight: 600,
    fontSize: 12,
    color: "#024935",
    padding: 15,
  },
  itemAcceptanceStatus: {
    fontFamily: "Titillium Web",
    fontWeight: 400,
    fontSize: 12,
    color: "#024935",
    width: 280,
    marginLeft: 15,
  },
  button: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#828282",
    marginLeft: 75,
    width: 155,
    backgroundColor: "#FFFFFF",
    height: 30,
    marginTop: 5,
  },
  buttonText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 15,
    fontFamily: "Bebas Neue",
    color: "#024935",
  },
});
