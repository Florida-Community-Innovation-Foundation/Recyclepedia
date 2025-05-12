import * as Network from "expo-network";
import _ from "lodash";

async function getBaseURL() {
  const ipAddress = await Network.getIpAddressAsync();
  return `http://${ipAddress}:${process.env.EXPO_PUBLIC_BACKEND_PORT}`;
}

export async function getCurbsideData() {
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/curbsideData`);
  const curbsideData = await response.json();
  return curbsideData;
}

export async function getDropoffData() {
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/dropOffData`);
  const dropOffData = await response.json();
  return dropOffData;
}

export async function getItemsData() {
  const baseURL = await getBaseURL();
  const response = await fetch(`${baseURL}/itemsData`);
  const itemsData = await response.json();
  return itemsData;
}

export async function getCategories() {
  const itemsData = await getItemsData();
  return Array.from(
    new Set(
      _.chain(itemsData)
        .map((item) => _.trim(item["Category"]))
        .value(),
    ),
  );
}
