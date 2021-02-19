import * as ignore from "../src/index";

const error: any = new Error("Cannot complete operation.");
error.code = "CANNOT";
error.status = 802;

const simpleError: any = new Error("Cannot complete operation.");

describe("ignore", () => {
  describe("code", () => {
    it("should return undefined if ignored value is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignore.code("CANNOT"))).toBe(undefined);
    });

    it("should throw if ignored value is not equal to error code.", async () => {
      await expect(Promise.reject(error).catch(ignore.code("X"))).rejects.toThrow("Cannot");
    });

    it("should return undefined if one of the ignored values is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignore.code(["CANNOT", "EXTRA"]))).toBe(undefined);
    });

    it("should throw if none of the ignored values is equal to error code.", async () => {
      await expect(Promise.reject(error).catch(ignore.code(["X", "Y"]))).rejects.toThrow("Cannot");
    });

    it("should throw if no ignore value is provided.", async () => {
      await expect(Promise.reject(error).catch(ignore.code())).rejects.toThrow("Cannot");
    });

    it("should throw if error does not have given attribute.", async () => {
      await expect(Promise.reject(simpleError).catch(ignore.code("CANNOT"))).rejects.toThrow("Cannot");
    });

    it("should return default value if ignored value is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignore.code("CANNOT", "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values is equal to error code.", async () => {
      expect(await Promise.reject(error).catch(ignore.code(["CANNOT", "EXTRA"], "default"))).toBe("default");
    });
  });

  describe("message", () => {
    it("should return undefined if ignored value matches to error message.", async () => {
      expect(await Promise.reject(error).catch(ignore.message(/complete/))).toBe(undefined);
    });

    it("should return undefined if one of the ignored values matches to error message.", async () => {
      expect(await Promise.reject(error).catch(ignore.message([/complete/, /extra/]))).toBe(undefined);
    });

    it("should return default value if ignored value matches to error message.", async () => {
      expect(await Promise.reject(error).catch(ignore.message(/complete/, "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values matches to error message.", async () => {
      expect(await Promise.reject(error).catch(ignore.message([/complete/, /extra/], "default"))).toBe("default");
    });
  });

  describe("status", () => {
    it("should return undefined if ignored value is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignore.status(802))).toBe(undefined);
    });

    it("should return undefined if one of the ignored values is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignore.status([802, 803]))).toBe(undefined);
    });

    it("should return default value if ignored value is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignore.status(802, "default"))).toBe("default");
    });

    it("should return default value if one of the ignored values is equal to error status.", async () => {
      expect(await Promise.reject(error).catch(ignore.status([802, 803], "default"))).toBe("default");
    });
  });
});
