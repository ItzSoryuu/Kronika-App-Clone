# 🦉 Kronika

**Kronika** adalah platform pembelajaran sejarah dan budaya Indonesia interaktif berbasis gamifikasi yang terinspirasi dari Duolingo. Aplikasi ini dikembangkan menggunakan **Next.js 14 (App Router)**, **PostgreSQL (via Neon)**, **Drizzle ORM**, **Clerk** untuk sistem autentikasi, serta **React Admin** sebagai panel pengelolaan konten (CMS) admin yang dinamis.

Proyek ini dirancang agar pengguna dapat mempelajari sejarah dan kebudayaan Indonesia dengan cara yang seru, terstruktur, dan kompetitif lewat sistem kuis interaktif, perolehan XP (Experience Points), manajemen nyawa (Hearts), pencapaian misi (Quests), serta peringkat tier (Ranking).

---

## 🚀 Fitur Utama

### 1. 🗺️ Peta Jalur Belajar (Learn Timeline)

- Antarmuka peta belajar interaktif yang memandu pengguna melalui berbagai **Unit** dan **Pelajaran (Lessons)** secara berurutan.
- Menampilkan status kemajuan pelajaran (aktif, terkunci, atau selesai).
- Panel samping dinamis yang menampilkan statistik pengguna (Nyawa, XP, Kursus Aktif) serta perkembangan misi harian.

### 2. 🧩 Kuis & Tantangan Interaktif (Lessons & Challenges)

- **Audio & Suara Bantuan**: Dilengkapi dengan suara panduan penjelasan materi dan efek suara instan saat jawaban benar atau salah.
- **Animasi Confetti**: Efek visual kemenangan saat pengguna menyelesaikan pelajaran dengan sukses.

### 3. ❤️ Sistem Nyawa (Hearts) & Mode Latihan (Practice)

- Setiap pengguna memulai pelajaran dengan **10 Nyawa**. Nyawa berkurang 1 jika pengguna memberikan jawaban yang salah.
- **Mode Latihan (Practice Mode)**: Saat nyawa habis, pengguna diarahkan untuk melakukan latihan kembali pada modul yang telah diselesaikan sebelumnya.
  - Berlatih tidak memotong nyawa saat melakukan kesalahan.
  - Menyelesaikan latihan memberikan **+1 Nyawa** dan tambahan **+10 XP**.

### 4. 🏆 Sistem Peringkat Tier (Ranking System)

Sistem peringkat tier yang dirancang secara detail untuk memotivasi pengguna bersaing secara global. Terdiri dari 7 tingkatan tier:

- 🥉 **Perunggu**: 0 - 999 XP
- 🥈 **Perak**: 1.000 - 1.999 XP
- 🥇 **Emas**: 2.000 - 2.999 XP
- 💠 **Platinum**: 3.000 - 3.999 XP
- 💎 **Berlian**: 4.000 - 4.999 XP
- 👑 **Jawara**: 5.000 - 5.999 XP
- 🏆 **Jawara Summit**: 6.000+ XP (dan masuk dalam 100 besar papan peringkat)

Setiap tingkat tier memiliki **5 sub-tier** (dari V hingga I). Pengguna dapat melihat sisa XP yang dibutuhkan untuk naik ke sub-tier berikutnya secara real-time.

### 5. 📊 Papan Peringkat Global (Leaderboard)

- Halaman papan peringkat yang menampilkan **Top 10 Pengguna** dengan perolehan XP tertinggi di seluruh platform untuk memacu daya saing belajar.

### 6. 🎯 Misi Harian (Quests)

- Melacak target pencapaian XP harian pengguna:
  - Kumpulkan 20 XP
  - Kumpulkan 50 XP
  - Kumpulkan 100 XP
  - Kumpulkan 500 XP
  - Kumpulkan 1000 XP
- Dilengkapi dengan bilah progress (`Progress Bar`) visual untuk memantau penyelesaian misi.

### 7. 🛡️ Portal Admin (CMS)

- Portal administrasi lengkap yang diintegrasikan dengan **React Admin** di rute `/admin`.
- Memungkinkan admin untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada:
  - **Courses** (Kursus Pembelajaran)
  - **Units** (Bab/Unit Belajar)
  - **Lessons** (Materi/Pelajaran)
  - **Challenges** (Tantangan Kuis)
  - **Challenge Options** (Opsi Jawaban & Audio/Gambar)

---

## 🛠️ Tech Stack & Dependensi

