// This file handles getting the Nyckel API access token for requests

let token = null;
let expiresAt = null;

export default async function getNyckelToken() {
  // return the token if we have it and it is valid (with a 60s safety margin
  // so a token can't expire while a request is in flight)
  if (token && Date.now() < expiresAt - 60_000) {
    return token;
  }

  const clientId = process.env.NYCKEL_CLIENT_ID;
  const clientSecret = process.env.NYCKEL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("NYCKEL_CLIENT_ID and NYCKEL_CLIENT_SECRET must be set");
  }

  // get response from Nyckel
  const response = await fetch("https://www.nyckel.com/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Nyckel token request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Nyckel token response did not include an access token");
  }

  token = data.access_token;
  // tokens expire after one hour
  expiresAt = Date.now() + data.expires_in * 1000;

  return token;
}
