export function appearance(value: "none" | "auto"): any {
  return {
    'appearance': value,
    '-webkit-appearance': value,
  }
}