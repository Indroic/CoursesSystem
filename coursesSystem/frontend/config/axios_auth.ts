import axios from "axios";

import { base_get_token, base_ip, base_register } from "./constands";

const auth_axios_instance = axios.create({
  baseURL: base_ip,
  headers: { "Content-Type": "application/json" },
});

const RegisterRequest = async (data: any) => {
  const response = await auth_axios_instance.post(
    base_ip + base_register,
    data,
  );

  return response.data;
};

const LoginRequest = async (data: any) => {
  const response = await auth_axios_instance.post(
    base_ip + base_get_token,
    data,
  );

  return response.data;
};

export { auth_axios_instance, LoginRequest, RegisterRequest };
