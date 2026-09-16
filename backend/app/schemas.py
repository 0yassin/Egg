from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime


# USER SCHEMAS
class UserCreate(BaseModel):
    name: str | None= None
    username:str = Field(min_length=3, max_length=50)
    email:emailStr
    password: str=Field(min_length=6)
    
class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes= True) 
    id: int
    name:str |None
    username: str
    email:emailStr
    bio: str|None
    
# egg schemas

class EggCreate(BaseModel):
    title:str = Field(min_length=1, max_length=100)
    user_id:int
    open_date:datetime
    
class EggResponse(BaseModel):
    model_config= ConfigDict(from_attributes=True)
    
    id:int
    title:str
    user:int
    open_date:datetime
    is_sealed: bool

# memory schemas
class MemoryCreate(BaseModel):  # defines what data is allowed to look like
    content: str =Field(min_length=1)

class MemoryResponse(BaseModel): # inherit from postbase and add id:int
    model_config =ConfigDict(from_attributes= True) # used this so that later pydantic can also read . attributes from database
    id:int 
    egg_id:int
    content:str
    