import * as Network from "expo-network";

export async function getBaseURL() {
  // for production and testing on a phone (slack me if you want to test on a phone, I have to start a server)
  //return "http://ec2-18-222-58-160.us-east-2.compute.amazonaws.com:80";

  // const ipAddress = await Network.getIpAddressAsync(); 
  //const port = 443;
  const port = 3000;

  // ANDROID EMULATOR
  // 10.0.2.2 connects to local host on host machine for android emulators
  // this lets the emulator connect to backend running on host at a port
  // [note]: PORT in backend's .env should be the same as port variable here
  //return `http://10.0.2.2:${port}`;

  return `https://recycle-pedia.com`; // :DDDD

  // IOS
  // use if running iOS emulator
  //return `http://${ipAddress}:8080`;

  // AWS
  //return `http://ec2-18-219-236-103.us-east-2.compute.amazonaws.com:${port}`;
}

// These are TanStack Query queryFns — they must throw on failure (resolving
// to undefined is itself treated as an error by React Query v5, with a worse
// message and no retry semantics).
export async function getCurbsideData() {
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/curbsideData`);
  if (!response.ok) {
    throw new Error(`Failed to fetch curbside data (status ${response.status})`);
  }
  return response.json();
}

export async function getDropoffData() {
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/dropOffData`);
  if (!response.ok) {
    throw new Error(`Failed to fetch drop-off data (status ${response.status})`);
  }
  return response.json();
}

export async function getItemsData() {
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/itemsData`);
  if (!response.ok) {
    throw new Error(`Failed to fetch items data (status ${response.status})`);
  }
  return response.json();
}
