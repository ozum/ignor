import memoize from "fast-memoize";

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
function matches(ignores: Array<string | number | RegExp>, value?: string): boolean {
  if (value === undefined) return false;
  return ignores.some((ignored) => (ignored instanceof RegExp ? ignored.test(value) : value === ignored));
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
function _ignorer(attribute: string, ignores: Array<string | number | RegExp>): (e: Error) => undefined;
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
function _ignorer<T extends any>(attribute: string, ignores: Array<string | number | RegExp>, defaultValue: T): (e: Error) => T;
function _ignorer<T extends any>(
  attribute: string,
  ignores: Array<string | number | RegExp>,
  defaultValue?: T
): (e: Error) => T | undefined {
  // Throw directly if no ignored value is specified.
  if (ignores.length === 0) return thrower;

  // Return default value if error attribute matches one of the ignored values. Otherwise throw.
  return (error: any) => {
    if (matches(ignores, error[attribute])) return defaultValue;
    throw error;
  };
}

export const ignorer = memoize(_ignorer);
