import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import {
  COLORS,
  SPACE,
  RADIUS,
  SIZE,
  TYPO,
  INTERACTION,
} from '../styles/tokens';

export default function DiaryCard({
  title,
  date,
  preview,
  moodImage,
  liked = false,
  onPress = () => {},
  onToggleLike = () => {},
  variant = 'list',
}) {
  const isGrid = variant === 'grid';

  return (
    <View style={[styles.card, isGrid && styles.cardGrid]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: COLORS.ripple }}
        style={({ pressed }) => [
          styles.entry,
          isGrid && styles.entryGrid,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Entri ${title} tanggal ${date}`}
        accessibilityHint="Ketuk dua kali untuk membuka detail diary"
      >
        <Image
          source={moodImage}
          style={[styles.mood, isGrid && styles.moodGrid]}
          accessibilityLabel={`Ilustrasi mood untuk ${title}`}
        />

        <View style={[styles.content, isGrid && styles.contentGrid]}>
          <Text
            style={[styles.title, isGrid && styles.centered]}
            numberOfLines={1}
          >
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
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        hitSlop={4}
        style={({ pressed }) => [
          styles.likeButton,
          isGrid && styles.likeButtonGrid,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={liked ? `Batal suka ${title}` : `Suka ${title}`}
        accessibilityState={{ selected: liked }}
      >
        <Text style={[styles.like, liked && styles.liked]}>
          {liked ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: RADIUS.card,
    borderWidth: SIZE.cardBorderWidth,
    borderColor: COLORS.border,
    padding: SPACE.m,
    gap: SPACE.s,
    backgroundColor: COLORS.surface,
  },
  pressed: {
    opacity: INTERACTION.pressedOpacity,
  },
  cardGrid: {
    flexDirection: 'column',
    alignItems: 'stretch',
    minHeight: SIZE.gridCardMinHeight,
  },
  entry: {
    flexDirection: 'row',
    gap: SPACE.m,
    flex: 1,
    alignItems: 'center',
  },
  entryGrid: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  content: {
    flex: 1,
  },
  contentGrid: {
    alignItems: 'center',
  },
  likeButton: {
    minWidth: SIZE.touchTarget,
    minHeight: SIZE.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButtonGrid: {
    alignSelf: 'flex-end',
    minHeight: SIZE.touchTarget,
  },
  like: {
    fontSize: TYPO.h1,
    color: COLORS.muted,
  },
  liked: {
    color: COLORS.like,
  },
  mood: {
    width: SIZE.moodImage,
    height: SIZE.moodImage,
    borderRadius: RADIUS.avatar,
    backgroundColor: COLORS.imageBackground,
  },
  moodGrid: {
    alignSelf: 'center',
    marginBottom: SPACE.s,
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
