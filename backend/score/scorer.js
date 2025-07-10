const { extractEcoFeatures } = require("./keyword_utils");

function calculateGreenScore(productName) {
  const features = extractEcoFeatures(productName);
  let score = 50;

  if (features.includes("bamboo")) score += 20;
  if (features.includes("recycled")) score += 20;
  if (features.includes("biodegradable")) score += 15;
  if (features.includes("eco-friendly") || features.includes("eco")) score += 10;
  if (features.includes("organic") || features.includes("fsc") || features.includes("usda")) score += 15;

  if (features.includes("plastic")) score -= 15;
  if (features.includes("synthetic")) score -= 10;

  return Math.max(0, Math.min(100, score));
}

module.exports = { calculateGreenScore };
