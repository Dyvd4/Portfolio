FROM node:22-alpine

WORKDIR /app
COPY . .

RUN npm i -g pnpm
RUN pnpm i

CMD [ "pnpm", "run", "start" ]