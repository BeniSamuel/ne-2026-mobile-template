import axios from 'axios';
import { DictionaryEntry, DictionaryError } from '../types/dictionary.types';
import { normalizeDictionaryResponse } from '../utils/dictionary.parsers';

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function fetchWordDefinition(word: string): Promise<DictionaryEntry> {
  try {
    const safeWord = encodeURIComponent(word.trim().toLowerCase());
    const response = await axios.get(`${API_BASE_URL}/${safeWord}`, {
      timeout: 12000,
    });

    return normalizeDictionaryResponse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw {
          type: 'not-found',
          message: `No dictionary entry was found for "${word.trim()}".`,
        } satisfies DictionaryError;
      }

      if (!error.response) {
        throw {
          type: 'network',
          message: 'Network request failed. Check your connection and try again.',
        } satisfies DictionaryError;
      }
    }

    throw {
      type: 'unknown',
      message: 'The dictionary data could not be loaded. Please try another word.',
    } satisfies DictionaryError;
  }
}
