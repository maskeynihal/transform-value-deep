import isObject from "./isObject";
import { describe, expect, it } from "vitest";

describe("isObject function", () => {
  it("should return true for a plain object", () => {
    const obj = { a: 1, b: 2 };

    expect(isObject(obj)).toBe(true);
  });

  it("should return false for an array", () => {
    const arr = [1, 2, 3];

    expect(isObject(arr)).toBe(false);
  });

  it("should return false for a string", () => {
    const str = "Hello, world!";

    expect(isObject(str)).toBe(false);
  });

  it("should return false for a number", () => {
    const num = 42;

    expect(isObject(num)).toBe(false);
  });

  it("should return false for a boolean value", () => {
    const bool = true;
    expect(isObject(bool)).toBe(false);
  });

  it("should return false for null", () => {
    const nullValue = null;

    expect(isObject(nullValue)).toBe(false);
  });

  it("should return false for undefined", () => {
    const undefinedValue = undefined;

    expect(isObject(undefinedValue)).toBe(false);
  });

  it("should return false for a function", () => {
    const func = () => {
      return "I am a function";
    };

    expect(isObject(func)).toBe(false);
  });

  it("should return true for a Date object", () => {
    const date = new Date();
    expect(isObject(date)).toBe(true);
  });

  it("should return true for a Map object", () => {
    const map = new Map();

    expect(isObject(map)).toBe(true);
  });

  it("should return true for a Set object", () => {
    const set = new Set();

    expect(isObject(set)).toBe(true);
  });

  it("should return true for a RegExp object", () => {
    const regex = /hello/gi;

    expect(isObject(regex)).toBe(true);
  });

  it("should return true for an Error object", () => {
    const error = new Error("Something went wrong");

    expect(isObject(error)).toBe(true);
  });
});
