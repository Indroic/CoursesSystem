import axios from "axios";

import {
  base_url,
  url_login,
  url_verify_token,
  url_get_user
} from "./constands";

const axiosRequest = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

const axiosRequestWithAuth = (token: string) => {
  return axios.create({
    baseURL: base_url,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` //eslint-disable-line
    },
  });
};

const LoginRequest = async (username: string, password: string) => {
  const request = await axiosRequest.post(url_login, {
    username: username,
    password: password,
  });

  return request;
};

const RefreshTokenRequest = async (token: string, username: string) => {
  const request = await axiosRequest.post(url_verify_token, {
    token: token,
    username: username,
  });

  return request;
};

const VerifyRequest = async (username: string, token: string) => {
  const request = await axiosRequest.post(url_verify_token, {
    username: username,
    token: token,
  });

  return request;
};

const GetUserRequest = async (token: string, ID: string) => {
  const request = await axiosRequestWithAuth(token).get(url_get_user + ID);

  return request;
};

export {
  axiosRequest,
  LoginRequest,
  VerifyRequest,
  RefreshTokenRequest,
  GetUserRequest,
};
