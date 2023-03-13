FROM node:lts-alpine3.17

WORKDIR /frontend
COPY . .
RUN npm install
# RUN npm run build
EXPOSE 3005

CMD ["npm", "run", "dev"]