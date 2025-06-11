import getBaseURL from "./url";

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
