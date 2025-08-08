# Use official Python 3.11 base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies for gevent, cryptography, and database
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the application with Gunicorn and gevent workers for better I/O handling
# Using 4 workers as a good starting point for a bar application
CMD ["gunicorn", "-k", "gevent", "-w", "4", "--bind", "0.0.0.0:5000", "wsgi:app"]