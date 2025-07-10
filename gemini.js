const GEMINI_API_KEY = "AIzaSyDvxQ9ryKAfZCJn9bXx5uwpB7GesjI8vXw";

async function generateGeminiSummary(productName, greenScore) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;

  const prompt = `
You are a sustainability expert. A user is viewing the product "${productName}", which has a Green Score of ${greenScore} out of 100.
Explain what this score likely means in terms of environmental friendliness and sustainability.
Give a friendly, short summary about the product’s potential ecological impact and how it could be improved.
`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";
  } catch (err) {
    return "Failed to fetch summary from Gemini.";
  }
}
