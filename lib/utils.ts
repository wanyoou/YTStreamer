export function stateShallowEqual<T extends object, K extends keyof T>(a: T, b: T): boolean {
  if (a === b) {
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key) => a[key as K] === b[key as K]);
}
