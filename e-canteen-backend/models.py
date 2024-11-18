from sqlalchemy.orm import Mapped, mapped_column
from database import db
from datetime import datetime
class Student(db.Model):
    order_id: Mapped[int] = mapped_column(primary_key=True)
    id: Mapped[int]
    orders: Mapped[str]
    status : Mapped[str]
class Food(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    imageUrl:Mapped[str]