import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { AuthContext } from "~/utils/authContext";

export default function UserAccount() {
  const authContext = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button title="Log out" onPress={() => authContext.logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
});
