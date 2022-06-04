import axios from "axios";
const URL = "http://localhost:1337/api";
export default axios.create({ baseURL: URL });
