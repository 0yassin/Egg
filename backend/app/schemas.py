from pydantic import BaseModel, ConfigDict, Field , EmailStr
from datetime import datetime


# USER SCHEMAS
class UserCreate(BaseModel):
    name: str 
    username:str = Field(min_length=3, max_length=50)
    email:EmailStr
    password: str=Field(min_length=8)
    
class UserLogin(BaseModel):
    username_or_email: str
    password: str
    
class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes= True) 
    id: int
    name:str |None
    username: str
    email:EmailStr
    
    
class UserPublic(BaseModel):
    pass  # will add this later in week 2 , currently only Usercreate which is bascically publiccreate

class UserUpdate(BaseModel):
    name: str |None =Field(default=None, min_length=1,  max_length=20)
    username: str |None =Field(default=None, max_length=50)
    email:str |None=Field(default=None , max_length=120)

#authentication schemas 

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    user_id: int | None =None
    
# egg schemas

class EggCreate(BaseModel):
    title:str = Field(min_length=1, max_length=100)
    user_id:int
    open_date:datetime

class EggUpdate(BaseModel):
    title: str | None =Field(None, min_length=1, max_length=100)
    open_date:datetime |None =None 
    is_sealed: bool | None =None
    
class EggResponse(BaseModel):
    model_config= ConfigDict(from_attributes=True)
    
    id:int
    title:str
    user_id:int
    open_date:datetime
    is_sealed: bool
    


# memory schemas
class MemoryCreate(BaseModel):  # defines what data is allowed to look like
    content: str =Field(min_length=1)
    
# class Update(BaseModel):
#     content: str | None =Field(default=None, min_length=1)

class MemoryResponse(BaseModel): # inherit from postbase and add id:int
    model_config =ConfigDict(from_attributes= True) # used this so that later pydantic can also read . attributes from database
    id:int 
    egg_id:int
    content:str
