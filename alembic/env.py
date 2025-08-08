from logging.config import fileConfig
import os
import sys
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
import importlib.util

# Add the project root to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, '..'))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Load environment variables
try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass  # dotenv is optional for local development

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Add your model's MetaData object for 'autogenerate' support
try:
    # Try to import the app and models directly
    from app import create_app
    from app.models import db

    target_metadata = db.metadata
    print("Successfully imported app module")
except ImportError as e:
    print(f"Warning: Could not import app module directly: {e}")
    print("Attempting alternative import method...")

    # Alternative approach if direct import fails
    try:
        # Try to find and load the app module dynamically
        app_path = os.path.join(project_root, 'app')
        if os.path.isdir(app_path) and os.path.isfile(os.path.join(app_path, '__init__.py')):
            spec = importlib.util.spec_from_file_location("app", os.path.join(app_path, '__init__.py'))
            app = importlib.util.module_from_spec(spec)
            sys.modules["app"] = app
            spec.loader.exec_module(app)

            # Now try to get the db object
            if hasattr(app, 'db'):
                db = app.db
                target_metadata = db.metadata
                print("Successfully imported app module dynamically")
            else:
                print("Warning: app module loaded but no db object found")
                target_metadata = None
        else:
            print(f"Warning: app directory not found at {app_path}")
            target_metadata = None
    except Exception as e:
        print(f"Warning: Failed to import app module dynamically: {e}")
        target_metadata = None


def get_url():
    """Get database URL from environment or use default SQLite"""
    return os.getenv("DATABASE_URL", "sqlite:///cocktails.db")


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        render_as_batch=True  # Required for SQLite batch operations
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    if target_metadata is None:
        raise ImportError("Could not load target_metadata. Check your app module configuration.")

    # Create the Flask app to get the correct configuration
    try:
        app = create_app()
    except NameError:
        # Fallback if create_app wasn't imported successfully
        from flask import Flask
        app = Flask(__name__)
        app.config.from_object('app.config.Config')

    with app.app_context():
        # Get the engine from the Flask-SQLAlchemy instance
        connectable = db.engine

        with connectable.connect() as connection:
            context.configure(
                connection=connection,
                target_metadata=target_metadata,
                compare_type=True,
                render_as_batch=True
            )

            with context.begin_transaction():
                context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()