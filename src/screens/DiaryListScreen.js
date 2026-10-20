import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';

import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi dan menikmati udara segar.',
    body:
      'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit. Udara terasa sejuk dan suasana pagi sangat tenang.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum bersama tim.',
    body:
      'Hari ini cukup produktif. Saya menyelesaikan modul praktikum dan berdiskusi dengan tim mengenai pengembangan aplikasi.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body:
      'Sore ini saya menikmati waktu di taman sambil membaca buku. Suasana senja terasa tenang dan menyenangkan.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: 4,
    title: 'Resep Baru',
    date: '2025-10-03',
    preview: 'Mencoba memasak sup sayur untuk makan malam.',
    body:
      'Aku mencoba resep sup sayur baru malam ini. Rasanya lebih enak dari perkiraan, dan memasak membuatku rileks setelah hari yang sibuk.',
    moodUri: 'https://picsum.photos/seed/cooking/200',
    heroUri: 'https://picsum.photos/seed/cookinghero/800/450',
  },
  {
    id: 5,
    title: 'Waktu Bersama Keluarga',
    date: '2025-10-02',
    preview: 'Makan malam dan berbagi cerita bersama keluarga.',
    body:
      'Kami makan malam bersama dan saling bercerita tentang kegiatan hari ini. Momen sederhana seperti ini membuatku merasa bersyukur.',
    moodUri: 'https://picsum.photos/seed/family/200',
    heroUri: 'https://picsum.photos/seed/familyhero/800/450',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.itemWrap}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header} accessibilityRole="header">
        Buku Harian
      </Text>

      <FlatList
        key={twoCols ? 'two-columns' : 'one-column'}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        accessibilityLabel="Daftar entri buku harian"
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />

      <DiaryDetailModal
        visible={Boolean(selected)}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  listContent: {
    padding: SPACE.l,
    paddingTop: SPACE.m,
    gap: SPACE.m,
    flexGrow: 1,
  },
  columnWrapper: {
    gap: SPACE.m,
  },
  itemWrap: {
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: SPACE.xxl,
  },
});