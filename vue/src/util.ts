export interface Response {
  [propName: string]: any;
}

export interface Params {
  email: string;
  password: string;
}

export interface ParamsSignUp extends Params {
  full_name: string;
  password_confirm: string;
}
