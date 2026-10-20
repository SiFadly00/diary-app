import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  COLORS,
  SPACE,
  RADIUS,
  SIZE,
  TYPO,
  INTERACTION,
} from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;

  const { title, date, body, moodImage } = entry;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        accessibilityViewIsModal
      >
        <Image
          source={moodImage}
          style={styles.hero}
          accessibilityLabel={`Ilustrasi diary ${title}`}
        />

        <View style={styles.content}>
          <Text style={styles.title} accessibilityRole="header">{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.body}>{body}</Text>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            accessibilityRole="button"
            accessibilityLabel="Tutup detail diary"
          >
            <Text style={styles.buttonText}>Tutup</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  contentContainer: {
    flexGrow: 1,
  },
  hero: {
    width: '100%',
    aspectRatio: SIZE.heroAspectRatio,
    backgroundColor: COLORS.imageBackground,
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: {
    flex: 1,
    padding: SPACE.xl,
    gap: SPACE.s,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  body: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: TYPO.bodyLineHeight,
  },
  button: {
    minHeight: SIZE.touchTarget,
    marginTop: SPACE.l,
    paddingHorizontal: SPACE.l,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: INTERACTION.pressedOpacity,
  },
  buttonText: {
    color: COLORS.onAccent,
    fontWeight: '700',
  },
});
