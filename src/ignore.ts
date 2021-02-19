import { ignorer } from "./ignorer";
import { Multi } from "./types";

/**
 * Converts it's input to an array.
 * - Arrays are returned as is.
 * - `undefined` are returned as an empty array.
 * - Non-aray values are returned as a single element array.
 *
 * @param input is the input to convert to array.
 * @returns input converted to an array.
 */
function arrify<T extends any>(input?: T | T[]): T[] {
  if (input === undefined) return [];
  return Array.isArray(input) ? input : [input];
}

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
export function code(ignore?: Multi<string | number | RegExp>): (e: Error) => undefined;
/**
 * Ignores errors with the given code in async functions.
 *
 * @param ignore is the code or codes to ignore.
 * @param defaultValue is the default value to return if an error is ignored.
 * @returns default value.
 *
 * @thorws if error is not one of the ignored codes.
 *
 * @example
 * import * as ignore from "ignor";
 * await got(url).catch(ignore.code("ECONNREFUSED", []));
 * await got(url).catch(ignore.code(["ECONNREFUSED", "OTHER"], []));
 */
export function code<T extends any>(ignore: Multi<string | number | RegExp> | undefined, defaultValue: T): (e: Error) => T;
export function code<T extends any>(ignore?: Multi<string | number | RegExp>, defaultValue?: T): (e: Error) => T | undefined {
  return ignorer("code", arrify(ignore), defaultValue);
}

/**
 * Ignores errors with the given message in async functions.
 *
 * @param ignore is the message or messages to ignore.
 * @returns `undefined`.
 *
 * @thorws if error is not one of the ignored messages.
 *
 * @example
 * import * as ignore from "ignor";
 * await got(url).catch(ignore.message(/cannot connect/));
 * await got(url).catch(ignore.message([/cannot connect/, "OTHER"]));
 */
export function message(ignore?: Multi<string | number | RegExp>): (e: Error) => undefined;
/**
 * Ignores errors with given message in async functions.
 *
 * @param ignore is the message or messages to ignore.
 * @param defaultValue is the default value to return if an error is ignored.
 * @returns default value.
 *
 * @thorws if error is not one of the ignored messages.
 *
 * @example
 * import * as ignore from "ignor";
 * await got(url).catch(ignore.message(/cannot connect/, "default value"));
 * await got(url).catch(ignore.message([/cannot connect/, "OTHER"], "default value"));
 */
export function message<T extends any>(ignore: Multi<string | number | RegExp> | undefined, defaultValue: T): (e: Error) => T;
export function message<T extends any>(ignore?: Multi<string | number | RegExp>, defaultValue?: T): (e: Error) => T | undefined {
  return ignorer("message", arrify(ignore), defaultValue);
}

/**
 * Ignores errors with the given status in async functions.
 *
 * @param ignore is the status or statusses to ignore.
 * @returns `undefined`.
 *
 * @thorws if error is not one of the ignored statusses.
 *
 * @example
 * import * as ignore from "ignor";
 * await got(url).catch(ignore.status(404));
 * await got(url).catch(ignore.status([404, 403]));
 */
export function status(ignore?: Multi<string | number | RegExp>): (e: Error) => undefined;
/**
 * Ignores errors with given status in async functions.
 *
 * @param ignore is the status or statusses to ignore.
 * @param defaultValue is the default value to return if an error is ignored.
 * @returns default value.
 *
 * @thorws if error is not one of the ignored statusses.
 *
 * @example
 * import * as ignore from "ignor";
 * await got(url).catch(ignore.status(404, "default value"));
 * await got(url).catch(ignore.status([404, 403], "default value"));
 */
export function status<T extends any>(ignore: Multi<string | number | RegExp> | undefined, defaultValue: T): (e: Error) => T;
export function status<T extends any>(ignore?: Multi<string | number | RegExp>, defaultValue?: T): (e: Error) => T | undefined {
  return ignorer("status", arrify(ignore), defaultValue);
}
