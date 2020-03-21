# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app/reactfrontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/reactfrontend/node_modules/.bin:$PATH


# install and cache app dependencies
COPY package.json /app/reactfrontend/package.json
COPY package-lock.json /app/reactfrontend/package-lock.json
RUN npm install
RUN npm config set unsafe-perm true
RUN npm install axios

RUN npm install react-scripts@3.0.1 -g

CMD ["npm", "start"]
