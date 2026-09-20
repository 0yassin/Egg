from datetime import datetime, timedelta, timezone
import bcrypt   
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
import app.models as models
import app.schemas as schemas

SECRET_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.I9HHw_SGAKmS2oKtCpBfpwRvcs06_78R1VPuoZ0ol2o" # environment variable
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES =60 *24

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
def hash_password(password:str) -> str:
    salt= bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"),salt).decode("utf-8")

def verify_password(plain_password:str, hashed_password:str)-> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"),hashed_password.encode("utf-8"))

def create_access_token(data: dict)-> str:
    to_encode =data.copy()
    expire = datetime.now(timezone.utc) +timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode["exp"]=expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    token: str= Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    credentials_exception =HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload= jwt.decode(token,SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str =payload.get("sub")
        if user_id_str is None:
            raise credentials_exception
        token_data =schemas.TokenData(user_id=int(user_id_str))
    except(jwt.PyJWTError, ValueError):
        raise credentials_exception 
    
    user = (db.query(models.User).filter(models.User.id==token_data.user_id).first())
    if user is None:
        raise credentials_exception
    return user
    
