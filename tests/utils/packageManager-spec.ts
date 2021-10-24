import { getIsPackageManagerInstalled } from "../../src/renderer/packageManager";
import { exec } from "../../src/utils/exec";
import { overridePlatform, resetPlatform } from "../utils";
jest.mock("../../src/utils/exec");

describe("packageManager", () => {
  describe("getIsPackageManagerInstalled()", () => {
    describe("npm()", () => {
      beforeEach(() => {
        jest.resetModules();
      });

      afterEach(() => resetPlatform());

      it("returns true if npm installed", async () => {
        overridePlatform("darwin");

        (exec as jest.Mock).mockReturnValueOnce(
          Promise.resolve("/usr/bin/fake-npm")
        );

        const result = await getIsPackageManagerInstalled("npm");

        expect(result).toBe(true);
        expect((exec as jest.Mock).mock.calls[0][1]).toBe("which npm");
      });

      it("returns true if npm installed", async () => {
        overridePlatform("win32");

        (exec as jest.Mock).mockReturnValueOnce(
          Promise.resolve("/usr/bin/fake-npm")
        );

        const result = await getIsPackageManagerInstalled("npm", true);

        expect(result).toBe(true);
        expect((exec as jest.Mock).mock.calls[0][1]).toBe("where.exe npm");
      });

      it("returns false if npm not installed", async () => {
        overridePlatform("darwin");

        (exec as jest.Mock).mockReturnValueOnce(
          Promise.reject("/usr/bin/fake-npm")
        );

        const result = await getIsPackageManagerInstalled("npm", true);

        expect(result).toBe(false);
        expect((exec as jest.Mock).mock.calls[0][1]).toBe("which npm");
      });

      it("uses the cache", async () => {
        (exec as jest.Mock).mockReturnValueOnce(
          Promise.resolve("/usr/bin/fake-npm")
        );

        const one = await getIsPackageManagerInstalled("npm", true);
        expect(one).toBe(true);
        expect(exec as jest.Mock).toHaveBeenCalledTimes(1);

        const two = await getIsPackageManagerInstalled("npm");
        expect(two).toBe(true);
        expect(exec as jest.Mock).toHaveBeenCalledTimes(1);
      });
    });

    describe("yarn()", () => {
      beforeEach(() => {
        jest.resetModules();
      });

      afterEach(() => resetPlatform());

      it("returns true if yarn installed", async () => {
        overridePlatform("darwin");

        (exec as jest.Mock).mockReturnValueOnce(
          Promise.resolve("/usr/bin/fake-yarn")
        );

        const result = await getIsPackageManagerInstalled("yarn");

        expect(result).toBe(true);
        expect((exec as jest.Mock).mock.calls[0][1]).toBe("which yarn");
      });

      it("returns true if yarn installed", async () => {
        overridePlatform("win32");

        (exec as jest.Mock).mockReturnValueOnce(
          Promise.resolve("/usr/bin/fake-yarn")
        );

        const result = await getIsPackageManagerInstalled("yarn", true);

        expect(result).toBe(true);
        expect((exec as jest.Mock).mock.calls[0][1]).toBe("where.exe yarn");
      });

      it("returns false if yarn not installed", async () => {
        overridePlatform("darwin");

        (exec as jest.Mock).mockReturnValueOnce(
          Promise.reject("/usr/bin/fake-yarn")
        );

        const result = await getIsPackageManagerInstalled("yarn", true);

        expect(result).toBe(false);
        expect((exec as jest.Mock).mock.calls[0][1]).toBe("which yarn");
      });

      it("uses the cache", async () => {
        (exec as jest.Mock).mockReturnValueOnce(
          Promise.resolve("/usr/bin/fake-yarn")
        );

        const one = await getIsPackageManagerInstalled("yarn", true);
        expect(one).toBe(true);
        expect(exec as jest.Mock).toHaveBeenCalledTimes(1);

        const two = await getIsPackageManagerInstalled("yarn");
        expect(two).toBe(true);
        expect(exec as jest.Mock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
