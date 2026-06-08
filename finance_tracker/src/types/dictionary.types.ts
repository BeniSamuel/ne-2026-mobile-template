export interface DictionaryDefinition {
  definition: string;
  example?: string;
}

export interface DictionaryMeaning {
  partOfSpeech: string;
  definitions: DictionaryDefinition[];
}

export interface DictionaryPhonetic {
  text?: string;
  audio?: string;
}

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: DictionaryPhonetic[];
  meanings: DictionaryMeaning[];
}

export interface DictionaryApiDefinition {
  definition?: string;
  example?: string;
}

export interface DictionaryApiMeaning {
  partOfSpeech?: string;
  definitions?: DictionaryApiDefinition[];
}

export interface DictionaryApiPhonetic {
  text?: string;
  audio?: string;
}

export interface DictionaryApiEntry {
  word?: string;
  phonetic?: string;
  phonetics?: DictionaryApiPhonetic[];
  meanings?: DictionaryApiMeaning[];
}

export type DictionaryErrorType = 'validation' | 'not-found' | 'network' | 'unknown';

export interface DictionaryError {
  type: DictionaryErrorType;
  message: string;
}
