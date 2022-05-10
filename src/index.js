require("dotenv").config();
const api = require("./api");
const { run } = require("./utils/axios");

(async () => {
  await run();
  await api();
})();
