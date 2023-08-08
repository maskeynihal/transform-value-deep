import { describe, expect, it } from "vitest";
import transformDeep from "./transformValueDeep";

describe("Transform Value Deep Test", () => {
  describe("For primitive data type", () => {
    it("transforms a number", () => {
      const double = (value: number) => value * 2;
      const result = transformDeep(5, double);

      expect(result).toBe(10);
    });

    it("transforms a string", () => {
      const capitalize = (value: string) => value.toUpperCase();

      const result = transformDeep("hello", capitalize);

      expect(result).toBe("HELLO");
    });

    it("transforms a string to number", () => {
      const stringLength = (value: string) => value.length;

      const result = transformDeep("hello", stringLength);

      expect(result).toBe(5);
    });

    it("transforms a number to string", () => {
      const toString = (value: number) => String(value);

      const result = transformDeep(5, toString);

      expect(result).toBe("5");
    });

    it("transforms a boolean", () => {
      const negate = (value: boolean) => !value;
      const result = transformDeep(true, negate);

      expect(result).toBe(false);
    });

    it("transforms a null", () => {
      const checkNull = (value: null) =>
        value === null ? "Value is null" : "Value is not null";
      const result = transformDeep(null, checkNull);

      expect(result).toBe("Value is null");
    });

    it("transforms a undefined", () => {
      const checkUndefined = (value: undefined) =>
        value === undefined ? "Value is undefined" : "Value is not undefined";
      const result = transformDeep(undefined, checkUndefined);

      expect(result).toBe("Value is undefined");
    });
  });

  describe("For array", () => {
    it("transform for array of number", () => {
      const square = (x: number) => x * x;
      const value = [1, 2, 3, 4, 5];

      const result = transformDeep(value, square);

      expect(result).toEqual([1, 4, 9, 16, 25]);
    });

    it("transform for array of string", () => {
      const upperCase = (x: string) => x.toUpperCase();
      const value = ["this", "package", "is", "for", "transformation"];

      const result = transformDeep(value, upperCase);
      expect(result).toEqual([
        "THIS",
        "PACKAGE",
        "IS",
        "FOR",
        "TRANSFORMATION",
      ]);
    });

    it("transform for array of array of number", () => {
      const square = (x: number) => x * x;
      const value = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
      ];
      const result = transformDeep(value, square);

      expect(result).toEqual([
        [1, 4, 9, 16, 25],
        [36, 49, 64, 81, 100],
      ]);
    });

    it("transform for array of array of string", () => {
      const toLowerCase = (x: string) => x.toLowerCase();
      const value = [["A", "AB", "ABC", "ABCD", "ABCDE"]];
      //@ts-ignore
      const result: Array<Array<string>> = transformDeep(value, toLowerCase);

      expect(result).toEqual([["a", "ab", "abc", "abcd", "abcde"]]);
    });

    it("transform for array of string with transformation function that returns number", () => {
      const countStringLength = (x: string) => x.length;
      const value = ["A", "AB", "ABC", "ABCD", "ABCDE"];
      const result = transformDeep(value, countStringLength);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("transform for array of array of string with transformation function that returns number", () => {
      const countStringLength = (x: string) => x.length;
      const value = [["A", "AB", "ABC", "ABCD", "ABCDE"]];
      //@ts-ignore
      const result: Array<Array<number>> = transformDeep(
        value,
        countStringLength
      );

      expect(result).toEqual([[1, 2, 3, 4, 5]]);
    });
  });

  describe("For Object", () => {
    it("transform value for simple key of number & value of string object", () => {
      const upperCaseValues = (x: string) => x.toUpperCase();
      const value = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
      };

      const transformedValue = transformDeep(value, upperCaseValues);

      expect(transformedValue).toEqual({
        1: "ONE",
        2: "TWO",
        3: "THREE",
        4: "FOUR",
      });
    });

    it("transform value for nested key of number & value of string object", () => {
      const upperCaseValues = (x: string) => x.toUpperCase();
      const value = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: {
          1: "one",
          2: "two",
          3: "three",
          4: "four",
        },
      };

      const transformedValue = transformDeep(value, upperCaseValues);

      expect(transformedValue).toEqual({
        1: "ONE",
        2: "TWO",
        3: "THREE",
        4: "FOUR",
        5: { 1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR" },
      });
    });
  });
});
