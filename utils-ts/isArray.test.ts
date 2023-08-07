// Import the isArray function
import { describe, expect, it } from "vitest";
import isArray from "./isArray";

describe("isArray function", () => {
  it("should return true for an actual array", () => {
    const arr = [1, 2, 3];

    expect(isArray(arr)).toBe(true);
  });

  it("should return false for a plain object", () => {
    const obj = { a: 1, b: 2 };

    expect(isArray(obj)).toBe(false);
  });

  it("should return false for a string", () => {
    const str = "Hello, world!";

    expect(isArray(str)).toBe(false);
  });

  it("should return false for a number", () => {
    const num = 42;

    expect(isArray(num)).toBe(false);
  });

  it("should return false for a boolean value", () => {
    const bool = true;

    expect(isArray(bool)).toBe(false);
  });

  it("should return false for null", () => {
    const nullValue = null;

    expect(isArray(nullValue)).toBe(false);
  });

  it("should return false for undefined", () => {
    const undefinedValue = undefined;

    expect(isArray(undefinedValue)).toBe(false);
  });

  it("should return false for a function", () => {
    const func = () => {
      return "I am a function";
    };

    expect(isArray(func)).toBe(false);
  });
  it("should return false for a Date object", () => {
    const date = new Date();
    expect(isArray(date)).toBe(false);
  });

  it("should return false for a Map object", () => {
    const map = new Map();
    expect(isArray(map)).toBe(false);
  });

  it("should return false for a Set object", () => {
    const set = new Set();
    expect(isArray(set)).toBe(false);
  });

  it("should return false for a RegExp object", () => {
    const regex = /hello/gi;
    expect(isArray(regex)).toBe(false);
  });

  it("should return false for an Error object", () => {
    const error = new Error("Something went wrong");
    expect(isArray(error)).toBe(false);
  });
});
