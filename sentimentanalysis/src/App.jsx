import React, { useState } from 'react';

const SentimentAnalysis = () => {
    const [text, setText] = useState('');
    const [sentimentScore, setSentimentScore] = useState(null);

    const analyzeSentiment = async () => {
        try {
            const response = await fetch('https://sentiment-backend-1w0n.onrender.com:10000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const data = await response.json();
                setSentimentScore(data.sentiment);
            } else {
                // Handle any errors here
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Sentiment Analysis</h1>
            <div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="4"
                    cols="50"
                    placeholder="Enter text for analysis"
                    style={styles.textarea}
                ></textarea>
            </div>
            <div>
                <button onClick={analyzeSentiment} style={styles.button}>
                    Analyze
                </button>
            </div>
            <div id="result">
                {sentimentScore !== null && renderSentiment(sentimentScore)}
            </div>
        </div>
    );
};

function renderSentiment(score) {
    if (score <= -1) {
        return <strong style={{ fontWeight: 'bold' }}>Sentiment: Very Negative!</strong>;
    } else if (score >= 1) {
        return <strong style={{ fontWeight: 'bold' }}>Sentiment: Very Positive!</strong>;
    } else if (score > 0) {
        return <strong style={{ fontWeight: 'bold' }}>Sentiment: Positive</strong>;
    } else if (score === 0) {
        return <strong style={{ fontWeight: 'bold' }}>Sentiment: Neutral</strong>;
    } else {
        return <strong style={{ fontWeight: 'bold' }}>Sentiment: Negative</strong>;
    }
}


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        marginTop: '-100px', // Adjust the marginTop value as needed
    },
    textarea: {
    },
    button: {
        textAlign: 'center',
    },
};

export default SentimentAnalysis;