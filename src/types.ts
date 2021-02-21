/** Single value or an array of values. */
export type Multi<T> = T | T[];

export type Ignore = string | number | RegExp;

export type Fn<T> = (...args: any[]) => T;

export type Result<D, R> = ((e: Error) => D | undefined) | D | R | undefined;
