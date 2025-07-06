import { StyleSheet, Text, View } from "react-native";

export default function Divider() {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine}></View>
      <Text style={styles.dividerText}> or </Text>
      <View style={styles.dividerLine}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    marginLeft: 32,
    marginRight: 16,
    alignSelf: "center",
  },
  dividerLine: {
    backgroundColor: "#024935",
    height: 1,
    width: "43%",
    marginTop: 8,
  },
  dividerText: {
    fontWeight: 400,
    fontSize: 14,
    color: "#024935",
  },
});
