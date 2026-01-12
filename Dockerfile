FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm 
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --from=builder /app/dist  ./dist

RUN addgroup -g 1001 -S nodejs && \ 
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app
USER nestjs
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
