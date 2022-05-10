const accessToken = require("./accessToken");

let instance;

const run = async () => {
  instance = await accessToken();
};

const get = async (endpoint) => {
  try {
    console.log("[GET]...", endpoint);
    const response = await instance.get(endpoint);
    const data = await response.data;
    console.log("[GET] success:", endpoint, "->", data);
    return {
      error: null,
      data,
    };
  } catch (error) {
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

module.exports = {
  get,
  run,
};
