# ✦ mailbrief

**AI-powered Gmail email summaries in one click.**

mailbrief is a Chrome extension that reads the email you have open in Gmail and instantly generates a concise 3–5 bullet-point summary with action items — powered by the Groq API (Llama 3.3 70B).

---

## ✨ Features

- **One-click summarization** — click the button, get a summary. No copy-pasting.
- **Bullet-point format** — summaries are structured for quick scanning, with action items highlighted.
- **Copy to clipboard** — grab the summary with a single click.
- **Minimal UI** — clean dark-mode popup that stays out of your way.
- **Runs locally** — no data stored; everything is processed in-session via the Groq API.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Extension platform | Chrome Manifest V3 |
| AI model | Llama 3.3 70B via [Groq API](https://groq.com) |
| Email extraction | Gmail DOM (`content.js`) |
| UI | Vanilla HTML/CSS/JS with Syne + DM Mono fonts |

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mailbrief.git
cd mailbrief
```

### 2. Add your Groq API key

Open `background.js` and replace the placeholder with your key:

```js
const API_KEY = "your_groq_api_key_here";
```

Get a free API key at [console.groq.com](https://console.groq.com).

### 3. Load into Chrome

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `mailbrief` project folder

The ✦ mailbrief icon will appear in your Chrome toolbar.

---

## 🚀 Usage

1. Open [Gmail](https://mail.google.com) and click on any email.
2. Click the **mailbrief** extension icon in the toolbar.
3. Hit **✦ Summarize Email**.
4. Your summary appears in seconds. Use **Copy to clipboard** to grab it.

---

## 📁 Project Structure

```
mailbrief/
├── manifest.json      # Chrome extension config (Manifest V3)
├── background.js      # Service worker — calls the Groq API
├── content.js         # Injected into Gmail — extracts the email body
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic and state management
├── icon16.png
├── icon48.png
└── icon128.png
```

---

## ⚠️ Security Note

This project stores the Groq API key directly in `background.js` for simplicity. **Do not commit your real API key to a public repository.** For production use, consider:

- Adding `background.js` (or the key line) to `.gitignore`
- Using a environment variable injection step at build time
- Proxying requests through your own backend

---

## 🔒 Permissions

| Permission | Reason |
|---|---|
| `activeTab` | Access the currently open Gmail tab |
| `scripting` | Inject `content.js` to read the email DOM |
| `tabs` | Verify the active tab is on `mail.google.com` |
| `https://mail.google.com/*` | Host permission for Gmail |
| `https://api.groq.com/*` | Host permission to call the Groq API |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)
