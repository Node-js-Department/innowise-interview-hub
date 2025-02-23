##### DEPENDENCIES

FROM --platform=linux/amd64 node:20-alpine3.18 AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager

COPY .. .

##### BUILDER

FROM --platform=linux/amd64 node:20-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY .. .

RUN SKIP_ENV_VALIDATION=1 yarn build --filter='!client'

##### RUNNER

FROM --platform=linux/amd64 node:20-alpine3.18 AS runner
RUN apk add --no-cache curl
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 core

# Copying of internal packages (from monorepo)
COPY --from=builder --chown=core:nodejs /app/packages/ ./src/packages/

COPY --from=builder --chown=core:nodejs /app/apps/microservices/core/dist src
COPY --from=builder --chown=core:nodejs /app/node_modules src/node_modules
USER core
EXPOSE 8005
CMD ["node", "src/src/main.js"]
