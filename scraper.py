import os
import json
import tweepy
from dotenv import load_dotenv

load_dotenv()

# Setup Tweepy client
client = tweepy.Client(
    bearer_token=os.getenv("BEARER_TOKEN"),
    consumer_key=os.getenv("API_KEY"),
    consumer_secret=os.getenv("API_SECRET"),
    access_token=os.getenv("ACCESS_TOKEN"),
    access_token_secret=os.getenv("ACCESS_SECRET")
)

def get_posts(query: str, count: int = 5, filename: str = "tweets.json"):
    english_tweets = []
    next_token = None

    try:
        while len(english_tweets) < count:
            remaining_count = count - len(english_tweets)
            # Force max_results to be at least 10 (the API requires a value between 10 and 100)
            max_results = remaining_count if remaining_count >= 10 else 10

            tweets = client.search_recent_tweets(
                query=query,
                max_results=max_results,
                tweet_fields=["created_at", "text", "lang"],
                next_token=next_token
            )

            if not tweets.data:
                break

            # Filter for English tweets
            english_tweets.extend([tweet for tweet in tweets.data if tweet.lang == "en"])
            next_token = tweets.meta.get("next_token")
            if not next_token:
                break

    except tweepy.TooManyRequests:
        print("[WARNING] Rate limit hit — using cached tweets.json")
        if os.path.exists(filename):
            with open(filename, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    # Slice to exactly `count` tweets (even if more tweets were retrieved)
    english_tweets = english_tweets[:count]
    posts = [{"text": tweet.text, "time": str(tweet.created_at)} for tweet in english_tweets]

    # Save posts to file
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    return posts

if __name__ == "__main__":
    posts = get_posts("AI", count=5)
    print(posts)
