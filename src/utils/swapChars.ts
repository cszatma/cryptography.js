export default (str: string, firstChar: string, secondChar: string): string =>
  str
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
