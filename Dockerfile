# Build- und Laufzeit-Image für die Website "Werde Meister deiner Gedanken"
# Next.js 16 benötigt Node >= 20.9 – wir nehmen Node 22 LTS.

# ---------- Abhängigkeiten ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Build ----------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* wird zur Buildzeit in den Client-Code eingebacken,
# muss also hier vorliegen – nicht erst zur Laufzeit.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- Laufzeit ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Nicht als root laufen lassen
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
# Mitglieder-PDFs. Liegen bewusst außerhalb von public/, damit Next.js sie
# nicht direkt ausliefert – sie kommen ausschließlich über die Routen unter
# /mitglieder, also hinter dem Login. Ohne diese Zeile fehlen sie zur
# Laufzeit und die Routen antworten mit 404.
COPY --from=builder /app/content ./content
# --chown ist hier nicht kosmetisch: Next.js schreibt den ISR-/Prerender-Cache
# zur Laufzeit nach .next/server/app/ zurück. Ohne Schreibrecht für den
# nextjs-User meldet der Container bei jeder Revalidierung
# "Failed to update prerender cache ... EACCES" und rendert die Seite bei
# jedem Abruf neu, statt sie zu cachen.
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
