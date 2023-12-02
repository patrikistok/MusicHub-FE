export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type UserLogin = {
  usernameEmail: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type UserRegister = {
  username: string;
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  user: User;
  token: string;
};
