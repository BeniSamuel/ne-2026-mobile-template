import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { DefinitionCard } from '../components/DefinitionCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PronunciationButton } from '../components/PronunciationButton';
import { useDictionary } from '../store/DictionaryContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { spacing } from '../theme/spacing';
import { getAudioUrls } from '../utils/dictionary.parsers';

export function DictionaryScreen() {
  const { currentEntry, error, history, isLoading, lastSearchTerm, retryLastSearch, searchWord } =
    useDictionary();
  const [searchValue, setSearchValue] = useState('');
  const audioUrls = getAudioUrls(currentEntry);

  async function handleSearch() {
    Keyboard.dismiss();
    await searchWord(searchValue);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="book-outline" color={colors.primary} size={26} />
          </View>
          <Text style={styles.title}>Lexi Dictionary</Text>
          <Text style={styles.subtitle}>Search English words, definitions, examples, and audio.</Text>
        </View>

        <View style={styles.searchPanel}>
          <Text style={styles.inputLabel}>Word</Text>
          <TextInput
            accessibilityLabel="Dictionary word search input"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setSearchValue}
            onSubmitEditing={handleSearch}
            placeholder="Enter a word"
            placeholderTextColor={colors.muted}
            returnKeyType="search"
            style={styles.input}
            value={searchValue}
          />
          <CustomButton
            accessibilityLabel="Search dictionary"
            title="Search"
            loading={isLoading}
            onPress={handleSearch}
          />
        </View>

        {history.length > 0 ? (
          <View style={styles.recentPanel}>
            <Text style={styles.recentTitle}>Recent searches</Text>
            <View style={styles.recentList}>
              {history.slice(0, 5).map((word) => (
                <Pressable
                  accessibilityLabel={`Search ${word} again`}
                  accessibilityRole="button"
                  key={word}
                  onPress={() => searchWord(word)}
                  style={styles.recentChip}
                >
                  <Text style={styles.recentChipText}>{word}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {error ? (
          <View style={styles.feedback}>
            <Ionicons name="alert-circle-outline" color={colors.danger} size={20} />
            <Text style={styles.feedbackText}>{error.message}</Text>
            {lastSearchTerm && error.type !== 'validation' ? (
              <Pressable
                accessibilityLabel="Retry last dictionary search"
                accessibilityRole="button"
                onPress={retryLastSearch}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {isLoading ? <LoadingSpinner message="Searching dictionary..." /> : null}

        {!isLoading && !currentEntry && !error ? (
          <EmptyState
            icon="search-outline"
            title="No word selected"
            message="Type a word above to view its meanings and pronunciation."
          />
        ) : null}

        {!isLoading && currentEntry ? (
          <View style={styles.result}>
            <View style={styles.wordHeader}>
              <View style={styles.wordTextWrap}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.word}>
                  {currentEntry.word}
                </Text>
                {currentEntry.phonetic ? (
                  <Text style={styles.phonetic}>{currentEntry.phonetic}</Text>
                ) : null}
              </View>
            </View>

            {audioUrls.length > 0 ? (
              <View style={styles.audioList}>
                {audioUrls.map((audioUrl, index) => (
                  <PronunciationButton
                    key={audioUrl}
                    audioUrl={audioUrl}
                    label={audioUrls.length > 1 ? `Audio ${index + 1}` : 'Pronounce'}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.noAudio}>No pronunciation audio is available for this word.</Text>
            )}

            <View style={styles.meaningList}>
              {currentEntry.meanings.map((meaning, index) => (
                <DefinitionCard key={`${meaning.partOfSpeech}-${index}`} meaning={meaning} />
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  heroIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 28,
  },
  subtitle: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 21,
  },
  searchPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  inputLabel: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 13,
  },
  input: {
    backgroundColor: colors.chip,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  feedback: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF3F3',
    borderColor: '#FFD4D4',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.md,
  },
  feedbackText: {
    color: colors.danger,
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    minWidth: 190,
  },
  retryButton: {
    backgroundColor: colors.surface,
    borderColor: '#FFD4D4',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  retryText: {
    color: colors.danger,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  recentPanel: {
    gap: spacing.sm,
  },
  recentTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  recentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  recentChip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
  },
  recentChipText: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  result: {
    gap: spacing.md,
  },
  wordHeader: {
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  wordTextWrap: {
    flex: 1,
  },
  word: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 34,
  },
  phonetic: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 17,
    marginTop: spacing.xs,
  },
  audioList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  noAudio: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  meaningList: {
    gap: spacing.md,
  },
});
