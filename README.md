# Life Notes

Monorepo de la app de comunidad Life Notes. Ver [kickoff-app-life-notes.md](./kickoff-app-life-notes.md)
para contexto completo del proyecto y las fases del MVP.

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
   - `MONGODB_URI`: connection string de un cluster de MongoDB Atlas.
   - `R2_*`: credenciales de un bucket de Cloudflare R2 (API token con permisos de
     lectura/escritura sobre el bucket).
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`: de una app de Clerk
     (dashboard.clerk.com).

3. Instalar dependencias y correr en desarrollo:

   ```bash
   npm install
   npm run dev
   ```

4. (Opcional) Crear los índices iniciales en MongoDB:

   ```bash
   npm run db:init-indexes
   ```

## Estado actual (Fase 1)

- ✅ Next.js + TypeScript + Tailwind en `apps/web`.
- ✅ Conexión a MongoDB Atlas (`src/lib/mongodb.ts`).
- ✅ Cliente Cloudflare R2 para subir/firmar URLs de archivos (`src/lib/r2.ts`).
- ✅ Autenticación con Clerk (`src/proxy.ts`, páginas `/sign-in` y `/sign-up`).
- ✅ Modelos de datos iniciales (`src/models`): miembros/perfiles, eventos,
  registros a eventos, sesiones de coaching.

Siguiente paso: Fase 2 — registro/login completo y edición de perfil de usuaria.
