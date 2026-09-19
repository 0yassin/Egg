from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import DeclarativeBase , sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://ucvjxgyiN1QgBPs.root:afk1vyzicVb9Gj4D@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test?ssl_verify_cert=true"
engine =create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_recycle=3600 ,# refreshes connection before mysql drop them
    pool_pre_ping=True #chcks connection condition before executing
)

SessionLocal =sessionmaker(autocommit= False, autoflush=False, bind=engine) #produces sessions


class Base(DeclarativeBase):
    pass

def migrate_database():
    """Adds missing columns to existing tables without wiping data."""
    inspector = inspect(engine)
    if "memories" in inspector.get_table_names():
        existing_columns = {col["name"] for col in inspector.get_columns("memories")}
        if "title" not in existing_columns:
            with engine.begin() as connection:
                connection.execute(
                    text("ALTER TABLE memories ADD COLUMN title VARCHAR(200) NOT NULL DEFAULT ''")
                )

def get_db():
    db = SessionLocal()
    try:
        yield db #save queries 
    finally:
        db.close()
 


