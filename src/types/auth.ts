export type FormLogin = {
  email: string;
  password: string;
};

export type LoginRequest = {
  username: string;
  passwordHash: string;
};

export type FormSignUp = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

export type SignUpConfirmRequest = {
  token: string;
  passcode: string;
};

export type AuthDetail = {
  accessToken: string;
  expireTime: number;
};

export type TokenResponse = {
  token: string;
  expireTime: number;
};

export type TokenGoogleLogin = {
  token: string;
};
