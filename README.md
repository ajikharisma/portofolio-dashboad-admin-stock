# 📦 AdminStock

Dashboard admin untuk manajemen inventory produk — lengkap dengan tabel data, pencarian, sorting, pagination, serta CRUD penuh (tambah, edit, hapus) melalui modal.

> 📸 **Screenshot:** [tambahkan screenshot di sini]

## ✨ Fitur

- 📊 **Stats overview** — ringkasan total produk, total stok, produk dengan stok menipis, dan estimasi nilai inventory
- 📋 **Tabel data produk** dengan sorting per kolom (nama, harga, stok)
- 🔢 **Pagination** untuk menavigasi data dalam jumlah besar
- ➕ **Tambah produk baru** melalui modal form
- ✏️ **Edit produk** — form modal yang sama, otomatis terisi data produk yang dipilih
- 🗑️ **Hapus produk** dengan konfirmasi sebelum aksi dijalankan
- 🧭 **Sidebar navigasi** khas layout admin panel

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| Library | React 19 |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| Build tool | Vite |
| Data | [DummyJSON API](https://dummyjson.com/docs/products) |

## 🧠 Konsep React yang Diterapkan

- **Custom Hooks terpisah untuk pola berbeda** — `useFetch` untuk pengambilan data (reaktif, otomatis jalan), `useMutateProduct` untuk aksi tambah/ubah/hapus (imperatif, dijalankan manual lewat event)
- **Sinkronisasi state lokal dengan data server** — hasil fetch disalin ke state lokal agar bisa dimanipulasi langsung (hapus/tambah/edit) tanpa perlu fetch ulang
- **Sorting non-destruktif** — mengurutkan data dengan menyalin array (`[...array]`) terlebih dahulu agar data asli tidak berubah
- **Pagination manual** — memotong data menggunakan `.slice()` berdasarkan halaman aktif
- **Modal dua-mode** — satu komponen (`ProductModal`) digunakan untuk mode tambah dan edit sekaligus, dikontrol lewat props
- **Event propagation control** — `stopPropagation()` agar klik di dalam modal tidak ikut menutup modal itu sendiri

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── StatsCard.jsx
│   ├── ProductTable.jsx
│   ├── ProductModal.jsx
│   └── Pagination.jsx
├── hooks/
│   ├── useFetch.jsx
│   └── useMutateProduct.jsx
├── pages/
|   ├── Categories.jsx
|   └── Dashboard.jsx
└── App.jsx
```

## 🚀 Menjalankan Project Secara Lokal

```bash
# Clone repository
git clone [url-repo-kamu]
cd adminstock

# Install dependency
npm install

# Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser.

> **Catatan:** endpoint tambah/ubah/hapus pada DummyJSON bersifat simulasi — perubahan data hanya terlihat di sesi aplikasi yang sedang berjalan dan tidak tersimpan permanen di server.

## 📌 Rencana Pengembangan

- [ ] Integrasi dengan backend sendiri agar perubahan data tersimpan permanen
- [ ] Halaman manajemen user terpisah
- [ ] Export data ke CSV/Excel

## 👤 Dibuat oleh

Aji Kharisma Atmaja