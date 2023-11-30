import api from "../../api";
import {
  LoginResponse,
  RegisterResponse,
  UserLogin,
  UserRegister,
} from "../../types";

export const signUp = async (
  params: UserRegister
): Promise<RegisterResponse | undefined> => {
  try {
    const response = await api.post("/register", params);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const signIn = async (
  params: UserLogin
): Promise<LoginResponse | undefined> => {
  try {
    const response = await api.post("/authenticate", params);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
