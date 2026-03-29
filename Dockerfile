#this docker file will include two separate stage for building and prod
FROM node:24-alpine AS builder

#installing pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

#the default app directory in docker
WORKDIR /app

# Optional: pass API URL at build time (same as VITE_API_URL in .env), e.g.
#   docker build --build-arg VITE_API_URL=https://api.example.com/api .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

#copy package files
COPY package.json  pnpm-lock.yaml* ./

#install dependecies
RUN pnpm install --frozen-lockfile

# Vite loads .env, .env.production, .env.local, etc. during `pnpm run build`.
# Copy these from the build context (not listed in .dockerignore). At least
# `.env.example` matches `.env*` so this layer succeeds even without a custom .env.
COPY .env* ./

#copying application code
COPY . .

#build the application
RUN pnpm run build

#production stage
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/dist  ./dist

# Keep container running (Caddy will serve the files)
CMD ["tail", "-f", "/dev/null"]