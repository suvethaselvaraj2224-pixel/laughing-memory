// content.js

// Function to extract the currently opened email body
function getEmailBody() {
  // Gmail renders the email body inside a div with class "a3s"
  const emailElement = document.querySelector(".a3s");
  if (emailElement) {
    return emailElement.innerText; // Get plain text
  }
  return null;
}

// Listen for messages from popup.js or background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractEmail") {
    const bodyText = getEmailBody();
    if (bodyText) {
      // Send the extracted text back to background.js
      sendResponse({ success: true, text: bodyText });
    } else {
      sendResponse({ success: false, error: "No email body found" });
    }
  }
});
