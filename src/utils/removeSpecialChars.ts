import { alphabet } from './alphabet';

export default (str: string): string =>
  str
    .split('')
    .map(char => (alphabet.indexOf(char) === -1 ? ' ' : char))
    .join('');
