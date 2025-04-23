import json
from transformers import pipeline

# Load sentiment classifier once on import
classifier = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english",
    framework="pt"
)

def analyze_sentiment(posts):
    texts = [post["text"] for post in posts]
    results = classifier(texts)
    return [
        {"text": t, "sentiment": r["label"], "score": r["score"]}
        for t, r in zip(texts, results)
    ]

def load_posts(filename="tweets.json"):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)

if __name__ == "__main__":
    posts = load_posts()
    results = analyze_sentiment(posts)
    print(results)
