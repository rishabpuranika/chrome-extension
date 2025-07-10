const synonyms = {
  "eco": ["eco", "eco-friendly", "green", "sustainable"],
  "plastic": ["plastic", "polymer", "pet"],
  "recycled": ["recycled", "repurposed", "upcycled"],
  "bamboo": ["bamboo"],
  "organic": ["organic", "natural", "chemical-free"]
};

function normalizeKeywords(name) {
  const result = [];
  const lower = name.toLowerCase();

  for (const [key, syns] of Object.entries(synonyms)) {
    if (syns.some(w => lower.includes(w))) result.push(key);
  }

  return result;
}

module.exports = { normalizeKeywords };
