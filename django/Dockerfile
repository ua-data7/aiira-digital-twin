# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /django

# Install dependencies
COPY requirements.txt /django/
RUN pip install -r requirements.txt

# Copy project files
COPY . /django/

# Collect static files
RUN python manage.py collectstatic --noinput
