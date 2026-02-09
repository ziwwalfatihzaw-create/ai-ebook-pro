export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Buatkan ebook profesional lengkap minimal 10 bab dengan judul menarik, daftar isi, pembuka, isi tiap bab detail, dan penutup tentang: ${prompt}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Gagal menghasilkan ebook.";

    res.status(200).json({ text });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
