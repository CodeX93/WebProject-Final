FROM --platform=linux/amd64 node:19
WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3005
CMD ["node", "server.js"]