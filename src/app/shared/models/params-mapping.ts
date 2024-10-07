export interface ParamsMapping {
  [key: string]: {
    route: string,
    queryParam: string | ((value: any) => string)
  }
}
