import { isNotEmpty } from './validity.helper';

/** 객체를 문자열 쿼리 스트링으로 변환합니다. */
export function querier(input: Record<string, unknown>) {
  const params = new URLSearchParams();

  Object.keys(input).forEach((key) => {
    const value = input[key] as string;

    if (Array.isArray(value)) {
      if (value.length) params.set(key, value);
    } else {
      if (isNotEmpty(value)) {
        params.set(key, value);
      }
    }
  });

  return params.toString();
}
