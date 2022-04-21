FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN #npm run build
EXPOSE 3000
CMD ["npm", "start"]