// This file handles getting the Nyckel API access token for requests

let token = null;
let expiresAt = null;

export default async function getNyckelToken() {
  // return the token if we have it and it is valid
  if (token && Date.now() < expiresAt) {
    return token;
  }

  // get response from Nyckel
  const response = await fetch('https://www.nyckel.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=nrvimk7lzfxquhfz82gar5zrmthbqm39&client_secret=p9qr9sgy3vrn76rdfh2c3o7ir3vt3wucco1kqopfli6vdcjf23v9kq5018z6wnu6'
  });

  const data = await response.json();

  token = data.access_token;
  // tokens expire after one hour
  expiresAt = Date.now() + data.expires_in * 1000;

  return token;
}