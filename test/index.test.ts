import { ignoreCode, ignoreMessage, ignoreStatus } from "../src/index";

const error: any = new Error("Cannot complete operation.");
error.code = "CANNOT";
error.status = 802;

const simpleError: any = new Error("Cannot complete operation.");

function throwing(): string {
  throw error;
}

function throwingSimple(): string {
  throw simpleError;
}

describe("ignore", () => {
  describe("code", () => {
    it("should return undefined if ignored value is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignoreCode("CANNOT"))).toBe(undefined);
    });

    it("should throw if ignored value is not equal to error code.", async () => {
      await expect(Promise.reject(error).catch(ignoreCode("X"))).rejects.toThrow("Cannot");
    });

    it("should return undefined if one of the ignored values is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignoreCode(["CANNOT", "EXTRA"]))).toBe(undefined);
    });

    it("should throw if none of the ignored values is equal to error code.", async () => {
      await expect(Promise.reject(error).catch(ignoreCode(["X", "Y"]))).rejects.toThrow("Cannot");
    });

    it("should throw if no ignore value is provided.", async () => {
      await expect(Promise.reject(error).catch(ignoreCode())).rejects.toThrow("Cannot");
    });

    it("should throw if error does not have given attribute.", async () => {
      await expect(Promise.reject(simpleError).catch(ignoreCode("CANNOT"))).rejects.toThrow("Cannot");
    });

    it("should return default value if ignored value is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignoreCode("CANNOT", "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignoreCode(["CANNOT", "EXTRA"], "default"))).toBe("default");
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
      expect(await Promise.reject(error).catch(ignoreMessage(/complete/))).toBe(undefined);
    });

    it("should return undefined if one of the ignored values matches to error message.", async () => {
      expect(await Promise.reject(error).catch(ignoreMessage([/complete/, /extra/]))).toBe(undefined);
    });

    it("should return default value if ignored value matches to error message.", async () => {
      expect(await Promise.reject(error).catch(ignoreMessage(/complete/, "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values matches to error message.", async () => {
      expect(await Promise.reject(error).catch(ignoreMessage([/complete/, /extra/], "default"))).toBe("default");
    });
  });

  describe("status", () => {
    it("should return undefined if ignored value is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignoreStatus(802))).toBe(undefined);
    });

    it("should return undefined if one of the ignored values is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignoreStatus([802, 803]))).toBe(undefined);
    });

    it("should return default value if ignored value is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignoreStatus(802, "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignoreStatus([802, 803], "default"))).toBe("default");
    });
  });
});
