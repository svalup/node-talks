FROM node:14-alpine

WORKDIR /app

COPY dist/apps/api/ .

RUN npm install

EXPOSE 3000

CMD ["node", "main"]