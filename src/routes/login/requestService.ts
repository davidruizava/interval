import axios from 'axios';
import dotenv from 'dotenv';
import { LoginRequest } from './loginRequest';
import { LoginResponse } from './loginResponse';
import { Tenant } from './tenats';
import { setToken } from './tokenStorage';
dotenv.config();

export const requestLogin = async (loginRequest: LoginRequest, apiUrl: string) => {
  try {
    const response = await axios.post(apiUrl, {
      username: loginRequest.username,
      password: loginRequest.password,
    });

    const loginResponse = new LoginResponse();

    if (response.status !== 200) {
      loginResponse.success = false;
      return loginResponse;
    }

    loginResponse.authorizationToken = response.data.authorizationToken;
    loginResponse.refreshToken = response.data.refreshToken;
    loginResponse.success = true;

    return loginResponse;

  } catch (error) {
    const response = new LoginResponse();
    response.success = false;
    return response;
  }
};

export const validateLogin = async (username: string, password: string, tenant: Tenant): Promise<boolean> => {

  const loginRequest = new LoginRequest();

  loginRequest.username = username;
  loginRequest.password = password;

  try {
    switch (tenant) {
      case Tenant.BetMX:

        const betMxUrl = process.env.LOGIN_BETMX as string;
        let response = await requestLogin(loginRequest, betMxUrl);
        if (!response.success) return false;

        setToken(response.authorizationToken, tenant);
        return true;

      case Tenant.BetBr:

        const bet4Url = process.env.LOGIN_BET4 as string;
        response = await requestLogin(loginRequest, bet4Url);

        if (!response.success) return false;
        setToken(response.authorizationToken, tenant);
        return true;

      default:
        console.log("Tenant no soportado");
        return false;
    }
  }
  catch (error) {
    return false;
  }
};