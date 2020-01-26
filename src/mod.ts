import { Action, encrypt, decrypt } from './actions/mod.ts';

function processInput(command: string, key: string, input: string): string {
  let commandFn: (key: string, input: string, isLastLine: boolean) => string;

  if (command === Action.encrypt) {
    commandFn = encrypt;
  } else if (command === Action.decrypt) {
    commandFn = decrypt;
  } else {
    throw new Error(`Unknown command '${command}'`)
  }

  const inputLines = input.toUpperCase().match(/.{1,64}/g)!;
  return inputLines
    .map((line, index) => commandFn(key, line, index === inputLines.length - 1))
    .join('\n');
}

export {
  processInput,
  encrypt,
  decrypt,
};
