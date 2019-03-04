export function find<T extends {id: number}>(objs: T[], id: number): T | null {
  const found = objs.filter(item => item.id === id);
  return found.length > 0 ? found[0] : null;
}

export function where<T, K extends keyof T>(objs: T[], prop: K, value: any): T[] {
  return objs.filter(obj => (prop in obj && obj[prop] === value));
}

export function whereFirst<T, K extends keyof T>(objs: T[], prop: K, value: any): T {
  return where(objs, prop, value)[0];
}
