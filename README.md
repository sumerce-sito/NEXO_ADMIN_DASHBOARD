# NEXO Admin Dashboard

Dashboard administrativo construido con Next.js para monitorear productos, lotes, codigos QR, analitica y configuracion operacional.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Base UI / shadcn-style components
- Recharts
- react-simple-maps

## Requisitos

- Node.js 20 o superior
- npm

## Instalacion

```bash
npm install --legacy-peer-deps
```

Se usa `--legacy-peer-deps` porque `react-simple-maps@3` declara peer dependencies antiguas de React, mientras el proyecto usa React 19.

## Desarrollo

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

Si el puerto `3000` esta ocupado, puedes ejecutar:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3001
```

## Build

```bash
npm run build
```

## Produccion local

```bash
npm run start
```

## Rutas principales

- `/` - Dashboard general
- `/productos` - Gestion de productos
- `/lotes` - Gestion de lotes
- `/codigos` - Codigos QR
- `/analytics` - Analitica y mapa de Colombia
- `/configuracion` - Configuracion del sistema

## Estructura

```text
app/          Rutas y paginas de Next.js
components/   Componentes de interfaz
components/ui Componentes base reutilizables
lib/          Datos y utilidades
public/       Assets publicos y mapas
```

## Notas

- `node_modules`, `.next` y logs locales estan ignorados por Git.
- El proyecto incluye `package-lock.json` para instalacion con npm.
- Tambien existe `pnpm-lock.yaml` heredado del scaffold original.
