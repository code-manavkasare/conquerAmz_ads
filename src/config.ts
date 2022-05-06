import { IConfig } from "./types";

const config = {
  ADS_API: process.env.ADS_API,
  ADS_TEST_API: process.env.ADS_TEST_API,
  CLIENT_ID: process.env.CLIENT_ID,
  SCOPE: process.env.SCOPE,
} as IConfig;

export default config;
