require("dotenv").config();
import "./utils/axios";

import api from "./api";

const run = async () => {
  const res = await api();
  console.log("res", res);
};
run();
