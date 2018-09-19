export interface Response {
  [propName: string]: any;
}

export interface Params {
  email: string;
  password: string;
}

export interface ParamsSignUp extends Params {
  fullName: string;
  passwordConfirm: string;
}
