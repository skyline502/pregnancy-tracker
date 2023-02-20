from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  username = db.Column(db.String(50), nullable=False, unique=True)
  hashed_password = db.Column(db.String(255), nullable=False)
  profile_url = db.Column(db.String(2000), nullable=False)

  @property
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  @password.setter
  def password(self,password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'username': self.username,
      'profile_url': self.profile_url
    }
