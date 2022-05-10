const axios = require("axios").default;
const config = require("../config");

const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, ADS_API, PROFILE_ID } = config;

module.exports = async () => {
  const response = await axios.post(
    `https://api.amazon.com/auth/o2/token?grant_type=refresh_token&client_id=${CLIENT_ID}&refresh_token=${REFRESH_TOKEN}&client_secret=${CLIENT_SECRET}`
  );
  const data = await response.data;
  const instance = axios.create({
    baseURL: ADS_API,
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      "Amazon-Advertising-API-ClientId": CLIENT_ID,
      "Amazon-Advertising-API-Scope": PROFILE_ID,
    },
  });
  return instance;
};
