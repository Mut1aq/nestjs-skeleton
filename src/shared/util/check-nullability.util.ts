/**
 * @param param any string to check if it may be null
 * @returns true if null, false otherwise
 */
export const checkNullability = (param: any) => {
  return param != null &&
    param != '' &&
    param != undefined &&
    param != 'null' &&
    param != 'undefined' &&
    param != 0
    ? isNaN(param as number)
      ? param
      : +param
    : null;
};

/**
 * @param param any object to check if it may be null
 * @returns true if null, false otherwise
 */
export const checkObjectNullability = (obj: any): boolean => {
  return (
    obj &&
    Object.keys(obj)?.length > 0 &&
    Object.getPrototypeOf(obj) === Object.prototype &&
    obj != null &&
    obj != undefined
  );
};

/**
 * @param param any array to check if it may be null
 * @returns true if null, false otherwise
 */
export const checkArrayNullability = (arr: any): boolean => {
  return (
    arr &&
    (arr?.length ?? 0) > 0 &&
    Array.isArray(arr) &&
    checkNullability(arr.length > 0 ? arr[0] : arr) &&
    arr != null &&
    arr != undefined
  );
};
