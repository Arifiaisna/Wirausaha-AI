import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const examples = [
  ["Makanan", "Saya suka memasak dan punya modal kecil"],
  ["Fashion", "Saya suka thrifting dan media sosial"],
  ["Jasa", "Saya bisa desain dan mengedit video"],
  ["Digital", "Saya ingin bisnis yang bisa dijalankan dari HP"]
];

function App() {
  const [form, setForm] = useState({interest:"", skill:"", capital:"", audience:"", problem:""});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (e) => setForm({...form, [e.target.name]: e.target.value});

  async function generate() {
    setError("");
    setResult("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat ide.");
      setResult(data.result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function demo() {
    setForm({
      interest:"Kuliner dan konten media sosial",
      skill:"Memasak sederhana, membuat konten Instagram/TikTok",
      capital:"Rp500.000",
      audience:"Mahasiswa dan anak kos",
      problem:"Banyak mahasiswa ingin makanan praktis yang murah tetapi tetap menarik"
    });
  }

  return (
    <div className="page">
      <header className="nav">
        <div className="brand"><span className="logo">✦</span> WirausahaAI</div>
        <span className="tag">AI untuk ide bisnis</span>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">MATA KULIAH LDK • KEWIRAUSAHAAN</div>
          <h1>Ubah ide kecil menjadi<br/><span>peluang usaha.</span></h1>
          <p>WirausahaAI membantu kamu mengeksplorasi ide bisnis berdasarkan minat, keterampilan, modal, target pasar, dan masalah yang ingin kamu selesaikan.</p>
          <button className="demoBtn" onClick={demo}>Coba contoh pengisian ↗</button>
        </section>

        <section className="workspace">
          <div className="card formCard">
            <div className="cardHead">
              <div><span className="num">01</span><h2>Ceritakan tentangmu</h2></div>
              <p>Semakin detail, semakin relevan idenya.</p>
            </div>

            <label>Minat atau bidang yang kamu sukai
              <input name="interest" value={form.interest} onChange={update} placeholder="Contoh: kuliner, fashion, teknologi..." />
            </label>
            <label>Keterampilan yang kamu punya
              <input name="skill" value={form.skill} onChange={update} placeholder="Contoh: desain, memasak, coding..." />
            </label>
            <div className="two">
              <label>Modal awal
                <input name="capital" value={form.capital} onChange={update} placeholder="Contoh: Rp1.000.000" />
              </label>
              <label>Target pelanggan
                <input name="audience" value={form.audience} onChange={update} placeholder="Contoh: mahasiswa" />
              </label>
            </div>
            <label>Masalah atau kebutuhan yang ingin diselesaikan
              <textarea name="problem" value={form.problem} onChange={update} placeholder="Contoh: mahasiswa sulit menemukan makanan sehat dengan harga terjangkau"></textarea>
            </label>

            <button className="generate" onClick={generate} disabled={loading}>
              {loading ? "AI sedang berpikir..." : "✦  Generate Ide Bisnis"}
            </button>
            <p className="privacy">AI digunakan sebagai alat bantu eksplorasi. Validasi pasar tetap perlu dilakukan secara langsung.</p>
          </div>

          <div className="card resultCard">
            <div className="resultTop"><span className="num">02</span><h2>Hasil eksplorasi</h2></div>
            {!result && !loading && !error && (
              <div className="empty">
                <div className="emptyIcon">✦</div>
                <h3>Ide bisnismu akan muncul di sini.</h3>
                <p>Isi formulir di sebelah kiri, lalu biarkan AI membantu menyusun konsep usahamu.</p>
              </div>
            )}
            {loading && <div className="loading"><div className="spinner"></div><h3>Menyusun peluang usahamu...</h3><p>AI sedang menghubungkan minat, modal, masalah, dan target pasar.</p></div>}
            {error && <div className="error"><b>Belum bisa menghasilkan jawaban.</b><p>{error}</p><p>Pastikan <code>GEMINI_API_KEY</code> sudah diatur di Vercel.</p></div>}
            {result && <div className="result" dangerouslySetInnerHTML={{__html: result}} />}
          </div>
        </section>

        <section className="how">
          <div><span>01</span><h3>Kenali potensi</h3><p>Mulai dari apa yang kamu sukai dan bisa lakukan.</p></div>
          <div><span>02</span><h3>Temukan masalah</h3><p>Peluang usaha sering muncul dari kebutuhan yang belum terpenuhi.</p></div>
          <div><span>03</span><h3>Uji idenya</h3><p>Gunakan hasil AI sebagai titik awal, bukan sebagai keputusan akhir.</p></div>
        </section>
      </main>

      <footer>WirausahaAI © 2026 · Dibuat sebagai proyek Mata Kuliah Umum LDK</footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
