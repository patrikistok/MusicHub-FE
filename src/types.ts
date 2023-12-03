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
  id: number;
  username: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  photo: string;
};

export type UserRegister = {
  username: string;
  email: string;
  password: string;
  fullName: string;
};

export type RegisterResponse = {
  user: User;
  token: string;
};
