FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

#Solve the bcrypt invalid ELF header problem reinstaling it
RUN npm uninstall bcrypt
RUN npm i bcrypt

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]