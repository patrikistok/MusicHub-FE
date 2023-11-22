import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import api from "./api";
import {
  LoginResponse,
  RegisterResponse,
  UserLogin,
  UserRegister,
} from "./types";

export const useSignIn = (): UseMutationResult<
  LoginResponse,
  Error,
  UserLogin,
  unknown
> => {
  return useMutation<LoginResponse, Error, UserLogin, unknown>(
    async (params: UserLogin) => {
      const response = await api.post("/authenticate", params);
      return response.data;
    }
  );
};

export const useSignUp = (): UseMutationResult<
  RegisterResponse,
  Error,
  UserRegister,
  unknown
> => {
  const signUp = useMutation<RegisterResponse, Error, UserRegister, unknown>(
    async (params: UserRegister) => {
      const response = await api.post("/register", params);
      return response.data;
    }
  );

  return signUp;
};
