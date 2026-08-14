FROM node:20-slim

WORKDIR /app

COPY package.json ./
COPY backend/package.json ./backend/
COPY backend/src ./backend/src
COPY backend/.env.example ./backend/

RUN cd backend && npm install --production=false

EXPOSE 3001

CMD ["node", "backend/dist/index.js"]
