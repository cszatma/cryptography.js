import removeSpecialChars from '../utils/removeSpecialChars';
import performSubstitution from './performSubstitution';
import performTransposition from './performTransposition';

export default (key: string, input: string, isLastLine: boolean): string => {
  const hash = key.hashCode();
  const cleanInput = removeSpecialChars(input);

  return performTransposition(
    performSubstitution(cleanInput, hash, 'encrypt', isLastLine),
    hash,
    'encrypt',
  );
};
