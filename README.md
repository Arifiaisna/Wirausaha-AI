# WirausahaAI

Aplikasi web sederhana untuk tugas Mata Kuliah Umum LDK: **Membuat aplikasi dengan AI**.

## Fitur
- Pengguna memasukkan minat, keterampilan, modal, target pasar, dan masalah.
- AI Gemini menghasilkan satu konsep bisnis.
- Hasil berisi nama ide, alasan kecocokan, model bisnis, target pasar, langkah awal, tantangan, dan contoh promosi.
- Tampilan responsif untuk laptop dan HP.

## Deploy ke Vercel
1. Upload folder ini ke GitHub.
2. Di Vercel pilih **Add New → Project**, lalu pilih repository ini.
3. Framework akan terdeteksi sebagai Vite.
4. Tambahkan Environment Variable:
   - Name: `GEMINI_API_KEY`
   - Value: API key Gemini milikmu.
5. Klik Deploy.

## Mendapatkan Gemini API Key
Buat API key melalui Google AI Studio. Jangan menaruh API key langsung di file frontend. Gunakan Environment Variable Vercel seperti petunjuk di atas.

## Catatan tugas
AI membantu menghasilkan dan mengembangkan ide. Hasil AI tetap perlu divalidasi dengan calon pelanggan, survei sederhana, dan pengujian pasar.
