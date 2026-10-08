import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import DiaryCard from '../components/DiaryCard';

// 1. Memuat Gambar Lokal dari folder assets/moods/
import happyLocal from '../../assets/moods/happy.png';

// 2. Data array dengan total minimal 5 entri diary
const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    moodSource: happyLocal, // Menggunakan gambar lokal
    moodType: 'happy',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    moodSource: 'https://www.shutterstock.com/image-vector/educational-emotions-infographic-kids-features-260nw-2757528317.jpg',
    moodType: 'focus',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    moodSource: 'https://www.shutterstock.com/image-vector/educational-emotions-infographic-kids-features-260nw-2757528317.jpg',
    moodType: 'calm',
  },
  {
    id: 4,
    title: 'Menghadapi Error Koding',
    date: '2025-10-03',
    preview: 'Mencoba memperbaiki bug di React Native selama 2 jam. Cukup melelahkan tapi akhirnya teratasi setelah dibantu dokumentasi...',
    moodSource: 'https://www.shutterstock.com/image-vector/educational-emotions-infographic-kids-features-260nw-2757528317.jpg',
    moodType: 'sad',
  },
  {
    id: 5,
    title: 'Mendapat Kabar Baik!',
    date: '2025-10-02',
    preview: 'Proposal proyek mandiri disetujui dosen pembimbing laboratorium. Sangat bersemangat melanjutkan pengembangannya!',
    moodSource: 'https://www.shutterstock.com/image-vector/educational-emotions-infographic-kids-features-260nw-2757528317.jpg',
    moodType: 'excited',
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 3. Menambahkan komponen Avatar Pengguna di samping Judul Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Buku Harian</Text>
        <Image 
          source={{ uri: 'https://pravatar.cc' }} // Menggunakan random placeholder avatar
          style={styles.avatar}
        />
      </View>

      {/* 4. Perulangan untuk me-render daftar kartu diary */}
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodSource={entry.moodSource}
          moodType={entry.moodType}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
  },
});
