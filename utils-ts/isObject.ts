export default function isObject(value: unknown) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
