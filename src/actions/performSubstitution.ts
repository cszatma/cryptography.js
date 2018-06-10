import { alphabet } from '../utils/alphabet';
import Random from '../utils/Random';
import swapChars from '../utils/swapChars';

export default (
  text: string,
  hash: number,
  command: Command,
  isLastLine: boolean,
): string => {
  const randomGenerator = new Random(hash);
  const firstNumbers: number[] = [];
  const secondNumbers: number[] = [];
  console.log(alphabet.length);
  // Gets all the necessary numbers for the substitution
  for (let i = 0; i < 100; i++) {
    firstNumbers[i] = randomGenerator.int32(27);
    secondNumbers[i] = randomGenerator.int32(27);
  }

  let modifiedAlphabet = alphabet;
  let modifiedText = text;

  // TODO fix
  for (let i = 0; i < 100; i++) {
    const firstChar = modifiedAlphabet.charAt(firstNumbers[i]);
    const secondChar = modifiedAlphabet.charAt(secondNumbers[i]);
    modifiedAlphabet = swapChars(modifiedAlphabet, firstChar, secondChar);
    // console.log(modifiedAlphabet);

    if (command === 'encrypt') {
      modifiedText = swapChars(modifiedText, firstChar, secondChar);
    }
  }

  console.log(modifiedAlphabet);
  console.log(modifiedText);

  if (command === 'decrypt') {
    if (isLastLine) {
      for (let i = modifiedText.length - 1; i >= 0; i--) {
        if (modifiedText.charAt(i) === ' ') {
          modifiedText = modifiedText.removeCharAt(i);
        } else {
          break;
        }
      }
    }

    for (let i = 99; i >= 0; i--) {
      const firstChar = modifiedAlphabet.charAt(firstNumbers[i]);
      const secondChar = modifiedAlphabet.charAt(secondNumbers[i]);
      modifiedAlphabet = swapChars(modifiedAlphabet, firstChar, secondChar);
      modifiedText = swapChars(modifiedText, firstChar, secondChar);
    }
  }

  console.log(modifiedText);

  return modifiedText;
};
