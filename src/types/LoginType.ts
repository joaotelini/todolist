export type LoginType = {
  email: string;
  password: string;
};

export type LoginApiResponse = {
  error: boolean;
  token?: string;
  message?: string;
  data?: string;
};
