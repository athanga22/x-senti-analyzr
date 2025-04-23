from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from scraper import get_posts
from sentiment import analyze_sentiment

app = FastAPI()

# Specify allowed origins (React dev server, etc.)
origins = [
    "http://localhost:5173",
    # Add more domains if needed, e.g. "https://my-production-domain.com"
]

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analyze")
def analyze(keyword: str, count: int = 5):
    if not keyword.strip():
        raise HTTPException(status_code=400, detail="Keyword must not be empty.")

    posts = get_posts(query=keyword, count=count)

    if not posts:
        return {
            "positive": 0,
            "negative": 0,
            "total": 0,
            "message": "No tweets found.",
            "posts": []
        }

    results = analyze_sentiment(posts)
    total = len(results)
    positive = sum(1 for r in results if r["sentiment"] == "POSITIVE") / total * 100
    negative = sum(1 for r in results if r["sentiment"] == "NEGATIVE") / total * 100

    return {
        "positive": round(positive, 2),
        "negative": round(negative, 2),
        "total": total,
        "posts": results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
