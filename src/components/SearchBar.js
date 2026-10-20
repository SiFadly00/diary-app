import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS, RADIUS, SIZE, SPACE } from '../styles/tokens';

export default function SearchBar({ placeholder = 'Cari entri...', onChange }) {
  const [queryText, setQueryText] = useState('');

  const handleChange = (text) => {
    setQueryText(text);
    onChange(text);
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        value={queryText}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        returnKeyType="search"
        style={styles.input}
        accessibilityLabel="Kolom pencarian diary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.m,
  },
  input: {
    minHeight: SIZE.touchTarget,
    borderWidth: SIZE.cardBorderWidth,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
  },
});
