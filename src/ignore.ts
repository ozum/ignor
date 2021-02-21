import { ignoreAttribute } from "./ignorer";
import type { Multi, Ignore, Fn, Result } from "./types";

/**
 * Ignores errors with the given code in sync functions.
 *
 * @param ignore is the code or codes to ignore.
 * @param fn is the function to execute and ignore some of the errors.
 * @returns `undefined`.
 *
 * @typeParam R is the return type of the executed function.
 *
 * @thorws if error is not one of the ignored codes.
 *
 * @example
 * import * as ignore from "ignor";
 * ignore.code("ENOENT", () => readFileSync("file.txt"));
 * ignore.code(["ENOENT", "OTHER"], () => readFileSync("file.txt"));
 */
export function ignoreCode<R>(ignore: Multi<Ignore> | undefined, fn: (...args: any[]) => R): undefined | R;
/**
 * Ignores errors with the given code in sync functions.
 *
 * @param ignore is the code or codes to ignore.
 * @param defaultValue is the default value to return if an error is ignored.
 * @param fn is the function to execute and ignore some of the errors.
 * @returns `undefined`.
 *
 * @typeParam D is the type of returned default value if an error is ignored.
 * @typeParam R is the return type of the executed function.
 *
 * @thorws if error is not one of the ignored codes.
 *
 * @example
 * import * as ignore from "ignor";
 * ignore.code("ENOENT", "default", () => readFileSync("file.txt"));
 * ignore.code(["ENOENT", "OTHER"], "default", () => readFileSync("file.txt"));
 */
export function ignoreCode<D, R>(ignore: Multi<Ignore> | undefined, defaultValue: D, fn: (...args: any[]) => R): D | R;
/**
 * Ignores errors with the given code in async functions.
 *
 * @param ignore is the code or codes to ignore.
 * @returns `undefined`.
 *
 * @thorws if error is not one of the ignored codes.
 *
 * @example
 * import * as ignore from "ignor";
 * await got(url).catch(ignore.code("ECONNREFUSED"));
 * await got(url).catch(ignore.code(["ECONNREFUSED", "OTHER"]));
 */
export function ignoreCode(ignore?: Multi<Ignore>): (e: Error) => undefined;
/**
 * Ignores errors with the given code in async functions.
 *
 * @param ignore is the code or codes to ignore.
 * @param defaultValue is the default value to return if an error is ignored.
 * @returns default value.
 *
 * @typeParam D is the type of returned default value if an error is ignored.
 *
 * @thorws if error is not one of the ignored codes.
 *
 * @example
 * import * as ignore from "ignor";
 * await got(url).catch(ignore.code("ECONNREFUSED", []));
 * await got(url).catch(ignore.code(["ECONNREFUSED", "OTHER"], []));
 */
export function ignoreCode<D>(ignore: Multi<Ignore> | undefined, defaultValue: D): (e: Error) => D;
export function ignoreCode<D, R>(ignore?: Multi<Ignore>, defaultOrFn?: D | Fn<R>, maybeFn?: Fn<R>): Result<D, R> {
  return ignoreAttribute("code", ignore, defaultOrFn, maybeFn);
}

export function ignoreMessage<R>(ignore: Multi<Ignore> | undefined, fn: (...args: any[]) => R): undefined | R;
export function ignoreMessage<D, R>(ignore: Multi<Ignore> | undefined, defaultValue: D, fn: (...args: any[]) => R): D | R;
export function ignoreMessage(ignore?: Multi<Ignore>): (e: Error) => undefined;
export function ignoreMessage<D>(ignore: Multi<Ignore> | undefined, defaultValue: D): (e: Error) => D;
export function ignoreMessage<D, R>(ignore?: Multi<Ignore>, defaultOrFn?: D | Fn<R>, maybeFn?: Fn<R>): Result<D, R> {
  return ignoreAttribute("message", ignore, defaultOrFn, maybeFn);
}

export function ignoreStatus<R>(ignore: Multi<Ignore> | undefined, fn: (...args: any[]) => R): undefined | R;
export function ignoreStatus<D, R>(ignore: Multi<Ignore> | undefined, defaultValue: D, fn: (...args: any[]) => R): D | R;
export function ignoreStatus(ignore?: Multi<Ignore>): (e: Error) => undefined;
export function ignoreStatus<D>(ignore: Multi<Ignore> | undefined, defaultValue: D): (e: Error) => D;
export function ignoreStatus<D, R>(ignore?: Multi<Ignore>, defaultOrFn?: D | Fn<R>, maybeFn?: Fn<R>): Result<D, R> {
  return ignoreAttribute("status", ignore, defaultOrFn, maybeFn);
}
