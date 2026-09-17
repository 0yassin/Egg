from datetime import datetime, timedelta, timezone
import bcrypt   
import jwt

SECRET_KEY= "" # environment variable
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES =60 *24

def hash_password(password:str) -> str:
    salt= bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"),salt).decode("utf.8")

def verify_password(plain_password:str, hashed_password:str)-> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"),hashed_password.encode("utf-8"))

def create_access_token(data: dict)-> str:
    to_encode =data.copy()
    expire = datetime.now(timezone.utc) +timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)