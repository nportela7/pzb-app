# PZB App

Monorepo de la app oficial de Pilar Zambrano B. Ver
[Brief App PilarZambranoB.pdf](./Brief%20App%20PilarZambranoB.pdf) para el contexto completo del
proyecto (los 5 pilares, pricing, tono de marca).

## Estructura

```
apps/
  web/         # Next.js (TypeScript + Tailwind): landing, panel admin, API routes
packages/
  shared/      # tipos y lógica compartida (se usará al agregar la app móvil)
```

## Setup local — `apps/web`

1. Copiar variables de entorno:

   ```bash
   cd apps/web
   cp .env.example .env.local
   ```

2. Completar en `.env.local`:
   - `MONGODB_URI`: connection string de un cluster de MongoDB Atlas (o correr
     `npm run dev-db` para levantar un Mongo en memoria solo de desarrollo, con
     datos de prueba, sin tocar Atlas).
   - `R2_*`: credenciales de un bucket de Cloudflare R2.
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`: de una app de Clerk
     (dashboard.clerk.com). En desarrollo, Clerk genera llaves temporales
     automáticamente si se dejan vacías; en producción son obligatorias.

3. Instalar dependencias y correr en desarrollo:

   ```bash
   npm install
   npm run dev
   ```

## Despliegue

- **GitHub**: repo privado, conectado a Vercel — cada push a `main` dispara un
  deploy automático.
- **Vercel**: [pzb-app.vercel.app](https://pzb-app.vercel.app). El Root Directory
  del proyecto está fijado a `apps/web` (monorepo). Variables de entorno de
  producción se configuran en el dashboard de Vercel, no se commitean.

## Estado actual

- ✅ Base técnica: Next.js + TypeScript + Tailwind, MongoDB Atlas, Cloudflare R2,
  autenticación con Clerk.
- ✅ Identidad visual de marca aplicada (Fraunces / Source Sans 3 / Cedarville
  Cursive + paleta Beige Sand / Earth Brown / Dark Pine).
- ✅ Onboarding con tipo de cuenta (Persona / Empresa) y home condicional.
- ✅ Directorio de socias con búsqueda por nombre/profesión/palabra clave.
- ✅ Módulo Coaching (The Alignment Partnership) completo: journey de 3 fases,
  inversión, testimonios, CTA a WhatsApp.
- ⏳ Pendiente: Add-Ons, Eventos, Zere Studio y Sobre Pilar (placeholders por
  ahora); credenciales reales de Clerk/Mongo Atlas para que el deploy de Vercel
  funcione de punta a punta.
