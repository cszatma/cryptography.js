import Random from "../utils/random.ts";
import { generateGrid, gridToString } from "../utils/grid.ts";
import {
  alphabet,
  hashCode,
  removeCharAt,
  removeSpecialChars,
  swapChars
} from "../utils/chars.ts";

export const enum Action {
  encrypt = "encrypt",
  decrypt = "decrypt"
}

function performSubstitution(
  text: string,
  hash: number,
  action: Action,
  isLastLine: boolean
): string {
  const randomGenerator = new Random(hash);
  const firstNumbers: number[] = [];
  const secondNumbers: number[] = [];

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

    if (action === "encrypt") {
      modifiedText = swapChars(modifiedText, firstChar, secondChar);
    }
  }

  if (action === "decrypt") {
    if (isLastLine) {
      for (let i = modifiedText.length - 1; i >= 0; i--) {
        if (modifiedText.charAt(i) === " ") {
          modifiedText = removeCharAt(i, modifiedText);
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

  return modifiedText;
}

function performTransposition(
  text: string,
  hash: number,
  action: Action
): string {
  const randomGenerator = new Random(hash);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];

  for (let i = 0; i < 100; i++) {
    const firstRandom = randomGenerator.int32(8);
    const secondRandom = randomGenerator.int32(8);
    const firstNum = numbers[firstRandom];
    numbers[firstRandom] = numbers[secondRandom];
    numbers[secondRandom] = firstNum;
  }

  const fixedText = text.length < 64 ? text.padEnd(64) : text;

  return gridToString(generateGrid(fixedText), numbers, action);
}

export function decrypt(
  key: string,
  input: string,
  isLastLine: boolean
): string {
  const hash = hashCode(key);

  return performSubstitution(
    performTransposition(input, hash, Action.decrypt),
    hash,
    Action.decrypt,
    isLastLine
  );
}

export function encrypt(
  key: string,
  input: string,
  isLastLine: boolean
): string {
  const hash = hashCode(key);
  const cleanInput = removeSpecialChars(input);

  return performTransposition(
    performSubstitution(cleanInput, hash, Action.encrypt, isLastLine),
    hash,
    Action.encrypt
  );
}
