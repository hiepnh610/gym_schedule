export interface Response {
  [propName: string]: any;
}

export interface ID {
  id: string;
}

export function setLoading (_this: any, state: boolean): any {
  setTimeout((): any => {
    _this.isLoading = state
  }, 500)
}
