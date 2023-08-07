import { describe, expect, it, vi } from "vitest";
import transformValueDeep from "./transformValueDeep";

describe("Transform Value Deep Test", () => {
  describe("For primitive data type", () => {
    it("transforms a number", () => {
      const double = (value) => value * 2;
      const result = transformValueDeep(5, double);

      expect(result).toBe(10);
    });

    it("transforms a string", () => {
      const capitalize = (value) => value.toUpperCase();

      const result = transformValueDeep("hello", capitalize);

      expect(result).toBe("HELLO");
    });

    it("transforms a string to number", () => {
      const stringLength = (value) => value.length;

      const result = transformValueDeep("hello", stringLength);

      expect(result).toBe(5);
    });

    it("transforms a number to string", () => {
      const toString = (value) => String(value);

      const result = transformValueDeep(5, toString);

      expect(result).toBe("5");
    });

    it("transforms a boolean", () => {
      const negate = (value) => !value;
      const result = transformValueDeep(true, negate);

      expect(result).toBe(false);
    });

    it("transforms a null", () => {
      const checkNull = (value) =>
        value === null ? "Value is null" : "Value is not null";
      const result = transformValueDeep(null, checkNull);

      expect(result).toBe("Value is null");
    });

    it("transforms a undefined", () => {
      const checkUndefined = (value) =>
        value === undefined ? "Value is undefined" : "Value is not undefined";
      const result = transformValueDeep(undefined, checkUndefined);

      expect(result).toBe("Value is undefined");
    });
  });

  describe("For array", () => {
    it("transform for array of number", () => {
      const square = (x) => x * x;
      const value = [1, 2, 3, 4, 5];

      const result = transformValueDeep(value, square);

      expect(result).toEqual([1, 4, 9, 16, 25]);
    });

    it("transform for array of string", () => {
      const upperCase = (x) => x.toUpperCase();
      const value = ["this", "package", "is", "for", "transformation"];

      const result = transformValueDeep(value, upperCase);
      expect(result).toEqual([
        "THIS",
        "PACKAGE",
        "IS",
        "FOR",
        "TRANSFORMATION",
      ]);
    });

    it("transform for array of array of number", () => {
      const square = (x) => x * x;
      const value = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
      ];
      const result = transformValueDeep(value, square);

      expect(result).toEqual([
        [1, 4, 9, 16, 25],
        [36, 49, 64, 81, 100],
      ]);
    });

    it("transform for array of array of string", () => {
      const toLowerCase = (x) => x.toLowerCase();
      const value = [["A", "AB", "ABC", "ABCD", "ABCDE"]];
      const result = transformValueDeep(value, toLowerCase);

      expect(result).toEqual([["a", "ab", "abc", "abcd", "abcde"]]);
    });

    it("transform for array of string with transformation function that returns number", () => {
      const countStringLength = (x) => x.length;
      const value = ["A", "AB", "ABC", "ABCD", "ABCDE"];
      const result = transformValueDeep(value, countStringLength);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("transform for array of array of string with transformation function that returns number", () => {
      const countStringLength = (x) => x.length;
      const value = [["A", "AB", "ABC", "ABCD", "ABCDE"]];
      const result = transformValueDeep(value, countStringLength);

      expect(result).toEqual([[1, 2, 3, 4, 5]]);
    });
  });

  describe("For Object", () => {
    it("transform value for simple key of number & value of string object", () => {
      const upperCaseValues = (x) => x.toUpperCase();
      const value = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
      };

      const transformedValue = transformValueDeep(value, upperCaseValues);

      expect(transformedValue).toEqual({
        1: "ONE",
        2: "TWO",
        3: "THREE",
        4: "FOUR",
      });
    });

    it("transform value for nested key of number & value of string object", () => {
      const upperCaseValues = (x) => x.toUpperCase();
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

      const transformedValue = transformValueDeep(value, upperCaseValues);

      expect(transformedValue).toEqual({
        1: "ONE",
        2: "TWO",
        3: "THREE",
        4: "FOUR",
        5: { 1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR" },
      });
    });

    it("transform value for nested key of number & value of string object", () => {
      const upperCaseValues = (x) => x.toUpperCase();
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
          5: {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
          },
        },
      };

      const transformedValue = transformValueDeep(value, upperCaseValues);

      expect(transformedValue).toEqual({
        1: "ONE",
        2: "TWO",
        3: "THREE",
        4: "FOUR",
        5: {
          1: "ONE",
          2: "TWO",
          3: "THREE",
          4: "FOUR",
          5: { 1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR" },
        },
      });
    });

    it("transform value for object with array of primitive data type", () => {
      const double = (x) => x * 2;

      const value = {
        pizza: [1, 2, 3, 4, 5],
        momo: [9, 8, 7, 6],
      };

      const transformedValue = transformValueDeep(value, double);

      expect(transformedValue).toEqual({
        pizza: [2, 4, 6, 8, 10],
        momo: [18, 16, 14, 12],
      });
    });

    it("transform value for object with nested object with array of primitive data type", () => {
      const convertToHundred = (x) => x * 100;

      const value = {
        totalCost: {
          pizza: [1, 2, 3, 4, 5],
          momo: [2, 2, 3, 3],
        },
        count: {
          pizza: [1, 1, 2, 3],
          momo: [1, 1],
        },
      };

      const transformedValue = transformValueDeep(value, convertToHundred);

      expect(transformedValue).toEqual({
        totalCost: {
          pizza: [100, 200, 300, 400, 500],
          momo: [200, 200, 300, 300],
        },
        count: {
          pizza: [100, 100, 200, 300],
          momo: [100, 100],
        },
      });
    });

    it("transform value for object with array of object", () => {
      const convertToString = (x) => String(x);

      const value = {
        animal: {
          dog: {
            age: [8, 2, 3],
          },
          cat: {
            age: [10, 1, 2],
          },
        },
      };

      const transformedValue = transformValueDeep(value, convertToString);

      expect(transformedValue).toEqual({
        animal: {
          dog: {
            age: ["8", "2", "3"],
          },
          cat: {
            age: ["10", "1", "2"],
          },
        },
      });
    });

    it("transform value for object with ");
  });

  describe("For transformation with usage of key", () => {
    it("call the transformation function with key for primitive datatype", () => {
      const objectWithFunction = {
        transformationFunction: (value, key) => ({ [key]: value }),
      };

      const spied = vi.spyOn(objectWithFunction, "transformationFunction");

      const value = 1;

      const transformedValue = transformValueDeep(
        value,
        objectWithFunction.transformationFunction
      );

      expect(spied).toHaveBeenCalled();

      expect(spied.mock.calls[0]).toEqual([1]);

      expect(transformedValue).toEqual({
        undefined: 1,
      });
    });

    it("call the transformation function with key for array", () => {
      const objectWithFunction = {
        transformationFunction: (value, key) => [value, key],
      };

      const spied = vi.spyOn(objectWithFunction, "transformationFunction");

      const value = [1, 2, 3, 4];

      const transformedValue = transformValueDeep(
        value,
        objectWithFunction.transformationFunction
      );

      expect(spied).toHaveBeenCalled();

      expect(spied.mock.calls[0]).toEqual([1, 0]);

      expect(transformedValue).toEqual([
        [1, 0],
        [2, 1],
        [3, 2],
        [4, 3],
      ]);
    });

    it("call the transformation function with key for object", () => {
      const objectWithFunction = {
        transformationFunction: (value, key) => ({ [key]: value }),
      };

      const spied = vi.spyOn(objectWithFunction, "transformationFunction");

      const value = { package: "transformation value" };

      const transformedValue = transformValueDeep(
        value,
        objectWithFunction.transformationFunction
      );

      expect(spied).toHaveBeenCalled();

      expect(spied.mock.calls[0]).toEqual(["transformation value", "package"]);

      expect(transformedValue).toEqual({
        package: { package: "transformation value" },
      });
    });

    it("call the transformation function for nested object with key", () => {
      const convertToHundred = (value, key) =>
        key === "momo" ? value * 100 : value;

      const value = {
        totalCost: {
          pizza: 1,
          momo: 2,
        },
        count: {
          pizza: 3,
          momo: 4,
        },
      };

      const transformedValue = transformValueDeep(value, convertToHundred);

      expect(transformedValue).toEqual({
        totalCost: {
          pizza: 1,
          momo: 200,
        },
        count: {
          pizza: 3,
          momo: 400,
        },
      });
    });

    it("call the transformation function for nested array with key", () => {
      const convertToHundred = (value, key) =>
        key === "momo" ? value * 100 : value;

      const value = {
        totalCost: {
          pizza: 1,
          momo: 2,
        },
        count: {
          pizza: 3,
          momo: 4,
        },
      };

      const transformedValue = transformValueDeep(value, convertToHundred);

      expect(transformedValue).toEqual({
        totalCost: {
          pizza: 1,
          momo: 200,
        },
        count: {
          pizza: 3,
          momo: 400,
        },
      });
    });
  });
});
