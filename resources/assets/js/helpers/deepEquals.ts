import isEqualWith from "lodash/isEqualWith";
import isEqual from "lodash/isEqual";

export function deepEquals(object: any, other: any): boolean {
  return isEqual(object, other);
}

/**
 * Logs to console any values which are not equal.
 * DO NOT USE IN PRODUCTION.
 */
function deepEqualsDebug(object: any, other: any): boolean {
  const debugCompare = (a, b, key) => {
    const equality = isEqual(a, b);
    if (!equality) {
      console.debug(`The values at key/index ${key} were not equal:`, a, b);
    }
    return equality;
  };
  if (
    typeof object === "object" &&
    typeof other === "object" &&
    object !== null &&
    other !== null
  ) {
    return (
      debugCompare(
        Object.keys(object).length,
        Object.keys(other).length,
        "length",
      ) &&
      Object.keys(object).every((key) =>
        debugCompare(object[key], other[key], key),
      )
    );
  }
  return isEqualWith(object, other, debugCompare);
}

export default deepEquals;
