import performSubstitution from './performSubstitution';
import performTransposition from './performTransposition';

export default (key: string, input: string, isLastLine: boolean): string => {
  const hash = key.hashCode();

  return performSubstitution(
    performTransposition(input, hash, 'decrypt'),
    hash,
    'decrypt',
    isLastLine,
  );
};
