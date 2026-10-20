import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, SIZE, TYPO, INTERACTION } from '../styles/tokens';

export default function DiaryCard({ title, date, preview, moodUri, onPress, variant = 'list' }) {
  const isGrid = variant === 'grid';

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: COLORS.ripple }}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      accessible={Boolean(onPress)}
      accessibilityRole="button"
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
      accessibilityHint="Ketuk dua kali untuk membuka detail diary"
    >
      <View style={[styles.card, isGrid && styles.cardGrid]}>
        <Image
          source={{ uri: moodUri }}
          style={[styles.mood, isGrid && styles.moodGrid]}
          accessibilityLabel={`Ilustrasi mood untuk ${title}`}
        />

        <View style={[styles.content, isGrid && styles.contentGrid]}>
          <Text style={[styles.title, isGrid && styles.centered]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.date, isGrid && styles.centered]}>{date}</Text>
          <Text
            style={[styles.preview, isGrid && styles.centered]}
            numberOfLines={isGrid ? 2 : 3}
            ellipsizeMode="tail"
          >
            {preview}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    borderRadius: RADIUS.card,
  },
  pressed: {
    opacity: INTERACTION.pressedOpacity,
  },
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: SIZE.cardBorderWidth,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  cardGrid: {
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: SIZE.gridCardMinHeight,
  },
  mood: {
    width: SIZE.moodImage,
    height: SIZE.moodImage,
    borderRadius: RADIUS.avatar,
    backgroundColor: COLORS.imageBackground,
  },
  moodGrid: {
    marginBottom: SPACE.s,
  },
  content: {
    flex: 1,
  },
  contentGrid: {
    alignItems: 'center',
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: SPACE.xs,
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  centered: {
    textAlign: 'center',
  },
});
