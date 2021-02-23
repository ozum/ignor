/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ignoreCode, ignoreMessage, ignoreStatus } from "../src/index";

const ERROR: any = new Error("Cannot complete operation.");
ERROR.code = "CANNOT";
ERROR.status = 802;

const AGGREGATE_ERROR: any = new Error("This is an aggregate error.");
AGGREGATE_ERROR.errors = [ERROR, ERROR];

const SIMPLE_ERROR: any = new Error("Cannot complete operation.");

function throwing(): string {
  throw ERROR;
}

function throwingSimple(): string {
  throw SIMPLE_ERROR;
}

describe("ignore", () => {
  describe("code", () => {
    it("should return undefined if ignored value is equal to error code.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreCode("CANNOT"))).toBe(undefined);
    });

    it("should throw if ignored value is not equal to error code.", async () => {
      await expect(Promise.reject(ERROR).catch(ignoreCode("X"))).rejects.toThrow("Cannot");
    });

    it("should return undefined if one of the ignored values is equal to error code.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreCode(["CANNOT", "EXTRA"]))).toBe(undefined);
    });

    it("should throw if none of the ignored values is equal to error code.", async () => {
      await expect(Promise.reject(ERROR).catch(ignoreCode(["X", "Y"]))).rejects.toThrow("Cannot");
    });

    it("should throw if no ignore value is provided.", async () => {
      await expect(Promise.reject(ERROR).catch(ignoreCode())).rejects.toThrow("Cannot");
    });

    it("should throw if error does not have given attribute.", async () => {
      await expect(Promise.reject(SIMPLE_ERROR).catch(ignoreCode("CANNOT"))).rejects.toThrow("Cannot");
    });

    it("should return default value if ignored value is equal to error code.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreCode("CANNOT", "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values is equal to error code.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreCode(["CANNOT", "EXTRA"], "default"))).toBe("default");
    });

    it("should return default value if all errors of an aggregate error has one of the ignored codes.", async () => {
      expect(await Promise.reject(AGGREGATE_ERROR).catch(ignoreCode("CANNOT", "default"))).toBe("default");
    });

    it("should throw if some errors of an aggregate error is not ignored.", async () => {
      await expect(Promise.reject(AGGREGATE_ERROR).catch(ignoreCode("EXTRA", "default"))).rejects.toThrow("This is an aggregate error.");
    });
  });

  describe("code (sync)", () => {
    it("should return undefined if ignored value is equal to error code.", () => {
      expect(ignoreCode("CANNOT", throwing)).toBe(undefined);
    });

    it("should throw if ignored value is not equal to error code.", () => {
      expect(() => ignoreCode("X", throwing)).toThrow("Cannot");
    });

    it("should return undefined if one of the ignored values is equal to error code.", () => {
      expect(ignoreCode(["CANNOT", "EXTRA"], throwing)).toBe(undefined);
    });

    it("should throw if none of the ignored values is equal to error code.", () => {
      expect(() => ignoreCode(["X", "Y"], throwing)).toThrow("Cannot");
    });

    it("should throw if ignore value is undefined.", () => {
      expect(() => ignoreCode(undefined, throwing)).toThrow("Cannot");
    });

    it("should throw if error does not have given attribute.", () => {
      expect(() => ignoreCode("CANNOT", throwingSimple)).toThrow("Cannot");
    });

    it("should return default value if ignored value is equal to error code.", () => {
      expect(ignoreCode("CANNOT", "default", throwing)).toBe("default");
    });

    it("should return default value if one of the ignored values is equal to error code.", () => {
      expect(ignoreCode(["CANNOT", "EXTRA"], "default", throwing)).toBe("default");
    });
  });

  describe("message", () => {
    it("should return undefined if ignored value matches to error message.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreMessage(/complete/))).toBe(undefined);
    });

    it("should return undefined if one of the ignored values matches to error message.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreMessage([/complete/, /extra/]))).toBe(undefined);
    });

    it("should return default value if ignored value matches to error message.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreMessage(/complete/, "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values matches to error message.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreMessage([/complete/, /extra/], "default"))).toBe("default");
    });
  });

  describe("status", () => {
    it("should return undefined if ignored value is equal to error status.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreStatus(802))).toBe(undefined);
    });

    it("should return undefined if one of the ignored values is equal to error status.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreStatus([802, 803]))).toBe(undefined);
    });

    it("should return default value if ignored value is equal to error status.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreStatus(802, "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values is equal to error status.", async () => {
      expect(await Promise.reject(ERROR).catch(ignoreStatus([802, 803], "default"))).toBe("default");
    });
  });
});
