# Kickoff — App de comunidad "Life Notes" (Pilar)

## Contexto del proyecto

Estoy construyendo una app de comunidad para mujeres, a partir de un grupo de WhatsApp
existente ("Life Notes", ~250-270 personas, sucesor de una startup llamada The Uma Network).
La dueña, Pilar, es coach y organiza eventos y sesiones de coaching/inversión.

**Objetivo del MVP**: dar a las miembros un lugar donde puedan:
1. Crear una cuenta y llenar su perfil (foto, bio, intereses/profesión).
2. Ver un directorio de miembros y contactarse entre ellas.
3. Ver los eventos que Pilar organiza, registrarse y pagar su lugar.
4. Agendar una sesión de coaching/inversión 1:1 con Pilar (pagada).

**Escala esperada**: 150-200 usuarias activas al inicio. No hay reparto de ingresos entre
miembros — Pilar cobra directamente por sus propios eventos y sesiones.

**Estilo visual**: minimalista y profesional, en línea con el branding personal de Pilar en
Instagram (se definirán colores/tipografía exactos más adelante con sus assets de marca).

## Stack propuesto

Reutilizando lo que ya conozco de un proyecto previo (web de scouting, hecha con
Vercel + MongoDB + Cloudflare R2 + GitHub), extendido para que funcione como app móvil real:

| Capa | Herramienta | Por qué |
|---|---|---|
| App móvil (iOS/Android) | **React Native + Expo** | Comparte lenguaje (React/TS) y lógica con la web; permite publicar a App Store/Play Store vía EAS Build |
| Web (panel/admin y páginas públicas) | **Next.js** en **Vercel** | Ya lo conozco; sirve para landing, panel de Pilar y API |
| API / backend | **Next.js API routes** (o servicio Node/Express aparte si crece) | Un solo repo, deploy simple en Vercel |
| Base de datos | **MongoDB Atlas** | Ya lo conozco; free tier alcanza para este volumen |
| Almacenamiento de archivos (fotos de perfil, imágenes de eventos) | **Cloudflare R2** | Ya lo conozco; barato y sin egress fees |
| Autenticación | **Clerk** (o Auth.js si se prefiere) | Soporta Next.js y React Native con el mismo proveedor, evita construir auth desde cero |
| Pagos | **Stripe** (Checkout + webhooks) | Estándar para pagos por evento/sesión, fácil de probar en modo test |
| Agenda para coaching | **Link/embed de Calendly** al inicio | Rápido de integrar; se puede reemplazar por algo propio después |
| Control de versiones | **GitHub** (monorepo) | Ya lo conozco |
| CI/CD | Deploy automático en Vercel (web/API) + **EAS Build** (móvil) | Estándar para este stack |

## Estructura de repo sugerida (monorepo)

```
life-notes-app/
├── apps/
│   ├── web/         # Next.js: landing, panel admin, API routes
│   └── mobile/      # Expo (React Native)
├── packages/
│   └── shared/      # tipos, lógica de negocio y llamadas a API compartidas
├── package.json
└── turbo.json       # (opcional, si se usa Turborepo para manejar el monorepo)
```

## Fases del MVP (en orden)

1. **Base del proyecto**: inicializar monorepo, configurar Next.js + TypeScript + Tailwind,
   conectar MongoDB Atlas, configurar variables de entorno y Cloudflare R2.
2. **Autenticación y perfiles**: registro/login (Clerk), crear/editar perfil de usuaria.
3. **Directorio de miembros**: listado con filtros básicos, ver perfil de otra miembro,
   forma de contacto (ej. abrir chat o mostrar datos de contacto según privacidad).
4. **Eventos**: Pilar puede crear eventos desde el panel admin; miembros ven eventos,
   se registran y pagan con Stripe.
5. **Coaching/booking**: sección para agendar sesión 1:1 (embed de Calendly + pago con Stripe).
6. **App móvil (Expo)**: envolver las pantallas clave (login, directorio, eventos) en
   React Native, reutilizando la lógica de `packages/shared`.
7. **Pulido de marca**: aplicar diseño final una vez Pilar comparta sus assets de marca.

## Petición para Claude Code

Ayúdame a:
1. Inicializar este monorepo con la estructura de arriba.
2. Configurar Next.js (TypeScript + Tailwind) en `apps/web`, con conexión a MongoDB Atlas
   y Cloudflare R2 (usando variables de entorno, sin hardcodear credenciales).
3. Configurar Clerk para autenticación en `apps/web`.
4. Dejar listo el modelo de datos inicial en MongoDB para: usuarias/perfiles, eventos,
   registros a eventos, y sesiones de coaching.
5. Una vez lista la base, seguimos fase por fase según la lista de arriba — empezando por
   autenticación y perfiles (Fase 2).

No necesito la app móvil (Expo) todavía — primero quiero tener sólida la base web/API.
