import axios from "axios";
import config from "../config";
const {  CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET } = config;

export default async () => {
    const response = await axios.post(`https://api.amazon.com/auth/o2/token?grant_type=refresh_token&client_id=${CLIENT_ID}&refresh_token=${REFRESH_TOKEN}&client_secret=${CLIENT_SECRET}`)
    const data = await response.data;
    return data.access_token;
}