const PROXY_URL = "https://laughing-memory-tog4.onrender.com/summarize";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "summarizeEmail") {
    fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message.text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) sendResponse({ success: false, error: data.error });
        else sendResponse({ success: true, summary: data.summary });
      })
      .catch((err) => sendResponse({ success: false, error: err.toString() }));

    return true;
  }
});