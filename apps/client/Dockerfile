##### DEPENDENCIES

FROM --platform=linux/amd64 node:20-alpine3.18 AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Install dependencies based on the preferred package manager

COPY . .

##### BUILDER

FROM --platform=linux/amd64 node:20-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn db:generate

RUN SKIP_ENV_VALIDATION=1 yarn build:client
##### RUNNER

FROM --platform=linux/amd64 node:20-alpine3.18  AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/standalone src/
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/static src/apps/client/.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "src/apps/client/server.js"]
