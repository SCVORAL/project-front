export function emptyStringValidator(str) {
  return !!str.length;
}

export function emptyObjectValidator(obj) {
  return !!Object.keys(obj).length;
}

export function emptyArrayValidator(arr) {
  return !!arr.length;
}

