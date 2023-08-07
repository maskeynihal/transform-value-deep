import isArray from "../utils/isArray";

function transformValueDeep(valueToBeTransformed, transformationFunction) {
  if (
    [
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol",
      "undefined",
      "function",
    ].includes(typeof valueToBeTransformed) ||
    valueToBeTransformed === null ||
    valueToBeTransformed === undefined
  ) {
    return transformationFunction(valueToBeTransformed);
  }

  if (isArray(valueToBeTransformed)) {
    const transformedArray = valueToBeTransformed.map((value, index) =>
      transformValueDeep(value, (props) => transformationFunction(props, index))
    );

    return transformedArray;
  }

  const valueToBeTransformedConvertedToKeyValuePair =
    Object.entries(valueToBeTransformed);

  return valueToBeTransformedConvertedToKeyValuePair.reduce(
    (acc, [key, value]) => {
      if (
        [
          "string",
          "number",
          "bigint",
          "boolean",
          "symbol",
          "undefined",
          "function",
        ].includes(typeof value) ||
        value === null ||
        value === undefined
      ) {
        acc[key] = transformationFunction(value, key);

        return acc;
      }

      if (isArray(value)) {
        const transformedValue = value.map((singleArrayValue) =>
          transformValueDeep(singleArrayValue, transformationFunction)
        );

        acc[key] = transformedValue;

        return acc;
      }

      acc[key] = transformValueDeep(value, transformationFunction);

      return acc;
    },
    {}
  );
}

export default transformValueDeep;
