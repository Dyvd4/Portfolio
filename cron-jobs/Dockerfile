FROM node:22-alpine

WORKDIR /app
COPY . .

RUN npm i -g pnpm@10
RUN pnpm i

CMD [ "pnpm", "run", "start" ]