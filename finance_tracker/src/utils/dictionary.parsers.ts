import { DictionaryApiEntry, DictionaryEntry } from '../types/dictionary.types';

export function normalizeDictionaryResponse(payload: unknown): DictionaryEntry {
  if (!Array.isArray(payload) || payload.length === 0) {
    throw new Error('Malformed dictionary response');
  }

  const firstEntry = payload[0] as DictionaryApiEntry;
  const word = firstEntry.word?.trim();

  if (!word) {
    throw new Error('Dictionary response did not include a word');
  }

  const phonetics = (firstEntry.phonetics ?? [])
    .filter((phonetic) => phonetic.text || phonetic.audio)
    .map((phonetic) => ({
      text: phonetic.text,
      audio: phonetic.audio,
    }));

  const meanings = (firstEntry.meanings ?? [])
    .map((meaning) => ({
      partOfSpeech: meaning.partOfSpeech || 'Meaning',
      definitions: (meaning.definitions ?? [])
        .filter((definition) => definition.definition)
        .map((definition) => ({
          definition: definition.definition || '',
          example: definition.example,
        })),
    }))
    .filter((meaning) => meaning.definitions.length > 0);

  if (meanings.length === 0) {
    throw new Error('Dictionary response did not include definitions');
  }

  return {
    word,
    phonetic: firstEntry.phonetic || phonetics.find((phonetic) => phonetic.text)?.text,
    phonetics,
    meanings,
  };
}

export function getAudioUrls(entry: DictionaryEntry | null): string[] {
  if (!entry) {
    return [];
  }

  return Array.from(
    new Set(
      entry.phonetics
        .map((phonetic) => phonetic.audio?.trim())
        .filter((audio): audio is string => Boolean(audio))
    )
  );
}