- **Framework & Logic**: [Next.js 14 (App Router)](https://nextjs.org/) (dengan React 18)
- **Sistem Autentikasi**: [Clerk SDK](https://clerk.com/)
- **Database**: PostgreSQL (dihosting di [Neon Serverless](https://neon.tech/))
- **Object-Relational Mapping (ORM)**: [Drizzle ORM](https://orm.drizzle.team/) & [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (Radix UI), [lucide-react](https://lucide.dev/) (Icons)
- **Admin Dashboard**: [React Admin](https://marmelab.com/react-admin/) & `ra-data-simple-rest`
- **Animasi**: `react-confetti`, `tailwindcss-animate`
- **Package Manager**: NPM / Bun / Yarn

---

## 📂 Struktur Direktori Utama

```text
├── actions/                  # Next.js Server Actions (user-progress, challenge-progress)
├── app/                      # Rute & Halaman Utama Next.js (App Router)
│   ├── (main)/               # Rute Utama setelah login (learn, leaderboard, ranking, courses)
│   ├── (marketing)/          # Halaman landing page / promosi awal
│   ├── admin/                # Dashboard Admin menggunakan React Admin
│   ├── api/                  # REST API endpoint untuk React Admin & CMS data
│   ├── lesson/               # Halaman layout & kuis interaktif (Quiz engine)
│   └── globals.css           # Styling global aplikasi
├── components/               # Komponen UI Reusable (modals, sidebar, ui, quests)
├── constants.ts              # Konstanta aplikasi (Quest milestones, XP costs)
├── db/                       # Konfigurasi database PostgreSQL
│   ├── drizzle.ts            # Instance database client
│   ├── queries.ts            # Kueri database siap pakai (Data fetching)
│   └── schema.ts             # Definisi skema tabel database (Drizzle)
├── drizzle/                  # Hasil migrasi database SQL generated oleh Drizzle Kit
├── lib/                      # Utilitas pembantu (utils.ts, ranking.ts)
├── public/                   # Aset statis seperti bendera negara (es.svg), gambar (mascot.svg), dan audio (es_man.mp3)
├── scripts/                  # Skrip utilitas database (seed, reset, prod)
├── tsconfig.json             # Konfigurasi TypeScript
├── tailwind.config.ts        # Konfigurasi tema Tailwind CSS
└── package.json              # Dependensi dan skrip proyek
```

---

## ⚙️ Cara Instalasi & Menjalankan secara Lokal

### 1. Klon Repositori

```bash
git clone https://github.com/username/kronika.git
cd kronika
```

### 2. Konfigurasi Environment Variables (`.env`)

Buat berkas bernama `.env` di direktori root aplikasi (Anda bisa menyalin dari templat `.env.example` yang sudah disediakan):

```bash
cp .env.example .env
```

Isi variabel di dalam berkas `.env` dengan kredensial Anda:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/learn
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/learn

DATABASE_URL="postgresql://username:password@neon-host/neondb?sslmode=require"
```

### 3. Instal Dependensi

```bash
npm install
```

### 4. Setup Database & Jalankan Migrasi Drizzle

Pastikan database PostgreSQL Anda sudah aktif, lalu jalankan perintah berikut untuk mensinkronkan skema tabel database:

```bash
# Melakukan push skema Drizzle ke PostgreSQL
npm run db:push
```

### 5. Lakukan Seeding Data Awal

Untuk mengisi database dengan materi pembelajaran sejarah dan budaya Indonesia contoh beserta unit, lesson, dan opsi pertanyaan awal, jalankan skrip berikut:

```bash
# Menjalankan seeding database tahap awal
npm run db:seed
```

_(Catatan: Anda juga bisa menggunakan `npm run db:prod` untuk mempopulasi data siap produksi)._

### 6. Jalankan Server Pengembangan

Jalankan server lokal untuk melihat hasil aplikasi:

```bash
npm run dev
```

Buka browser Anda dan akses di [http://localhost:3000](http://localhost:3000).

---

## 📜 Skrip NPM yang Tersedia

Berikut adalah daftar perintah npm yang dapat Anda gunakan di dalam proyek ini:

| Perintah            | Deskripsi                                                                             |
| :------------------ | :------------------------------------------------------------------------------------ |
| `npm run dev`       | Menjalankan aplikasi dalam mode pengembangan di `http://localhost:3000`.              |
| `npm run build`     | Membuat build aplikasi Next.js untuk kebutuhan produksi.                              |
| `npm run start`     | Menjalankan aplikasi hasil build produksi.                                            |
| `npm run lint`      | Melakukan analisis linter ESLint untuk memeriksa kerapihan kode.                      |
| `npm run db:push`   | Mendorong perubahan skema lokal (`schema.ts`) langsung ke Neon Database.              |
| `npm run db:studio` | Membuka antarmuka visual Drizzle Studio untuk memantau data di browser.               |
| `npm run db:seed`   | Mengisi data awal dummy (materi pembelajaran sejarah & budaya Indonesia) ke database. |
| `npm run db:prod`   | Mengisi data siap produksi ke database.                                               |
| `npm run db:reset`  | Menghapus semua data yang ada di database secara instan (hati-hati!).                 |

---

## 🔒 Hak Cipta & Kontribusi

Proyek ini dibangun untuk tujuan pembelajaran interaktif. Kontribusi, kritik, dan saran selalu diterima untuk pengembangan platform ini menjadi lebih baik lagi. Silakan lakukan _Fork_ pada repositori ini dan kirimkan _Pull Request_ Anda!

🦉 **Kronika - Mari Belajar Sejarah & Budaya Indonesia dengan Menyenangkan!**

# or

yarn dev

# or

pnpm dev

# or

bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Project Info

This is the Kronika language learning application.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```
#   K r o n i k a - A p p - C l o n e  
 #   K r o n i k a - A p p - C l o n e  
 