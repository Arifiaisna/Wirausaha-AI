export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({error:"GEMINI_API_KEY belum diatur di Vercel."});

  try {
    const {interest, skill, capital, audience, problem} = req.body || {};
    const prompt = `Kamu adalah mentor kewirausahaan untuk mahasiswa Indonesia. Berdasarkan data berikut, buat satu ide bisnis yang realistis dan kreatif:
Minat: ${interest || "-"}
Keterampilan: ${skill || "-"}
Modal: ${capital || "-"}
Target pelanggan: ${audience || "-"}
Masalah/kebutuhan: ${problem || "-"}

Jawab dalam Bahasa Indonesia yang sederhana. Jangan menjanjikan bahwa ide ini pasti berhasil. Gunakan HTML sederhana saja dengan struktur:
<h3>Nama ide bisnis</h3>
<p>Deskripsi singkat...</p>
<h4>Mengapa ide ini cocok?</h4><ul><li>...</li></ul>
<h4>Model bisnis</h4><p>...</p>
<h4>Target pasar</h4><p>...</p>
<h4>Langkah mulai dengan modal tersebut</h4><ol><li>...</li></ol>
<h4>Tantangan yang perlu diuji</h4><ul><li>...</li></ul>
<h4>Contoh promosi</h4><p>...</p>
Jangan gunakan markdown, hanya HTML.`;

    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent", {
      method:"POST",
      headers:{"Content-Type":"application/json", "x-goog-api-key": key},
      body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})
    });
    const data = await r.json();
    if (!r.ok) return res.status(500).json({error:data?.error?.message || "Gemini API gagal."});
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(500).json({error:"AI tidak mengembalikan jawaban."});
    return res.status(200).json({result:text.replace(/```html|```/g,"").trim()});
  } catch (e) {
    return res.status(500).json({error:"Terjadi kesalahan saat menghubungi AI."});
  }
}
