export interface FilterParamMapping {
  [key: string]: {
    label: string;
    valueProcessor?: (value: any) => string;
  };
}
