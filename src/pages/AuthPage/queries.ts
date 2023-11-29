import api from "../../api";
import {
  LoginResponse,
  RegisterResponse,
  UserLogin,
  UserRegister,
} from "../../types";

export const signUp = async (
  params: UserRegister
): Promise<RegisterResponse> => {
  const response = await api.post("/register", params);
  return response.data;
};

export const signIn = async (params: UserLogin): Promise<LoginResponse> => {
  const response = await api.post("/authenticate", params);
  return response.data;
};
