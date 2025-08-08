from flask import Flask
from .config import Config
from .models import db
from .routes import main
from flask_cors import CORS



def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for all routes
    CORS(app, supports_credentials=True)

    # Initialize extensions
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(main)

    # Create database tables
    with app.app_context():
        db.create_all()

    return app