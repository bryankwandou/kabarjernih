# Kabar Jernih

Berita dunia dari sumber berlisensi terbuka. Tanpa iklan, tanpa pelacak, tanpa paywall.

Live: https://kabarjernih.vercel.app

Kabar Jernih menerbitkan ulang artikel lengkap dari penerbit yang mengizinkannya. Setiap artikel mencantumkan penulis, sumber, lisensi, dan tautan ke halaman aslinya. Antarmuka tersedia dalam bahasa Indonesia dan Inggris. Artikel tampil dalam bahasa aslinya: Indonesia, Inggris, Spanyol, Prancis, Portugis, Arab (kanan ke kiri), dan Jepang.

## Sumber dan lisensi

| Sumber | Lisensi | Catatan |
|---|---|---|
| Global Voices (8 edisi bahasa) | CC BY 3.0 | Teks dan gambar dari feed |
| The Conversation (9 edisi) | CC BY-ND 4.0 | Tidak diterjemahkan atau diubah. Piksel penghitung dibuang. |
| NASA | Domain publik | Karya pemerintah AS |

Sumber berlisensi NonCommercial (misalnya KFF Health News) tidak dipakai. Situs ini memang tanpa iklan, tetapi lisensi NC akan ikut mengikat siapa pun yang menyalin repo ini.

Gambar hanya diambil dari feed itu sendiri. Situs ini tidak mengambil `og:image` dari halaman penerbit, karena foto utama The Conversation sering milik agensi foto dan tidak tercakup CC. Artikel tanpa gambar di feed memakai sampul tipografis yang digambar dengan CSS.

## Cara kerja

```
feed RSS/Atom ──► scripts/ingest.mjs ──► data/articles.json ──► next build (static export) ──► CDN
                  (GitHub Actions, 4x/jam)
```

- `scripts/ingest.mjs` menarik semua feed di `scripts/sources.mjs`, membersihkan HTML dengan `sanitize-html`, membuang pelacak, mengelompokkan artikel ke rubrik, dan membuang duplikat antaredisi.
- Artikel lebih dari 45 hari diarsipkan. Jika satu feed gagal, artikel lamanya tetap dipakai, jadi satu sumber yang mati tidak mengosongkan rubrik.
- Skrip menolak menimpa data jika hasilnya di bawah 50 artikel.
- Pencarian berjalan di peramban dengan indeks ringkas `/search.json` (judul dan ringkasan, tanpa isi artikel). Kueri tidak dikirim ke server.
- Artikel tersimpan dan ukuran teks disimpan di `localStorage` perangkat pembaca.

## Biaya

Seluruh situs adalah HTML statis (`output: "export"`). Membaca, mencari, atau menyimpan artikel tidak menjalankan fungsi Vercel dan tidak menyentuh database. Karena itu Fluid Active CPU tetap nol berapa pun jumlah pembacanya. Yang bertambah hanya bandwidth CDN untuk HTML. Gambar dimuat langsung dari server penerbit, jadi tidak memakai bandwidth situs ini.

- **Database (Neon)**: tidak dipakai. Tidak ada data pengguna yang perlu disimpan di server.
- **Blob storage**: tidak dipakai. Menyimpan salinan gambar justru menambah biaya dan memindahkan tanggung jawab lisensi gambar ke situs ini.
- **GitHub Actions**: satu job sekitar 30 detik, empat kali per jam (sekitar 3 menit bila ada deploy), kira-kira 3.000 menit per bulan. Repo publik tidak dikenai biaya menit Actions. Jadwal GitHub bisa telat atau terlewat saat sibuk, jadi empat jadwal per jam menjaga data tetap diperbarui minimal sekali sejam.
- **Vercel**: deploy hanya terjadi jika feed benar-benar berubah. Tidak ada artikel baru berarti tidak ada commit dan tidak ada build.
- **Ukuran repo**: `data/articles.json` sekitar 6 MB dan dibatasi oleh jendela 45 hari. File ditulis satu artikel per baris, jadi tiap commit disimpan git sebagai selisih kecil, bukan salinan utuh.

Video atau siaran langsung tidak di-host di sini. Jika suatu saat ditambahkan, cara yang tetap murah adalah menyematkan pemutar dari penerbit asal, bukan menyimpan atau meneruskan streamnya.

## Menjalankan

```bash
npm install
npm run ingest   # tarik feed, tulis data/articles.json
npm run dev      # http://localhost:3000/id/
npm run build    # hasil statis di out/
```

## Pembaruan otomatis

`.github/workflows/refresh.yml` berjalan empat kali per jam (menit ke-7, 22, 37, 52) dan meng-commit `data/articles.json` jika ada yang berubah, lalu men-deploy ke Vercel. Deploy memerlukan tiga secret di repo: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, dan `VERCEL_PROJECT_ID` (dua yang terakhir ada di `.vercel/project.json` setelah `vercel link`). Tanpa secret itu, langkah deploy dilewati.

Cara memeriksa sendiri bahwa situs mutakhir: riwayat commit `kabarjernih-bot` di repo, tab Actions (`refresh-news`), dan baris "Diperbarui" di kepala halaman, yang menunjukkan tanggal artikel terbaru.

## Lisensi

Kode: MIT. Artikel tetap di bawah lisensi masing-masing penerbit, seperti tercantum di setiap halaman artikel.
