import { DictionaryError } from '../types/dictionary.types';

const WORD_PATTERN = /^[a-zA-Z][a-zA-Z\s'-]*$/;

export function sanitizeSearchTerm(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function validateSearchTerm(value: string): DictionaryError | null {
  const word = sanitizeSearchTerm(value);

  if (!word) {
    return {
      type: 'validation',
      message: 'Enter a word before searching.',
    };
  }

  if (word.length > 48) {
    return {
      type: 'validation',
      message: 'Search words must be 48 characters or fewer.',
    };
  }

  if (!WORD_PATTERN.test(word)) {
    return {
      type: 'validation',
      message: 'Use English letters, spaces, apostrophes, or hyphens only.',
    };
  }

  return null;
}
