export function find<T extends { id: number }>(
  objs: T[],
  id: number,
): T | null {
  const found = objs.filter(item => item.id === id);
  return found.length > 0 ? found[0] : null;
}

export function where<T, K extends keyof T>(
  objs: T[],
  prop: K,
  value: any,
): T[] {
  return objs.filter(obj => prop in obj && obj[prop] === value);
}

export function whereFirst<T, K extends keyof T>(
  objs: T[],
  prop: K,
  value: any,
): T {
  return where(objs, prop, value)[0];
}

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

export function hasKey<A>(
  object: { [key: string]: A },
  key: string | number,
): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}
