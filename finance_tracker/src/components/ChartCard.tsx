import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { spacing } from '../theme/spacing';

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <View style={[commonStyles.card, styles.card]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  body: {
    marginTop: spacing.md,
  },
});
