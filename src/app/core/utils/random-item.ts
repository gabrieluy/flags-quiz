export const popRandomItem = <T>(arr: T[]): T => arr.splice((Math.random() * arr.length) | 0, 1)[0];
export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
