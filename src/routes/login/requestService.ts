import axios from 'axios';
import dotenv from 'dotenv';
import { LoginRequest } from './loginRequest';
import { LoginResponse } from './loginResponse';
dotenv.config();

export const requestLogin = async (loginRequest: LoginRequest, apiUrl: string) => {
  try {
    const response = await axios.post(apiUrl, {
      username: loginRequest.username,
      password: loginRequest.password,
    });

    const loginResponse = new LoginResponse();

    loginResponse.authorizationToken = response.data.authorizationToken;
    loginResponse.refreshToken = response.data.refreshToken;

    return loginResponse;

  } catch (error) {
    return error.response.data;
  }
};

export const validateLogin = (username: string, password: string): boolean => {

  const loginRequest = new LoginRequest();
  loginRequest.username = username;
  loginRequest.password = password;

  const betMxUrl = process.env.LOGIN_BETMX as string;
  const bet4Url = process.env.LOGIN_BET4 as string;

  try {
    return true;
  }
  catch (error) {
    return false;
  }

};