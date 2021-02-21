import memoize from "fast-memoize";
import type { Multi, Ignore, Fn, Result } from "./types";

/** Throws error directly. */
function thrower(error: Error): undefined {
  throw error;
}

/**
 * Test whether one of the ignores matches gor is equal to value.
 *
 * @param ignores is the list of values to be ignored.
 * @param value is the value to test.
 * @returns if one of the ignores matches or is equal to value.
 */
function matches(ignores: Array<Ignore>, value?: string): boolean {
  if (value === undefined) return false;
  return ignores.some((ignored) => (ignored instanceof RegExp ? ignored.test(value) : value === ignored));
}

/**
 * Converts it's input to an array.
 * - Arrays are returned as is.
 * - `undefined` are returned as an empty array.
 * - Non-aray values are returned as a single element array.
 *
 * @param input is the input to convert to array.
 * @returns input converted to an array.
 */
function arrify<D>(input?: D | D[]): D[] {
  if (input === undefined) return [];
  return Array.isArray(input) ? input : [input];
}

/**
 * Determines default value and function from parameters.
 *
 * @param defaultOrFn is default value or function to execute.
 * @param maybeFn is function to execute or undefined.
 * @return dafult value and function to execute.
 */
function getDefault<DEFAULT, RETURN>(
  defaultOrFn?: DEFAULT | Fn<RETURN>,
  maybeFn?: Fn<RETURN>
): [DEFAULT | undefined, Fn<RETURN> | undefined] {
  if (typeof maybeFn === "function") return [defaultOrFn as DEFAULT, maybeFn];
  if (typeof defaultOrFn === "function" && maybeFn === undefined) return [undefined, defaultOrFn as Fn<RETURN>];
  return [defaultOrFn as DEFAULT, undefined];
}

/**
 * Ignores errors if the error attribute matches one of the ignored values.
 *
 * @param attribute is the attribute of the error to match.
 * @param ignores is a value or an array of values to match for errors to be ignored.
 *
 * @throws error if none of the values matches or value is undefined.
 *
 * @example
 * // Ignore error if `error.code` equals "ECONNREFUSED". Returns undefined if error is ignored.
 * await got(url.catch(_ignorer("code", "ECONNREFUSED"));
 *
 * // Ignore error if `error.code` equals "ECONNREFUSED" or "OTHER". Returns undefined if error is ignored.
 * await got(url.catch(_ignorer("code", ["ECONNREFUSED", "OTHER"]));
 *
 * // Ignore error if `error.code` equals "ECONNREFUSED" or matches /ent/ regular expression. Returns undefined if error is ignored.
 * await got(url.catch(_ignorer("code", [/ECONN/, "OTHER"]));
 */
function _ignorer(attribute: string, ignores: Array<Ignore>): (e: Error) => undefined;
/**
 * Ignores errors if the error attribute matches one of the ignored values.
 *
 * @param attribute is the attribute of the error to match.
 * @param ignores is a value or an array of values to match for errors to be ignored.
 * @param defaultValue is the vaue to be returned if the error is ignored.
 * @returns the default value.
 *
 * @throws error if none of the values matches or value is undefined.
 *
 * @example
 * // Ignore error if `error.code` equals "ECONNREFUSED". Returns [] if error is ignored.
 * await got(url.catch(_ignorer("code", "ECONNREFUSED", []));
 *
 * // Ignore error if `error.code` equals "ECONNREFUSED" or "OTHER". Returns [] if error is ignored.
 * await got(url.catch(_ignorer("code", ["ECONNREFUSED", "OTHER"], []));
 *
 * // Ignore error if `error.code` equals "ECONNREFUSED" or matches /ent/ regular expression. Returns [] if error is ignored.
 * await got(url.catch(_ignorer("code", [/ECONN/, "ECONNREFUSED"], []));
 */
function _ignorer<T>(attribute: string, ignores: Array<Ignore>, defaultValue: T): (e: Error) => T;
function _ignorer<T>(attribute: string, ignores: Array<Ignore>, defaultValue?: T): (e: Error) => T | undefined {
  // If no ignored value is specified, return the function which throws immediatly.
  if (ignores.length === 0) return thrower;

  // Return a function which returns default value if error attribute matches one of the ignored values, throws otherwise.
  return (error: any) => {
    if (matches(ignores, error[attribute])) return defaultValue;
    throw error;
  };
}

function ignorerSync<T, D>(
  attribute: string,
  ignores: Array<string | number | RegExp>,
  defaultValue: D | undefined,
  fn: (...args: any[]) => T
): T | D | undefined {
  try {
    return fn();
  } catch (error) {
    // If no ignored value is specified, throw directly.
    if (ignores.length === 0) throw error;

    // Return default value if error attribute matches one of the ignored values. Otherwise throw.
    if (matches(ignores, error[attribute])) return defaultValue;
    throw error;
  }
}

const ignorer = memoize(_ignorer);

/**
 * If a function is provided executes the function and ignores some errors. If no function is provided returns a catch function.
 *
 * @param attribute is the error attribute to ignore some values.
 * @param ignore is the values to ignore when thrown error's attribute matches.
 * @param defaultOrFn default value if error is ignored or function to execute.
 * @param maybeFn function to execute or undefined.
 * @returns catch function, default value or undefined.
 * @throws error if thrown error does not match ignored ones.
 */
export function ignoreAttribute<D, R>(attribute: string, ignore?: Multi<Ignore>, defaultOrFn?: D | Fn<R>, maybeFn?: Fn<R>): Result<D, R> {
  const [defaultValue, fn] = getDefault(defaultOrFn, maybeFn);

  return typeof fn === "function"
    ? ignorerSync(attribute, arrify(ignore), defaultValue, fn)
    : ignorer(attribute, arrify(ignore), defaultValue);
}
