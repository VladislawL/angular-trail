export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

export function isEmpty(value: any): boolean {
   return !value ||
     (value.constructor === Object && !Object.keys(value).length) ||
     (value.constructor === Array && !value.length);
}
