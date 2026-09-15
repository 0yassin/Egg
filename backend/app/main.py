from fastapi import FastAPI

from fastapi.responses import HTMLResponse
app = FastAPI()

posts : list[dict] =[
    {
        "id":1,
        "author":"naitik",
        "title":"creating an egg",
        "content":"i use to be a very nerd guy but now i just play games",
        "date-posted":"15th sept",
    },
    {
        "id":2,
        "author":"yassin",
        "title":"creating an egg",
        "content":"i use to be a very nerd guy but now i just play games",
        "date-posted":"15th sept",
    },
]

@app.get("/", response_class=HTMLResponse, include_in_schema=False)
@app.get("/post", response_class= HTMLResponse, include_in_schema=False)
def home():
    return f"<h1>{posts[0]['content']}</h1>"
  
@app.get("/api/posts")
def get_posts():
    return posts