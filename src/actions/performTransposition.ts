import Random from '../utils/Random';
import { generateGrid, gridToString } from '../utils/grid';

export default (text: string, hash: number, command: Command): string => {
  if (command !== 'encrypt' && command !== 'decrypt') {
    throw new Error('command must be either `encrypt` or `decrypt`');
  }

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

  return gridToString(generateGrid(fixedText), numbers, command);
};
