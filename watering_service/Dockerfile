FROM python:3.8-buster

# Install cron
RUN apt-get update && apt-get -y install cron

# Install python requirements
COPY requirements.txt /requirements.txt
RUN pip install -r requirements.txt

# Get cron file and script file
COPY entrypoint.sh /entrypoint.sh
COPY watering_service.py /watering_service.py

# Make executable
RUN chmod +x /entrypoint.sh /watering_service.py

# Start container
CMD /entrypoint.sh


