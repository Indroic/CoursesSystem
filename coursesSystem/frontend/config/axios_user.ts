import axios from "axios";

import { base_ip, base_token_verify } from "./constands";

const auth_axios_instance = axios.create({
  baseURL: base_ip,
  headers: { "Content-Type": "application/json" },
});
