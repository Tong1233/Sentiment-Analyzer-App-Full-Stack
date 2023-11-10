// server.js
const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');
const cors = require('cors'); // Import the cors package
const tokenizer = new natural.WordTokenizer();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors()); // Use the cors middleware to enable CORS handling
app.use(bodyParser.json());

app.post('/analyze', (req, res) => {
    const { text } = req.body;

    // Tokenize the text
    const tokens = tokenizer.tokenize(text);

    // Analyze sentiment using natural library (you can use other libraries or APIs here)
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    const sentiment = analyzer.getSentiment(tokens);

    res.json({ sentiment });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
