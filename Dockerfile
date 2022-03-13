FROM node:16.5.0

WORKDIR /app

# Copy package.json files to install node packages
COPY ./package*.json ./
RUN npm install

# Copy source code to app folder and build
COPY . .
RUN  npm run build

EXPOSE 33000

CMD ["npm","run","start"]
