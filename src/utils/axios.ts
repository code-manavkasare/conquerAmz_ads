import axios, { AxiosInstance } from "axios";
import api from "../api";
import config from "../config";
import accessToken from "./accessToken";
const { ADS_API, CLIENT_ID, PROFILE_ID } = config;

let instance: AxiosInstance;

(async () => {
  // Generating accessToken
  const token = await accessToken();
  // Creating a reusable axios instance
  instance = axios.create({
    baseURL: ADS_API,
    headers: {
      Authorization: `Bearer ${token}`,
      "Amazon-Advertising-API-ClientId": CLIENT_ID,
      "Amazon-Advertising-API-Scope": PROFILE_ID,
    },
  });
  // Running the script once axios is setup
  await api();
})();

export const get = async (endpoint: string) => {
  try {
    console.log("[GET]...", endpoint);
    const response = await instance.get(endpoint);
    const data = await response.data;
    console.log("[GET] success:", endpoint, "->", data);
    return {
      error: null,
      data,
    };
  } catch (error: any) {
    if (error.response) {
      console.log("[GET] error", endpoint, "->", error.response.data);
      // console.log("[GET] error resposne", error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        error: {
          message: error.response.data.details,
        },
      };
    } else if (error.request) {
      console.log("[GET] error", endpoint, "->", error.request);
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log("[GET] error request", error.request);
      return {
        error: {
          message: error.request,
        },
      };
    } else {
      console.log("[GET] error", endpoint, "->", error);
      // console.log("[GET] error", error);
      // Something happened in setting up the request that triggered an Error
      return {
        error: {
          message: error.message,
        },
      };
    }
  }
};

export const post = async (endpoint: string, payload: any) => {
  try {
    const response = await instance.post(endpoint, payload);
    const data = await response.data;
    console.log("[POST]", endpoint, "->", data);
    return {
      error: null,
      data,
    };
  } catch (error: any) {
    if (error.response) {
      console.log("[POST] error", endpoint, "->", error.resposne.data);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        error: {
          message: error.response.data.details,
        },
      };
    } else if (error.request) {
      console.log("[POST] error", endpoint, "->", error.request);
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        error: {
          message: error.request,
        },
      };
    } else {
      console.log("[POST] error", endpoint, "->", error);
      // Something happened in setting up the request that triggered an Error
      return {
        error: {
          message: error.message,
        },
      };
    }
  }
};
