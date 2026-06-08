import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEARCH_HISTORY_LIMIT } from '../constants/dictionary';

const SEARCH_HISTORY_KEY = 'lexi_dictionary.search_history';

export async function loadSearchHistory(): Promise<string[]> {
  try {
    const storedHistory = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);

    if (!storedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(storedHistory);

    if (!Array.isArray(parsedHistory)) {
      return [];
    }

    return parsedHistory
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .slice(0, SEARCH_HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export async function saveSearchHistory(history: string[]) {
  try {
    await AsyncStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(history.slice(0, SEARCH_HISTORY_LIMIT))
    );
  } catch {
    // Search history is helpful, but failing to persist it should not block dictionary search.
  }
}
