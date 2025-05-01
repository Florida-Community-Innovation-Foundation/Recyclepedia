import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "~/utils/authContext";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text styles={styles.heading}>Login Screen</Text>
      <Button title="Log in!" onPress={authContext.logIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  heading: {},
});
