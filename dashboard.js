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

function drawGauge(score) {
  const canvas = document.getElementById('gauge-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gauge parameters
  const cx = 80, cy = 80, r = 70;
  const startAngle = Math.PI, endAngle = 0;
  const lineWidth = 16;

  // Background arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle, false);
  ctx.strokeStyle = '#444c56';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Foreground arc (score)
  const scoreAngle = Math.PI + (score / 100) * Math.PI;
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, scoreAngle, false);
  ctx.strokeStyle = '#7fffaf';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Needle
  const needleAngle = Math.PI + (score / 100) * Math.PI;
  const needleLength = r - lineWidth / 2;
  const nx = cx + needleLength * Math.cos(needleAngle);
  const ny = cy + needleLength * Math.sin(needleAngle);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(nx, ny);
  ctx.strokeStyle = '#ff5252';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function updateGauge(score) {
  drawGauge(score);
  const scoreDisplay = document.getElementById('gauge-score');
  if (scoreDisplay) scoreDisplay.textContent = score;
}

(async () => {
  const { product, score } = parseQuery();
  document.getElementById("product-name").textContent = product;
  document.getElementById("score-value").textContent = score;

  updateGauge(score); // <-- use the new gauge
  getBreakdown(score);

  const summary = await generateGeminiSummary(product, score);
  document.getElementById("summary").innerText = summary;
})();
