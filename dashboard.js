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
  circle.setAttribute('stroke-dasharray', `${clampedScore}, 100`);
  text.textContent = `${clampedScore}`;

  // Needle calculation
  // 0 score = top (12 o'clock), 100 = full circle (back to top)
  const angle = (clampedScore / 100) * 360 - 90; // -90 to start at top
  const radians = (angle * Math.PI) / 180;
  const r = 14; // radius for needle endpoint (a bit inside the circle)
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
