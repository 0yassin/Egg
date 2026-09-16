from __future__ import annotations
from datetime import UTC, datetime
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text

from sqlalchemy.orm import  Mapped, mapped_column, relationship

from app.database import Base
class User(Base):
    __tablename__= "users"
    
    id:Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name:Mapped[str] = mapped_column(String(67), unique=False, nullable=False)
    username:Mapped[str]= mapped_column(String(67), unique=True, nullable=False)
    bio:Mapped[str|None]=mapped_column(String(267), nullable=True)
    email:Mapped[str]=mapped_column(String(67), unique=True, nullable=False)
    password:Mapped[str ]=mapped_column(String(250), nullable=False)
    
    #for many eggs
    eggs:Mapped[list[Egg]] = relationship(back_populates="owner", cascade="all, delete-orphan")
    

class Egg(Base):
    __tablename__ ="eggs"
    
    id:Mapped[int]= mapped_column(Integer, primary_key=True, index=True)
    title:Mapped[str] = mapped_column(String(100), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    open_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    is_sealed:Mapped[bool]=mapped_column( default=False)
    email_sent:Mapped[bool]=mapped_column( default=False)
    
    #relationship
    owner:Mapped[User]=relationship(back_populates="eggs")
    memories:Mapped[list[Memory]] = relationship(back_populates="egg", cascade="all, delete-orphan")
    
class Memory(Base):
    __tablename__ ="memories"
    id: Mapped[int]=mapped_column(Integer, primary_key=True, index=True)
    egg_id:Mapped[int]=mapped_column(ForeignKey("eggs.id"),nullable=False)
    content:Mapped[str]= mapped_column(Text, nullable=False)
    
    #relationship
    egg:Mapped[Egg] = relationship(back_populates="memories")