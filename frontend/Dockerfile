# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY my-app/package.json /app/package.json
COPY my-app/package-lock.json /app/package-lock.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

CMD ["npm", "start"]
