/**
 *
 * @param value
 * @param fractionDigits
 * @returns
 * @abstract
 */
export const parseFloat = (value: number, fractionDigits = 2): number => {
  let str = value.toString();
  str.includes('.') && (str = str.slice(0, str.indexOf('.') + fractionDigits + 1));
  return Number(str);
};
