from fastapi import FastAPI , HTTPException , status , Request
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
from schemas import PostCreate, postResponse
from app.database import Base, engine
import app.models

Base.metadata.create_all(bind=engine)
app = FastAPI()

    
posts : list[dict] =[
    {
        "id":1,
        "author":"naitik",
        "title":"creating an egg",
        "content":"i use to be a very nerd guy but now i just play games",
        "date_posted":"15th sept",
    },
    {
        "id":2,
        "author":"yassin",
        "title":"creating an egg",
        "content":"i use to be a very nerd guy but now i just play games",
        "date_posted":"15th sept",
    },
]

# adding POST endpoint 
@app.post("/api/posts",response_model=postResponse, status_code=status.HTTP_201_CREATED)
def create_post(post:PostCreate):
    new_id =max(p["id"] for p in posts) +1 if posts else 1 
    new_post={
        "id": new_id,
        "author": post.author,
        "title": post.title,
        "content":post.content,
        "date_posted":post.date_posted  
    }
    posts.append(new_post)
    return new_post
    
    
@app.get("/", response_class=HTMLResponse, include_in_schema=False)
@app.get("/post", response_class= HTMLResponse, include_in_schema=False)
def home():
    return f"<h1>{posts[0]['content']}</h1>"
  
@app.get("/api/posts", response_model=list[postResponse])
def get_posts():
    return posts

@app.get("/api/posts/{post_id}", response_model=postResponse)
def get_post(post_id: int):
    for post in posts:
        if(post.get("id")==post_id):
            return post 
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="post not found oops")
      
