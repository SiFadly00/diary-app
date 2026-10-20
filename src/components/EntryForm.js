import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, INTERACTION, RADIUS, SIZE, SPACE, TYPO } from '../styles/tokens';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(getTodayDate);
  const [preview, setPreview] = useState('');
  const canSubmit = title.trim().length > 0 && preview.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;

    onSubmit({
      title: title.trim(),
      date: date.trim() || getTodayDate(),
      preview: preview.trim(),
      body: preview.trim(),
      moodImage: require('../../assets/moods/happy.png'),
    });

    setTitle('');
    setDate(getTodayDate());
    setPreview('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading} accessibilityRole="header">
        Tambah Entri
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        accessibilityLabel="Judul entri baru"
        returnKeyType="next"
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        accessibilityLabel="Tanggal entri baru"
        maxLength={10}
      />

      <TextInput
        value={preview}
        onChangeText={setPreview}
        placeholder="Ringkasan..."
        placeholderTextColor={COLORS.muted}
        style={[styles.input, styles.multiline]}
        accessibilityLabel="Ringkasan entri baru"
        multiline
        textAlignVertical="top"
      />

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        style={({ pressed }) => [
          styles.button,
          !canSubmit && styles.buttonDisabled,
          pressed && canSubmit && styles.buttonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Simpan entri baru"
        accessibilityState={{ disabled: !canSubmit }}
      >
        <Text style={styles.buttonText}>Simpan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.s,
    gap: SPACE.s,
  },
  heading: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  input: {
    minHeight: SIZE.touchTarget,
    borderWidth: SIZE.cardBorderWidth,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
  },
  multiline: {
    minHeight: SIZE.gridCardMinHeight / 2,
    paddingTop: SPACE.m,
  },
  button: {
    minHeight: SIZE.touchTarget,
    marginTop: SPACE.xs,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  buttonPressed: {
    opacity: INTERACTION.pressedOpacity,
  },
  buttonText: {
    color: COLORS.onAccent,
    fontWeight: '700',
  },
});
