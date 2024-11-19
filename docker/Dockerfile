# Backend Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Run the application
CMD ["python", "app.py"]

# Frontend Dockerfile
FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend code
COPY frontend/ .

# Build the application
RUN npm run build

# Install serve
RUN npm install -g serve

# Run the application
CMD ["serve", "-s", "build", "-l", "3000"]