import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDictionary } from '../store/DictionaryContext';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { spacing } from '../theme/spacing';

export function DictionaryDrawerContent(props: DrawerContentComponentProps) {
  const { history, searchWord } = useDictionary();

  async function handleHistoryPress(word: string) {
    props.navigation.closeDrawer();
    await searchWord(word);
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="library-outline" color={colors.primary} size={24} />
        </View>
        <Text style={styles.title}>Search History</Text>
        <Text style={styles.subtitle}>Tap a previous word to search it again.</Text>
      </View>

      <View style={styles.list}>
        {history.length === 0 ? (
          <Text style={styles.empty}>No searches yet.</Text>
        ) : (
          history.map((word) => (
            <Pressable
              accessibilityLabel={`Search ${word} from history`}
              accessibilityRole="button"
              key={word}
              onPress={() => handleHistoryPress(word)}
              style={styles.item}
            >
              <Ionicons name="time-outline" color={colors.muted} size={18} />
              <Text style={styles.itemText}>{word}</Text>
            </Pressable>
          ))
        )}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.md,
  },
  header: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.md,
  },
  logo: {
    alignItems: 'center',
    backgroundColor: colors.chip,
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    width: 44,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 20,
  },
  subtitle: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  list: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  empty: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 46,
    paddingHorizontal: spacing.md,
  },
  itemText: {
    color: colors.text,
    flex: 1,
    fontFamily: fonts.extraBold,
    fontSize: 15,
  },
});
