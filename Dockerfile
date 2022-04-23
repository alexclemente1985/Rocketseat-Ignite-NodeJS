FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN yarn

#Solve the bcrypt invalid ELF header problem reinstaling it
RUN yarn remove bcrypt
RUN yarn add bcrypt

COPY . .

EXPOSE 3333

CMD ["yarn","dev"]