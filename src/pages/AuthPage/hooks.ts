import { UseMutationResult, useMutation } from "react-query";
import {
  LoginResponse,
  RegisterResponse,
  UserLogin,
  UserRegister,
} from "../../types";
import { signIn, signUp } from "./queries";

export const useSignInMutation = (): UseMutationResult<
  LoginResponse,
  Error,
  UserLogin,
  unknown
> => useMutation(signIn);

export const useSignUpMutation = (): UseMutationResult<
  RegisterResponse,
  Error,
  UserRegister,
  unknown
> => useMutation(signUp);
