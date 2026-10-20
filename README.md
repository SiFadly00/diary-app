# Diary App

**Nama:** Mochamad Fadly Akbar Athallah

**NIM:** 2430511011

## Menjalankan proyek

Pastikan Node.js dan aplikasi Expo Go sudah terpasang.

```bash
npm install
npx expo start
```

Pindai QR code yang muncul di terminal atau browser menggunakan Expo Go. Pastikan perangkat dan komputer berada di jaringan yang sama. Alternatifnya, tekan `a` untuk Android emulator atau `i` untuk iOS Simulator dari terminal Expo.

## Fitur

- Menampilkan lima entri buku harian dalam daftar satu kolom pada ponsel dan grid dua kolom pada layar dengan lebar minimal 600 px.
- Mencari entri berdasarkan judul, tanggal, atau ringkasan tanpa mengubah data awal.
- Menandai dan membatalkan suka pada entri; status like dikelola oleh screen parent.
- Menambahkan entri melalui form terkontrol yang membersihkan input setelah disimpan.
- Membuka detail entri melalui modal saat kartu diary ditekan.
- Menggunakan design tokens dan `StyleSheet` untuk warna, jarak, tipografi, dan ukuran komponen.
- Menggunakan ilustrasi mood lokal dari `assets/moods/happy.png`.
- Menyediakan label aksesibilitas pada kartu, daftar, kolom input, gambar, dan tombol, serta target sentuh yang memadai.

## Props dan state

`DiaryListScreen` mengelola entri, kata pencarian, status like, dan entri yang dipilih untuk modal. Hasil pencarian dihitung dari entri dan query. `DiaryCard` menerima data serta callback melalui props; `SearchBar` dan `EntryForm` mengelola input lokal dan mengirim perubahan atau entri baru ke parent.
