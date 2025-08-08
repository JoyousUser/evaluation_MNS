from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Cocktail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    music_ambiance = db.Column(db.String(200))
    image_prompt = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_input = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ingredients': self.ingredients,
            'description': self.description,
            'music_ambiance': self.music_ambiance,
            'image_prompt': self.image_prompt,
            'created_at': self.created_at.isoformat(),
            'user_input': self.user_input
        }
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password
        }

