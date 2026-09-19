from fastapi import FastAPI , HTTPException , status , Depends
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.database import Base, engine, get_db
import app.models as models
import app.schemas as schemas
from fastapi.middleware.cors import CORSMiddleware
from app.auth import hash_password


Base.metadata.create_all(bind=engine)
app = FastAPI(title="Memory EGG API")

origins =["http://localhost:5173", # vite react default port
          "http:/127.0.0.1:5173"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])



# adding user endpoint 
@app.post("/api/users",response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db:Session=Depends(get_db)):
    existing_user=(db.query(models.User).filter((models.User.username==user.username)| (models.User.email ==user.email)).first())
    if existing_user:
        raise  HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already registered :(")
    
    #will add password hashing later
    new_user =models.User(
        name=user.name,
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user 

#egg endpoints
@app.post("/api/eggs", response_model=schemas.EggResponse, status_code=status.HTTP_201_CREATED)
def create_egg(egg: schemas.EggCreate, db: Session=Depends(get_db)):
    new_egg = models.Egg(title=egg.title, user_id=egg.user_id, open_date=egg.open_date, is_sealed=True)
    db.add(new_egg)
    db.commit()
    db.refresh(new_egg)
    return new_egg

@app.get("/api/eggs/user/{user_id}", response_model=list[schemas.EggResponse])
def get_user_eggs(user_id:int, db: Session= Depends(get_db)):
    """Farm view: Fetches all eggs created by a specific user"""
    return db.query(models.Egg).filter(models.Egg.user_id==user_id).all()


# memory endpoints
@app.post("/api/eggs/{egg_id}/memories", response_model=schemas.MemoryResponse, status_code=status.HTTP_201_CREATED)
def add_memory(
    egg_id:int,
    memory:schemas.MemoryCreate, 
    db: Session =Depends(get_db),
):
    egg=db.query(models.Egg).filter(models.Egg.id==egg_id).first()
    if not egg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="egg not found")
    new_memory =models.Memory(egg_id=egg.id, content=memory.content)
    db.add(new_memory)
    db.commit()
    db.refresh(new_memory)
    return new_memory

@app.get("/api/eggs/{egg_id}/memories", response_model=list[schemas.MemoryResponse])
def get_egg_memories(egg_id:int, db:Session=Depends(get_db)):
    """Opening date: Unlocks memories only when target datetime has arrived """
    egg = db.query(models.Egg).filter(models.Egg.id==egg_id).first()
    if not egg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="egg not found")  
    current_time=datetime.now(timezone.utc)
    target_time=(
        egg.open_date
        if egg.open_date.tzinfo
        else egg.open_date.replace(tzinfo=timezone.utc)
    )  
    if current_time< target_time:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"this egg is sealed until {egg.open_date.isoformat()}! countdown is active :)")
        return egg.memories
        

    
    

  
