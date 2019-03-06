export interface Response {
  [propName: string]: any
}

export interface ID {
  id: string
}

export function setLoading (self: any, state: boolean): any {
  setTimeout((): any => {
    self.isLoading = state
  }, 500)
}
