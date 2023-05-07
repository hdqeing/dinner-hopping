FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
# 把源代码复制过去， 以便报错能报对行
COPY --from=build /app/src ./src
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/startup.sh ./
RUN chmod +x startup.sh

RUN npm install --omit=dev

EXPOSE 4365

CMD [ "./startup.sh" ]
