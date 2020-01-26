export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';

export function removeSpecialChars(str: string): string {
  return str
    .split('')
    .map(char => (alphabet.indexOf(char) === -1 ? ' ' : char))
    .join('');
}

export function swapChars(str: string, firstChar: string, secondChar: string): string {
  return str
    .split('')
    .map(char => {
      if (char === firstChar) {
        return secondChar;
      } else if (char === secondChar) {
        return firstChar;
      }

      return char;
    })
    .join('');
}

export function replaceCharAt(index: number, str: string, replacement: string): string {
  return (
    str.substr(0, index) +
    replacement +
    str.substr(index + replacement.length)
  );
}


export function removeCharAt(index: number, str: string) {
  return str.slice(0, index) + str.slice(index + 1);
}

export function hashCode(str: string) {
  let hash = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};
