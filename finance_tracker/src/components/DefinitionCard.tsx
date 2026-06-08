import { StyleSheet, Text, View } from 'react-native';
import { DictionaryMeaning } from '../types/dictionary.types';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { spacing } from '../theme/spacing';

export function DefinitionCard({ meaning }: { meaning: DictionaryMeaning }) {
  return (
    <View style={styles.card}>
      <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>

      {meaning.definitions.map((definition, index) => (
        <View key={`${meaning.partOfSpeech}-${index}`} style={styles.definitionRow}>
          <Text style={styles.index}>{index + 1}</Text>
          <View style={styles.definitionBody}>
            <Text style={styles.definition}>{definition.definition}</Text>
            {definition.example ? <Text style={styles.example}>"{definition.example}"</Text> : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.md,
  },
  partOfSpeech: {
    color: colors.primary,
    fontFamily: fonts.extraBold,
    fontSize: 17,
    textTransform: 'capitalize',
  },
  definitionRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  index: {
    backgroundColor: colors.chip,
    borderRadius: 10,
    color: colors.primary,
    fontFamily: fonts.extraBold,
    fontSize: 12,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  definitionBody: {
    flex: 1,
    gap: spacing.xs,
  },
  definition: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  example: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
