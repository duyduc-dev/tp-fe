export type StyledComponentProps<P> = {
  [$Key in keyof P as `$${string & $Key}`]: P[$Key];
};

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export type HttpResponse<T = any> = {
  status: HttpStatusCode;
  message: string;
  data: T;
  description: string;
};

export type RedirectUrlType = { redirect: string };
