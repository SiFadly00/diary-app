import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';

import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import EntryForm from '../components/EntryForm';
import SearchBar from '../components/SearchBar';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi dan menikmati udara segar.',
    body:
      'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit. Udara terasa sejuk dan suasana pagi sangat tenang.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum bersama tim.',
    body:
      'Hari ini cukup produktif. Saya menyelesaikan modul praktikum dan berdiskusi dengan tim mengenai pengembangan aplikasi.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body:
      'Sore ini saya menikmati waktu di taman sambil membaca buku. Suasana senja terasa tenang dan menyenangkan.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 4,
    title: 'Resep Baru',
    date: '2025-10-03',
    preview: 'Mencoba memasak sup sayur untuk makan malam.',
    body:
      'Aku mencoba resep sup sayur baru malam ini. Rasanya lebih enak dari perkiraan, dan memasak membuatku rileks setelah hari yang sibuk.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 5,
    title: 'Waktu Bersama Keluarga',
    date: '2025-10-02',
    preview: 'Makan malam dan berbagi cerita bersama keluarga.',
    body:
      'Kami makan malam bersama dan saling bercerita tentang kegiatan hari ini. Momen sederhana seperti ini membuatku merasa bersyukur.',
    moodImage: require('../../assets/moods/happy.png'),
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const nextEntryId = useRef(INITIAL_ENTRIES.length + 1);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return entries;

    return entries.filter((entry) =>
      [entry.title, entry.date, entry.preview]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [entries, query]);

  const toggleLike = (id) => {
    setLikedIds((previousIds) => {
      const nextIds = new Set(previousIds);
      if (nextIds.has(id)) {
        nextIds.delete(id);
      } else {
        nextIds.add(id);
      }
      return nextIds;
    });
  };

  const addEntry = (entry) => {
    const newEntry = { ...entry, id: nextEntryId.current };
    nextEntryId.current += 1;
    setEntries((currentEntries) => [newEntry, ...currentEntries]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemWrap}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodImage={item.moodImage}
        liked={likedIds.has(item.id)}
        variant={twoCols ? 'grid' : 'list'}
        onToggleLike={() => toggleLike(item.id)}
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
        data={filteredEntries}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <SearchBar onChange={setQuery} />
            <EntryForm onSubmit={addEntry} />
          </View>
        }
        accessibilityLabel="Daftar entri buku harian"
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri yang cocok.</Text>
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
    gap: SPACE.m,
    flexGrow: 1,
  },
  listHeader: {
    gap: SPACE.m,
    marginBottom: SPACE.m,
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