from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase , sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./egg.db"

engine =create_engine(  #central connection manager
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},  #allows fastAPI to handle multiple threads at once, unlike in sqlite
)

SessionLocal =sessionmaker(autocommit= False, autoflush=False, bind=engine) #produces sessions


class Base(DeclarativeBase):
    pass

def get_db():
    with SessionLocal() as db:
        yield db #save queries 
 


