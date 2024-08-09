FROM node:20-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./

# Omit --production flag for TypeScript devDependencies
RUN corepack enable pnpm && pnpm i; 

COPY . . 

# public env variables unfortunately have to be defined at build time
# as they are baked into the image
ARG BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GITHUB_PROFILE_URL
ARG NEXT_PUBLIC_CONTACT_RECIPIENT
ARG NEXT_PUBLIC_LINKEDIN_PROFILE_URL
ARG NEXT_PUBLIC_GERMAN_RESUME_URL
ARG NEXT_PUBLIC_ENGLISH_RESUME_URL
ARG NEXT_PUBLIC_FILE_API_PATH
ARG NEXT_PUBLIC_CDN_URL

# ARG NEXT_PUBLIC_AXIOM_TOKEN
# ARG NEXT_PUBLIC_AXIOM_DATASET

ENV SKIP_ENV_VALIDATION=1

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN pnpx prisma generate 
RUN pnpm build;

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# COPY --from=builder /app/. ./
COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone /app/next.config.js /app/postcss.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/tailwind.config.ts ./ 

# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]