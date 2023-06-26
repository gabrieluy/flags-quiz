export const mixSelectedOption = <T>(arr: T[], selected: T): void => {
  const inxAux = Math.floor(Math.random() * arr.length);
  const aux = arr[inxAux];
  arr[0] = aux;
  arr[inxAux] = selected;
};
