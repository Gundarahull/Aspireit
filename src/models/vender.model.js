const mongoose = require('mongoose');

const sentimentSchema = new mongoose.Schema({
    text: String,
    sentiment: String,
    score: Number,
    date: { type: Date, default: Date.now }
  });
  
const Sentiment = mongoose.model('Sentiment', sentimentSchema);

module.exports =  Sentiment ; 

