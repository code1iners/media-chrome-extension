/** Not Null & Not Undefined 여부를 확인합니다. */
export const isNotNull = (value: unknown) => value !== null && value !== undefined;

/** Null & Undefined 여부를 확인합니다. */
export const isNull = (value: unknown) => value === null || value === undefined;

/** Not Empty space & Not Null & Not Undefined 여부를 확인합니다. */
export const isNotEmpty = (value: unknown) =>
  value !== '' && value !== null && value !== undefined;

/** Empty space || Null ||  Undefined 여부를 확인합니다. */
export const isEmpty = (value: unknown) =>
  value === '' || value === null || value === undefined;

/** 현재 사용자의 디바이스가 Android 인지 확인합니다. */
export const isAos = (userAgent?: string) =>
  /android/i.test(userAgent ?? navigator.userAgent);

/** 현재 사용자의 디바이스가 iOS 인지 확인합니다. */
export const isIos = (userAgent?: string) =>
  /iphone/i.test(userAgent ?? navigator.userAgent) ||
  /ipad/i.test(userAgent ?? navigator.userAgent);
