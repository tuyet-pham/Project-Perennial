FROM python:3.8-buster

WORKDIR /code

COPY requirements.txt /code
RUN pip install -r requirements.txt

COPY mqtt_client.py /code

CMD [ "python", "-u", "./mqtt_client.py" ]
