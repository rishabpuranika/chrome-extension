function extractEcoFeatures(name) {
  const lower = name.toLowerCase();
  const features = [];

  const positive = ["bamboo", "recycled", "biodegradable", "eco", "eco-friendly", "organic", "fsc", "usda"];
  const negative = ["plastic", "synthetic"];

  for (const word of positive) if (lower.includes(word)) features.push(word);
  for (const word of negative) if (lower.includes(word)) features.push(word);

  return features;
}

module.exports = { extractEcoFeatures };
