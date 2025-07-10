function parseQuery() {
  const params = new URLSearchParams(window.location.search);
  return {
    product: params.get("product"),
    score: parseInt(params.get("score"))
  };
}

function getBreakdown(score) {
  const breakdown = [
    { factor: "Material (bamboo, recycled)", impact: "+20" },
    { factor: "Packaging (eco-friendly)", impact: "+10" },
    { factor: "Green Manufacturing", impact: "+5" },
    { factor: "Transport Emissions", impact: "-5" },
    { factor: "Certifications (FSC, USDA)", impact: "+10" }
  ];

  const list = document.getElementById("breakdown-list");
  breakdown.forEach(b => {
    const li = document.createElement("li");
    li.innerText = `${b.factor} — Impact: ${b.impact}`;
    list.appendChild(li);
  });
}

(async () => {
  const { product, score } = parseQuery();
  document.getElementById("product-name").textContent = product;
  document.getElementById("score-value").textContent = score;
  getBreakdown(score);

  const summary = await generateGeminiSummary(product, score);
  document.getElementById("summary").innerText = summary;
})();
