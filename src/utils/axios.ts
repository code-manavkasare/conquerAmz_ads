import axios from "axios";
import config from "../config";
const { ADS_API, ADS_TEST_API, CLIENT_ID, SCOPE } = config;
const dev = process.env.NODE_ENV === "dev";

console.log("urls", ADS_API, ADS_TEST_API);
const instance = axios.create({
  baseURL: dev ? ADS_TEST_API : ADS_API,
});

export const get = async (endpoint: string) => {
  try {
    const _endpoint = endpoint.includes("?")
      ? endpoint +
        `?Amazon-Advertising-API-ClientId=${CLIENT_ID}&Amazon-Advertising-API-Scope=${SCOPE}`
      : endpoint +
        `&Amazon-Advertising-API-ClientId=${CLIENT_ID}&Amazon-Advertising-API-Scope=${SCOPE}`;
    const response = await instance.get(encodeURI(_endpoint));
    const data = await response.data;
    console.log("[GET]", endpoint, "->", data);
    if (data.code === "401") {
      return {
        error: {
          message: "Amazon Ads Api not authorized",
        },
      };
    } else if (data.code === "404") {
      return {
        error: {
          message: "The requested resource was not found",
        },
      };
    } else if (data.code === "200") {
      return {
        error: null,
        data,
      };
    } else {
      return {
        error: {
          message: "An unexpected error occured",
        },
      };
    }
  } catch (error: any) {
    console.log("[GET] error", endpoint, "->", error);
    if (error.response) {
      console.log("error resposne", error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        error: {
          message: error.response.statusText,
        },
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        error: {
          message: error.request,
        },
      };
    } else {
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
    const _endpoint = endpoint.includes("?")
      ? endpoint +
        `?Amazon-Advertising-API-ClientId=${CLIENT_ID}&Amazon-Advertising-API-Scope=${SCOPE}`
      : endpoint +
        `&Amazon-Advertising-API-ClientId=${CLIENT_ID}&Amazon-Advertising-API-Scope=${SCOPE}`;
    const response = await instance.post(_endpoint, payload);
    const data = await response.data;
    console.log("[POST]", endpoint, "->", data);
    if (data.code === "401") {
      return {
        error: {
          message: "Amazon Ads Api not authorized",
        },
      };
    } else if (data.code === "404") {
      return {
        error: {
          message: "The requested resource was not found",
        },
      };
    } else if (data.code === "200") {
      return {
        error: null,
        data,
      };
    } else {
      return {
        error: {
          message: "An unexpected error occured",
        },
      };
    }
  } catch (error: any) {
    console.log("[POST] error", endpoint, "->", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        error: {
          message: error.response.data,
        },
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        error: {
          message: error.request,
        },
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        error: {
          message: error.message,
        },
      };
    }
  }
};
