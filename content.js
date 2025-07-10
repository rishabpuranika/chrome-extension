function getProductInfo() {
  const amazonTitle = document.querySelector("#productTitle");
  const flipkartTitle = document.querySelector("._35KyD6");
  const titleElement = amazonTitle || flipkartTitle;
  return titleElement ? titleElement.innerText.trim() : null;
}

async function fetchGreenScore(productName) {
  try {
    const response = await fetch(`http://localhost:1000/api/score?product=${encodeURIComponent(productName)}`);
    const data = await response.json();
    return data.score || "N/A";
  } catch (err) {
    console.error("Fetch error:", err);
    return "N/A";
  }
}

function injectBadge(score, product) {
  const badge = document.createElement("div");
  badge.innerText = `🌿 Green Score: ${score}`;
  badge.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 8px;
    z-index: 9999;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  `;

  // ✅ Make it clickable → opens dashboard
  badge.onclick = () => {
    console.log("Badge clicked"); // debug
    chrome.runtime.sendMessage({
      action: "open_dashboard",
      product,
      score
    });
  };

  document.body.appendChild(badge);
}

// ✅ Only one IIFE (self-calling async function)
(async () => {
  const product = getProductInfo();
  if (product) {
    const score = await fetchGreenScore(product);
    injectBadge(score, product); // pass both product and score
  }
})();
