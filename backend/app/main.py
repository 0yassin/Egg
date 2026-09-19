from fastapi import FastAPI , HTTPException , status , Depends # core fastapi utilities
from datetime import datetime, timezone #for egg open date and countdown
from sqlalchemy.orm import Session #imports dabatabse session
from app.database import Base , engine, get_db, migrate_database # Base holds table metadata ,engine manages connection
import app.models as models #for tables
import app.schemas as schemas 
from fastapi.middleware.cors import CORSMiddleware #create table in egg.db
from app.auth import (hash_password, get_current_user, verify_password, create_access_token)
from fastapi.security import OAuth2PasswordRequestForm

Base.metadata.create_all(bind=engine) 
migrate_database()
app = FastAPI(title="Memory EGG API")

origins =["http://localhost:5173", # vite react default port
          "http://127.0.0.1:5173"]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])



# adding user endpoint 
@app.post("/api/users",response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED) #defines user endpoints
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
    db.add(new_user) #stages
    db.commit() #saves the info db file
    db.refresh(new_user)# load new fb fields .common lines in all endpoints
    return new_user 

#egg endpoints
@app.post("/api/eggs", response_model=schemas.EggResponse, status_code=status.HTTP_201_CREATED) #post capsule
def create_egg(
    egg: schemas.EggCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
): #recieve egg data
    new_egg = models.Egg(title=egg.title, user_id=current_user.id, open_date=egg.open_date, is_sealed=True)
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
    egg=db.query(models.Egg).filter(models.Egg.id==egg_id).first() #models.Egg.id==egg_id checks if egg exists
    if not egg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="egg not found")
    new_memory =models.Memory(egg_id=egg.id, title=memory.title, content=memory.content)
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

#auth 
@app.post("/api/auth/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db)
):
    # form_data.username contains whatever was typed into the username box
    user = (
        db.query(models.User)
        .filter(
            (models.User.username == form_data.username)
            | (models.User.email == form_data.username)
        )
        .first()
    )
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
@app.get("/api/users/me", response_model=schemas.UserResponse)
def get_current_user_profile(current_user: models.User=Depends(get_current_user)):
    return current_user

@app.patch("/api/users/me", response_model=schemas.UserResponse)
def update_profile(
    user_data: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db:Session = Depends(get_db)
):
    if user_data.name is not None:
        current_user.name=user_data.name
    if user_data.username is not None:
        #checking if its alr exits
        existing=(db.query(models.User).filter(models.User.username == user_data.username, models.User.id!= current_user.id).first())
        if existing: 
           raise HTTPException(status_code=400, detail="username already being used by someone else")
        current_user.username =user_data.username
    if user_data.email is not None:
        existing_email=(db.query(models.User).filter(
                models.User.email == user_data.email,
                models.User.id != current_user.id,
            )
            .first()
        )
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already being used by someone else")
        current_user.email = user_data.email
    db.commit()
    db.refresh(current_user)
    return current_user
