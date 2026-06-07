import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  highlighted?: boolean;
}

export function DashboardCard({ title, value, icon, highlighted = false }: DashboardCardProps) {
  return (
    <View style={[commonStyles.card, styles.card, highlighted && styles.highlighted]}>
      <View style={[styles.iconBox, highlighted && styles.highlightedIcon]}>
        <Ionicons name={icon} size={20} color={highlighted ? colors.surface : colors.primary} />
      </View>
      <Text style={[styles.title, highlighted && styles.highlightedText]}>{title}</Text>
      <Text style={[styles.value, highlighted && styles.highlightedText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 126,
  },
  highlighted: {
    backgroundColor: colors.primary,
  },
  iconBox: {
    alignItems: 'center',
    backgroundColor: colors.chip,
    borderRadius: 12,
    height: 38,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 38,
  },
  highlightedIcon: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  title: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  highlightedText: {
    color: colors.surface,
  },
});
