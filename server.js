import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(express.json());

// Optional: restrict to your extension's origin
// const ALLOWED_ORIGIN = "chrome-extension://YOUR_EXTENSION_ID";

app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing text" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an assistant that summarizes emails into 3-5 bullet points and extracts action items." },
          { role: "user", content: text },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) return res.status(500).json({ error: data.error.message });
    if (data.choices?.length > 0) return res.json({ summary: data.choices[0].message.content });

    res.status(500).json({ error: "No summary returned" });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));