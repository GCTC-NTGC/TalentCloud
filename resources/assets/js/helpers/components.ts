/**
 * Removes whitespace and returns the first 6 characters of a string for a consistent key
 * where ID's are not available.
 *
 * @param string
 */
const keyFromString = (string: string): string =>
  string.replace(/\s/g, "").slice(0, 6);

export default keyFromString;
