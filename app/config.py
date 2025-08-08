import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///cocktails.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    AI_TEMPERATURE = float(os.environ.get('AI_TEMPERATURE', 0.7))
    AI_MAX_TOKENS = int(os.environ.get('AI_MAX_TOKENS', 500))
    MAX_HISTORY_DAYS = int(os.environ.get('MAX_HISTORY_DAYS', 365))