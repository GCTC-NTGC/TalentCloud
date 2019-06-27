/**
 * Shortcut function that returns the id attribute of an object.
 * @param item
 */
export function getId<T extends { id: number }>(item: T): number {
  return item.id;
}

/**
 * Shortcut function used to filter nulls and undefined values out of an array.
 * @param item
 */
export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * From an array of objects, return the first object with a specific id value.
 * @param objs
 * @param id
 */
export function find<T extends { id: number }>(
  objs: T[],
  id: number,
): T | null {
  const found = objs.filter(item => item.id === id);
  return found.length > 0 ? found[0] : null;
}

/**
 * Return all objects from array with the specified key-value attribute.
 * @param objs
 * @param prop
 * @param value
 */
export function where<T, K extends keyof T>(
  objs: T[],
  prop: K,
  value: any,
): T[] {
  return objs.filter(obj => prop in obj && obj[prop] === value);
}

/**
 * Return first object from array with the specified key-value attribute.
 * @param objs
 * @param prop
 * @param value
 */
export function whereFirst<T, K extends keyof T>(
  objs: T[],
  prop: K,
  value: any,
): T {
  return where(objs, prop, value)[0];
}

/**
 * Map each key-value attribute of an object into an array
 * @param object
 * @param mapFn
 */
export function objectMap<A, B>(
  object: {
    [key: string]: A;
  },
  mapFn: (key: string, value: A) => B,
): B[] {
  return Object.keys(object).reduce((result: B[], key: string): B[] => {
    result.push(mapFn(key, object[key]));
    return result;
  }, []);
}

interface IndexedObject<T> {
  [key: string]: T;
}

/**
 * Maps an array of items into an object, with each transformed into an attribute
 * @param items array of objects
 * @param keyFn Function that returns a unique key for each object. Typically the getId function.
 * @param valFn Function that returns a new value for each object.
 */
export function mapToObjectTrans<A, B>(
  items: A[],
  keyFn: (item: A) => string | number,
  valFn: (item: A) => B,
): IndexedObject<B> {
  return items.reduce((result: IndexedObject<B>, item: A): IndexedObject<B> => {
    const key = keyFn(item);
    result[key] = valFn(item);
    return result;
  }, {});
}

/**
 * Maps an array of items into an object, with each item set as an attribute.
 * @param items array of objects
 * @param keyFn Function that returns a unique key for each object. Typically the getId function.
 */
export function mapToObject<T>(
  items: T[],
  keyFn: (item: T) => string | number,
): IndexedObject<T> {
  return mapToObjectTrans(items, keyFn, (item): T => item);
}

/**
 * Checks if an object has an attribute with a particular key
 * @param object
 * @param key
 */
export function hasKey<T>(
  object: { [key: string]: T },
  key: string | number,
): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * Returns the value at the specified key. If the key is not present, throws an error.
 * @param object
 * @param key
 * @param errorMessage
 */
export function getOrThrowError<T>(
  object: { [key: string]: T },
  key: string | number,
  errorMessage: string,
): T {
  if (!hasKey(object, key)) {
    throw new Error(errorMessage);
  }
  return object[key];
}

/** Return a copy of the object with specific property removed */
export function deleteProperty<T>(
  obj: IndexedObject<T>,
  key: string | number,
): IndexedObject<T> {
  const { [key]: _, ...newObj } = obj;
  return newObj;
}
