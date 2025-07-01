export type RegisterType = {
  fullname: string;
  email: string;
  password: string;
};

export type RegisterApiResponse = {
  error: boolean;
  message?: string;
  data?: string;
};
