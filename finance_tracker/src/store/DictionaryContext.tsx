import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SEARCH_HISTORY_LIMIT, SEARCH_RATE_LIMIT_MS } from '../constants/dictionary';
import { fetchWordDefinition } from '../services/dictionary.service';
import { loadSearchHistory, saveSearchHistory } from '../services/history.service';
import { DictionaryEntry, DictionaryError } from '../types/dictionary.types';
import { sanitizeSearchTerm, validateSearchTerm } from '../utils/searchValidation';

interface DictionaryContextValue {
  currentEntry: DictionaryEntry | null;
  error: DictionaryError | null;
  history: string[];
  isLoading: boolean;
  lastSearchTerm: string;
  retryLastSearch: () => Promise<void>;
  searchWord: (word: string) => Promise<void>;
}

const DictionaryContext = createContext<DictionaryContextValue | undefined>(undefined);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [currentEntry, setCurrentEntry] = useState<DictionaryEntry | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<DictionaryError | null>(null);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const lastRequestAtRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    async function hydrateHistory() {
      const storedHistory = await loadSearchHistory();

      if (isMounted) {
        setHistory(storedHistory);
      }
    }

    hydrateHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  async function searchWord(word: string) {
    const validationError = validateSearchTerm(word);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (isLoading) {
      return;
    }

    const now = Date.now();

    if (now - lastRequestAtRef.current < SEARCH_RATE_LIMIT_MS) {
      setError({
        type: 'validation',
        message: 'Please wait a moment before searching again.',
      });
      return;
    }

    const normalizedWord = sanitizeSearchTerm(word);
    lastRequestAtRef.current = now;
    setLastSearchTerm(normalizedWord);
    setIsLoading(true);
    setError(null);

    try {
      const entry = await fetchWordDefinition(normalizedWord);
      setCurrentEntry(entry);
      setHistory((previousHistory) => {
        const nextHistory = [
          entry.word,
          ...previousHistory.filter(
            (historyWord) => historyWord.toLowerCase() !== entry.word.toLowerCase()
          ),
        ].slice(0, SEARCH_HISTORY_LIMIT);

        saveSearchHistory(nextHistory);

        return nextHistory;
      });
    } catch (searchError) {
      const dictionaryError = searchError as DictionaryError;
      setError({
        type: dictionaryError.type || 'unknown',
        message: dictionaryError.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function retryLastSearch() {
    if (lastSearchTerm) {
      lastRequestAtRef.current = 0;
      await searchWord(lastSearchTerm);
    }
  }

  const value = useMemo(
    () => ({
      currentEntry,
      error,
      history,
      isLoading,
      lastSearchTerm,
      retryLastSearch,
      searchWord,
    }),
    [currentEntry, error, history, isLoading, lastSearchTerm]
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error('useDictionary must be used inside DictionaryProvider');
  }

  return context;
}
