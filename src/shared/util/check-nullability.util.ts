/**
 * @param param any string to check if it may be null
 * @returns true if not null, false otherwise
 */
export const checkNullability = (param: any): boolean => {
  return (
    param != null &&
    param != '' &&
    param != undefined &&
    param != 'null' &&
    param != 'undefined'
  );
};

/**
 * @param param any object to check if it may be null
 * @returns true if not null, false otherwise
 */
export const checkObjectNullability = (obj: any): boolean => {
  return (
    !!obj && obj != null && obj != undefined && Object.keys(obj)?.length > 0
  );
};

/**
 * @param param any array to check if it may be null
 * @returns true if not null, false otherwise
 */
export const checkArrayNullability = (arr: any): boolean => {
  return (
    !!arr &&
    (arr?.length ?? 0) > 0 &&
    Array.isArray(arr) &&
    checkNullability(arr.length > 0 ? arr[0] : arr) &&
    arr != null &&
    arr != undefined
  );
};
