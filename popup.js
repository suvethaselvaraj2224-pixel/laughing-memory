const btn = document.getElementById("summarizeBtn");
const output = document.getElementById("output");
const summary = document.getElementById("summary");
const divider = document.getElementById("divider");
const copyBtn = document.getElementById("copyBtn");

function showLoading() {
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Analyzing...';
  divider.classList.add("visible");
  output.classList.add("visible");
  summary.innerHTML = '<div class="loading"><div class="spinner"></div> Reading your email...</div>';
  copyBtn.classList.remove("visible");
}

function showResult(text) {
  btn.disabled = false;
  btn.innerHTML = '<span>✦</span> Summarize Email';
  summary.innerText = text;
  copyBtn.classList.add("visible");
}

function showError(msg) {
  btn.disabled = false;
  btn.innerHTML = '<span>✦</span> Summarize Email';
  summary.innerHTML = `<div class="error-msg">${msg}</div>`;
  copyBtn.classList.remove("visible");
}

btn.addEventListener("click", () => {
  showLoading();

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) return showError("No active tab found.");

    const tab = tabs[0];
    if (!tab.url || !tab.url.includes("mail.google.com")) {
      return showError("Please open a Gmail email first.");
    }

    chrome.scripting.executeScript(
      { target: { tabId: tab.id }, files: ["content.js"] },
      () => {
        if (chrome.runtime.lastError) {
          return showError("Could not inject script — " + chrome.runtime.lastError.message);
        }

        chrome.tabs.sendMessage(tab.id, { action: "extractEmail" }, (response) => {
          if (chrome.runtime.lastError || !response) {
            return showError("Could not read email. Make sure an email is open.");
          }
          if (!response.success) return showError(response.error);

          summary.innerHTML = '<div class="loading"><div class="spinner"></div> Generating summary...</div>';

          chrome.runtime.sendMessage({ action: "summarizeEmail", text: response.text }, (res) => {
            if (chrome.runtime.lastError || !res) return showError("Summarization failed.");
            if (res.success) showResult(res.summary);
            else showError(res.error);
          });
        });
      }
    );
  });
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(summary.innerText).then(() => {
    copyBtn.innerText = "Copied!";
    setTimeout(() => copyBtn.innerText = "Copy to clipboard", 2000);
  });
});