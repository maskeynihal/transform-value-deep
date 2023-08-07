/**
 * Check if the value is object or not.
 *
 * @param {unknown} value
 */
export default function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
