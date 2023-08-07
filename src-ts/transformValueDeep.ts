type TransformFunction<T, X> = (value: T, key?: string | number | Symbol) => X;
type ValueTransformation<T, U> = T extends Array<unknown>
  ? { [K in keyof T]: ValueTransformation<T[K], U> }
  : U;
type SingleValueOfArray<T> = { [K in keyof T]: T[K] };

function transformDeep<X>(
  valueToBeTransformed: null | undefined,
  transformationFunction: TransformFunction<null | undefined, X>
): X;

function transformDeep<T, X>(
  valueToBeTransformed: T,
  transformationFunction: TransformFunction<T, X>
): X;

function transformDeep<T, X>(
  valueToBeTransformed: T,
  transformationFunction: TransformFunction<T[keyof T], X>
): ValueTransformation<T, X>;

function transformDeep<T, X>(
  valueToBeTransformed: T,
  transformationFunction: TransformFunction<T[keyof T], X>
): T extends object ? { [K in keyof T]: X } : X;

function transformDeep<T, X>(
  valueToBeTransformed: T[keyof T],
  transformationFunction: TransformFunction<T[keyof T], X>
) {
  const typeOfValueToBeTransformed = typeof valueToBeTransformed;

  if (
    [
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol",
      "undefined",
      "function",
    ].includes(typeOfValueToBeTransformed) ||
    valueToBeTransformed === null ||
    valueToBeTransformed === undefined
  ) {
    return transformationFunction(valueToBeTransformed);
  }

  if (Array.isArray(valueToBeTransformed)) {
    const transformedArray = valueToBeTransformed.map(
      (value: SingleValueOfArray<T[keyof T]>) =>
        transformDeep(value, transformationFunction)
    );

    return transformedArray;
  }

  const valueToBeTransformedConvertedToKeyValuePair = Object.entries(
    valueToBeTransformed
  ) as Array<[keyof T, T[keyof T]]>;

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

      if (Array.isArray(value)) {
        const transformedValue = value.map(
          (singleArrayValue: SingleValueOfArray<T[keyof T]>, index) =>
            transformDeep(singleArrayValue, (props: Parameters<T>[0]) =>
              transformationFunction(props, index)
            )
        );

        acc[key] = transformedValue;

        return acc;
      }

      if (typeof value === "object") {
        acc[key] = transformDeep(value, (props) =>
          transformationFunction(props, key)
        );

        return acc;
      }

      return acc;
    },
    {} as {
      [K in keyof T]:
        | T[keyof T]
        | ReturnType<typeof transformationFunction>
        | X
        | Array<X>;
    }
  );
}

export default transformDeep;
