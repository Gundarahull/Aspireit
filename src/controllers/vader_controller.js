const  Sentiment  = require("../models/vender.model");
const vader = require("vader-sentiment");
// API Controller for sentiment analysis
const vaderController = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send({ error: "Text input is required" });
  }

  // Perform sentiment analysis using VADER
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  let sentiment;
  if (intensity.compound >= 0.05) {
    sentiment = "positive";
  } else if (intensity.compound <= -0.05) {
    sentiment = "negative";
  } else {
    sentiment = "neutral";
  }

  // Create a new sentiment record
  const sentimentRecord = new Sentiment({
    text,
    sentiment,
    score: intensity.compound,
  });

  // Save the sentiment record to MongoDB
  try {
    await sentimentRecord.save();
    res.send({ sentiment, score: intensity.compound });
  } catch (err) {
    res.status(500).send({ error: "Failed to save sentiment analysis result" });
  }
};

module.exports = vaderController;
