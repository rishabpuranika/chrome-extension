chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "open_dashboard") {
    const url = chrome.runtime.getURL("dashboard.html") + `?product=${encodeURIComponent(message.product)}&score=${message.score}`;
    chrome.tabs.create({ url });
  }
});
