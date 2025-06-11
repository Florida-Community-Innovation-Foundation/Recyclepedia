import * as Network from "expo-network";

export default async function getBaseURL() {
  const ipAddress = await Network.getIpAddressAsync();
  return `http://${ipAddress}:${process.env.EXPO_PUBLIC_BACKEND_PORT}`;
}
