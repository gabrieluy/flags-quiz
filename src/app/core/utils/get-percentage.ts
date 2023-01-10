export function getPercentage(num: number, base: number): number {
  return Math.round((num * 100) / base) || 0;
}
