FROM python:3.8-alpine

WORKDIR /app/data
RUN apk update \
    && apk add curl

COPY perennialData.sh /app/data

RUN chmod +x perennialData.sh

COPY . /app/data

CMD [ "./perennialData.sh" ]