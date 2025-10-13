import * as Network from "expo-network";

export async function getBaseURL() {
  // for production and testing on a phone (slack me if you want to test on a phone, I have to start a server)
  //return "http://ec2-18-222-58-160.us-east-2.compute.amazonaws.com:80";

  // const ipAddress = await Network.getIpAddressAsync(); 
  const port = 3000;

  // ANDROID EMULATOR
  // 10.0.2.2 connects to local host on host machine for android emulators
  // this lets the emulator connect to backend running on host at a port
  // [note]: PORT in backend's .env should be the same as port variable here
  return `http://10.0.2.2:${port}`;

  // IOS
  // use if running iOS emulator
  //return `http://${ipAddress}:8080`;
}

export async function getCurbsideData() {
  console.log("curbside");
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/curbsideData`);

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    console.error(message);
    return;
  }

  const curbsideData = await response.json();
  return curbsideData;
}

export async function getDropoffData() {
  console.log("dropoff");
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/dropOffData`);

  if (!response.ok) {
    console.error("Failed");
    return
  }

  const dropOffData = await response.json();

  return dropOffData;
}

export async function getItemsData() {
  console.log("items");
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/itemsData`);
  const itemsData = await response.json();
  return itemsData;
}
