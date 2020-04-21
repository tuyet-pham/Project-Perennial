# Use an official Python runtime as a parent image
FROM python:latest

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/django

# RUN apk update \
#     && apk add --virtual build-deps gcc python-dev musl-dev
RUN apt-get update && apt-get upgrade -y && apt-get autoremove && apt-get autoclean
RUN apt-get install -y \
    libffi-dev \
    libssl-dev \
    libxml2-dev \
    libxslt-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zlib1g-dev \
    net-tools

# Install Python dependencies
COPY requirements.txt /app/django
RUN pip3 install --upgrade pip -r requirements.txt

#running extra commands
COPY entrypoint.sh /app/django/entrypoint.sh
RUN chmod +x entrypoint.sh

# Add the rest of the code
COPY . /app/django

# Make port 8000 available for the app
EXPOSE 8000

# otherwise the browser won't be able to find it
# ENTRYPOINT ["python", "manage.py"]
CMD ["./entrypoint.sh"]
