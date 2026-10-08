import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DiaryCard({ title, date, preview, moodSource, moodType }) {
  // Menentukan variasi tampilan/style berdasarkan tipe mood
  let moodStyle = styles.borderDefault;
  if (moodType === 'happy') moodStyle = styles.borderHappy;
  if (moodType === 'focus') moodStyle = styles.borderFocus;
  if (moodType === 'calm') moodStyle = styles.borderCalm;
  if (moodType === 'sad') moodStyle = styles.borderSad;
  if (moodType === 'excited') moodStyle = styles.borderExcited;

  return (
    <View style={[styles.card, moodStyle]}>
      {/* Menggunakan penanganan fleksibel untuk gambar lokal (object/number) maupun remote (string) */}
      <Image 
        source={typeof moodSource === 'string' ? { uri: moodSource } : moodSource} 
        style={styles.mood} 
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
        <Text
          style={styles.preview}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderWidth: 2, // Diubah ke 2 agar garis variasi warna terlihat tegas
    borderRadius: 12,
    marginBottom: 12,
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    color: '#4b5563',
  },
  // Variasi warna border dan latar belakang berdasarkan mood
  borderDefault: {
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  borderHappy: {
    borderColor: '#fbbf24', 
    backgroundColor: '#fffbeb',
  },
  borderFocus: {
    borderColor: '#3b82f6', 
    backgroundColor: '#eff6ff',
  },
  borderCalm: {
    borderColor: '#10b981', 
    backgroundColor: '#ecfdf5',
  },
  borderSad: {
    borderColor: '#9ca3af', 
    backgroundColor: '#f9fafb',
  },
  borderExcited: {
    borderColor: '#ec4899', 
    backgroundColor: '#fdf2f8',
  },
});
