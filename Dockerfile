FROM node:18-alpine3.17
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm uninstall bcrypt
RUN npm i bcrypt
RUN npm run build
CMD ["npm", "run", "start:dev"]