# 📌 Project DHEPIL — Roadmap & Phase Contract

---

## 🔹 Garis Besar Global

### 1. Core Hub
- **Launcher** jadi pusat navigasi & logic dasar (auth, rotasi, clock, orbit).  
- Semua module diakses lewat **LauncherBtn**.  
- Launcher tidak bergantung pada module → tetap jalan walau module dihapus.  

### 2. Modules
- **WarungMeng** → kasir / bisnis.  
- **Rara** → form & input project.  
- **Calculator** → utilitas tambahan.  
- **Extra** → slot bebas untuk fitur ekstensi.  
- **Setting** → user config (atur tampilan Launcher, backup ke backend).  
- **Rule**: tiap module berdiri sendiri (`index.tsx` + `<ModuleName>Asset/`).  

### 3. Backend
- **Supabase** untuk auth (username/password), DB, storage.  
- Role-based access → bedanya hanya di level akses, bukan logic module.  
- Backup layer: Google Drive (foto), Google Spreadsheet (data form).  

### 4. Frontend Build
- **PWA Internal (Private)**: semua module, login wajib.  
- **PWA Public**: module terbuka tanpa login (form upload sederhana).  
- **Android (Capacitor)**: wrap dari PWA internal.  
- **Website Promo**: terpisah, fokus marketing/landing.  

### 5. Rules Eksekusi
- **Plan-first → confirm dulu sebelum eksekusi.**  
- File ≤ 200 lines, header section standar.  
- Commit kecil, freeze milestone dengan `chore: freeze`.  
- Fresh-clone test tiap milestone.  
- Jangan nulis kode kalau tidak diminta.  
- Jawaban harus singkat, kecuali diminta explain/plan.  
- Kalau kirim kode, tanya dulu berapa file.  
- Plan harus utuh, gagal → bikin plan baru (tanpa opsi cabang).  

---

## 🔹 Phase Breakdown

### 📌 Phase 1 — Core Hub & Navigasi Launcher
**Tujuan**  
- Membuat **Launcher** sebagai pusat navigasi.  
- Menyatukan logic pipeline yang sudah ada (1–8).  
- Menyediakan jalur navigasi ke module (WarungMeng, Rara, Calculator, Extra, Setting).  

**Lingkup**  
1. `LauncherScreen.tsx` → parent minimal.  
2. `LauncherScreenHub.tsx` → orchestrator logic pipeline (1–8).  
3. `LauncherBtn.tsx` + `LauncherBtnConfig.ts` → tombol navigasi.  
4. Integrasi awal modules: stub `index.tsx` per module.  
5. Auth gate → filter akses module (public vs private).  

**Mandatory Contract**  
- File logic 1–8 tetap dipakai hub.  
- `LauncherBtn` hanya navigasi, tidak berisi logic module.  
- Launcher tetap jalan walau module dihapus.  
- `index.tsx` + `<ModuleName>Asset/` wajib ada di setiap module.  
- Navigasi minimal jalan (klik → masuk module stub).  
- Auth gate aktif.  

**Output**  
- `App.tsx` render Launcher.  
- Pipeline logic 1–8 aktif.  
- Tombol module tampil & klik bisa masuk module stub.  
- Auth gate berjalan.  

---

### 📌 Phase 2 — Backend Core
**Tujuan**  
Bangun pondasi backend di Supabase untuk auth, DB, storage, dan log dasar.  

**Lingkup**  
1. Auth (username/password, role: public/staff/admin).  
2. DB inti: `users`, `forms`, `media_assets`, `sync_log`.  
3. Storage bucket `media/` + RLS.  
4. Sync/log mekanisme dasar.  

**Mandatory Contract**  
- Semua tabel ada + RLS dasar.  
- Auth username/password jalan.  
- Upload foto tersimpan di bucket + metadata DB.  
- Backup endpoint dummy tersedia.  

