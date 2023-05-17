const prefixesWithout7 = ['', '', '', ' ', '', '', '-', '', '-', ''] as const;
const prefixes = ['+', ' ', '', '', ' ', '', '', '-', '', '-', ''] as const;

const allowedSymbol = /(-|\s)/;
const number = /^[0-9]$/;

const isAllowedSymbol = (char: string) => allowedSymbol.test(char);
export const isNumber = (char: string) => number.test(char);

export const splttPhoneNumber = (phoneNumber: string) => {
  let acc = "";
  for (let i = 0; i < phoneNumber.length; i++) {
    const pre = prefixes[i] || "";
    const char = phoneNumber[i];
    acc += `${pre}${char}`;
  }
  return acc;
}

const deleteOnChange = (phoneNumber: string) => {
  const chars = [...phoneNumber];
  const last = chars.at(-1)!;
  if (!isNumber(last)) chars.pop();
  return chars.join("");
}

export const splitOnChange = (phoneNumber: string, prev: string, maxLength: number) => {

  const pnl = phoneNumber.length; // phone number length
  const isDeleting = prev.length > pnl;
  
  if (isDeleting) return deleteOnChange(phoneNumber);

  let acc = "";
  let j = 0;
  
  for (let i = 0; (i < pnl && i <= maxLength); i++) {
    const pre = prefixesWithout7[j] || "";
    const char = phoneNumber[i];
    const isLastChar = i === pnl - 1;

    if (isNumber(char)) {
      acc += isLastChar ? `${pre}${char}` : char;
      j++;
    }
    else if (isAllowedSymbol(char)) {
      acc += char;
    }

  }

  return acc;
}

export const getNumbers = (str: string) => {
  return str.replaceAll(/\D/g, "");
}