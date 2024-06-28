import axios from "axios";

import { base_ip } from "./constands";

const auth_axios_instance = axios.create({
  baseURL: base_ip,
  headers: { "Content-Type": "application/json" },
});
