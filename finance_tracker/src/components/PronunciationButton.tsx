import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { spacing } from '../theme/spacing';

interface PronunciationButtonProps {
  audioUrl: string;
  label: string;
}

export function PronunciationButton({ audioUrl, label }: PronunciationButtonProps) {
  const player = useAudioPlayer({ uri: audioUrl }, { updateInterval: 1000 });
  const [error, setError] = useState('');

  async function handlePlay() {
    setError('');

    try {
      await player.seekTo(0);
      player.play();
    } catch {
      setError('Audio failed');
    }
  }

  return (
    <>
      <Pressable
        accessibilityLabel={`Play ${label.toLowerCase()} pronunciation`}
        accessibilityRole="button"
        onPress={handlePlay}
        style={styles.button}
      >
        <Ionicons name="volume-high-outline" color={colors.primary} size={18} />
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.chip,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    minHeight: 38,
    paddingHorizontal: spacing.sm,
  },
  label: {
    color: colors.primary,
    fontFamily: fonts.extraBold,
    fontSize: 13,
  },
  error: {
    color: colors.danger,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
