import encrypt from './actions/encrypt';
import decrypt from './actions/decrypt';

export default (command: string, key: string, input: string): string => {
  let commandFn: (key: string, input: string, isLastLine: boolean) => string;

  if (command === 'encrypt') {
    commandFn = encrypt;
  } else if (command === 'decrypt') {
    commandFn = decrypt;
  } else {
    console.log(`Error: Unknown command '${command}'`);
    process.exit(1);
  }

  const inputLines = input.toUpperCase().match(/.{1,64}/g)!;

  return inputLines
    .map((line, index) => commandFn(key, line, index === inputLines.length - 1))
    .join('\n');
};
