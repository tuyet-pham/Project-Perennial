FROM python:3.8-buster

WORKDIR /code

COPY requirements.txt /code
COPY mqtt_client.py /code

RUN pip install -r requirements.txt

CMD [ "python", "-u", "./mqtt_client.py" ]