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

function updateScoreMeter(score) {
  const circle = document.querySelector('.circle');
  const text = document.getElementById('score-text');
  const needle = document.getElementById('score-needle');

  // Clamp score between 0 and 100
  const clampedScore = Math.max(0, Math.min(score, 100));
  // For semicircle, 0-100 maps to 0-50 for stroke-dasharray
  const dash = (clampedScore / 100) * 50;
  circle.setAttribute('stroke-dasharray', `${dash}, 50`);
  text.textContent = `${clampedScore}`;

  // Needle calculation for semicircle
  // 0 score = left (180deg), 100 = right (0deg)
  const angle = (clampedScore / 100) * 180 + 180; // 180deg (left) to 360deg (right)
  const radians = (angle * Math.PI) / 180;
  const r = 16; // radius for needle endpoint
  const cx = 18, cy = 18;
  const x2 = cx + r * Math.cos(radians);
  const y2 = cy + r * Math.sin(radians);
  needle.setAttribute('x2', x2);
  needle.setAttribute('y2', y2);
}

(async () => {
  const { product, score } = parseQuery();
document.getElementById("product-name").textContent = product;
document.getElementById("score-value").textContent = score;

updateScoreMeter(score); // <- Add this
getBreakdown(score);

  const summary = await generateGeminiSummary(product, score);
  document.getElementById("summary").innerText = summary;
})();
