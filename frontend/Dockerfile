FROM node:18

WORKDIR /frontend
COPY package.json package-lock.json /frontend/
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3005