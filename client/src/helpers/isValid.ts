export function isValidDate(value: any): boolean {
  const date = Date.parse(value)

  return !isNaN(date)
}