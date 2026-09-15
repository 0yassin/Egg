from pydantic import BaseModel, ConfigDict, Field

class postBase(BaseModel):
    author:str =Field(min_length=1 , max_length=50)
    title:str=Field(min_length=1, max_length=100)
    content:str= Field(min_length=1)
    date_posted:str
    
class PostCreate(postBase):
    pass

class postResponse(postBase):
    model_config =ConfigDict(from_attributes= True) # used this so that later pydantic can also read . attributes from database
    id:int 
    
    