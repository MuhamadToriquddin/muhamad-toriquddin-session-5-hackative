Made by : Muhamad Toriquddin

Deskripsi singkat : Ini adalah projek session 5 dari hackative menggunakan express dan google gemini api sebagai sebuah backend untuk memproses teks dengan bantuan AI. Lalu HTML,CSS,JS sebagai frontend chatbot. 

Cara pakai di lokal : 
1. Jalankan "npm install" di terminal untuk install packages
2. Buat file env lalu isi dengan PORT, GEMINI_MODEL, dan GEMINI_API_KEY.
3. Jalankan sistem dengan "npm run start".
4. Buka projek di localhost:3000.

Daftar method :
1. Method: POST, API: http://localhost:3000/generate-text, Input: {prompts:string}, Result berhasil: {data:string, status:string,message:string}, Result gagal server: {status:string,message:string}