**Output**  
- Supabase siap (auth, tabel, bucket).  
- Bisa signup/login user.  
- Bisa insert form + upload foto.  
- Data masuk DB & storage.  

---

### 📌 Phase 3 — Module Rara (Form & Input)
**Tujuan**  
Bangun module **Rara** untuk form + upload foto, terhubung backend.  

**Lingkup**  
1. UI form + upload foto.  
2. Submit → insert row `forms` + foto ke `media_assets`.  
3. Auth gate: public field terbatas, private field penuh.  
4. Offline-first: draft simpan lokal, auto sync online.  

**Mandatory Contract**  
- `Rara/index.tsx` sebagai parent.  
- Submit form & foto berhasil.  
- Auth gate aktif.  
- Draft offline tersimpan & auto sync.  
- Asset module ada di `Rara/RaraAsset/`.  

**Output**  
- User bisa buka module Rara via Launcher.  
- Input form + upload foto → tersimpan di Supabase.  
- Offline draft sync otomatis.  

---

### 📌 Phase 4 — Module WarungMeng (Kasir)
**Tujuan**  
Bangun module **WarungMeng** untuk pencatatan transaksi kasir.  

**Lingkup**  
1. UI daftar menu + keranjang + hitung total.  
2. DB: `menu_items`, `transactions`.  
3. Transaksi simpan ke DB.  
4. Auth gate: staff/admin penuh, public view terbatas.  
5. Offline transaksi → auto sync.  

**Mandatory Contract**  
- `WarungMeng/index.tsx` sebagai parent.  
- Menu terbaca dari DB.  
- Transaksi tercatat di tabel.  
- Offline sync aktif.  
- Asset module ada di `WarungMeng/WarungMengAsset/`.  

**Output**  
- Module WarungMeng bisa diakses via Launcher.  
- Transaksi tercatat di DB.  
- Offline transaksi sync otomatis.  

---

### 📌 Phase 5 — Backup & Integrasi Eksternal
**Tujuan**  
Tambahin backup otomatis ke Google Drive & Google Sheets.  

**Lingkup**  
1. Foto upload → copy ke Google Drive.  
2. Form & transaksi → append ke Google Sheets.  
3. Setting module → toggle backup & status sync.  

**Mandatory Contract**  
- Foto punya salinan di Drive.  
- Data form & transaksi masuk Google Sheets.  
- Metadata tersimpan (drive_file_id, sheet_row_id).  
- Setting module atur toggle & tampil status.  
- Kalau gagal, retry & data tetap aman di Supabase.  

**Output**  
- Semua foto backup ke Drive.  
- Semua data backup ke Sheets.  
- Admin bisa kontrol & monitor backup.  

---

### 📌 Phase 6 — Calculator & Extra Modules
**Tujuan**  
Tambahin module utilitas ringan (Calculator & Extra).  

**Lingkup**  
1. Calculator → operasi dasar (+, -, ×, ÷), opsional history lokal.  
2. Extra → slot bebas untuk mini-app lain.  
3. LauncherBtn ke module.  

**Mandatory Contract**  
- `index.tsx` parent di tiap module.  
- `<ModuleName>Asset/` ada.  
- Bisa dibuka via Launcher.  
- Module independen (hapus = Launcher tetap jalan).  

**Output**  
- Launcher punya tombol ke Calculator & Extra.  
- Calculator berjalan mandiri.  
- Extra siap dipakai untuk mini-app lain.  

---

## 📍 Rekap Akhir
- **Phase 1:** Core Hub (Launcher)  
- **Phase 2:** Backend Core  
- **Phase 3:** Module Rara  
- **Phase 4:** Module WarungMeng  
- **Phase 5:** Backup & Integrasi (Drive + Sheets)  
- **Phase 6:** Calculator & Extra  

Setiap phase freeze commit → fresh-clone test → lanjut phase berikutnya.  
Hasil akhir: 1 ekosistem modular (hub-and-spoke) dengan backup eksternal & module independen.
