const express = require("express");
const cors = require("cors");
const { calculateGreenScore } = require("./score/scorer");

const app = express();
app.use(cors());

app.get("/api/score", (req, res) => {
  const product = req.query.product;
  if (!product) return res.status(400).json({ error: "Product name is required." });

  const score = calculateGreenScore(product);
  res.json({ product, score });
});

app.listen(1000, () => console.log("✅ Green Score API running on http://localhost:1000/api/score?product=apple"));
