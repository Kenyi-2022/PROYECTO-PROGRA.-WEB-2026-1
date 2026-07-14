# VocaTest — Full Stack

Monorepo del proyecto VocaTest. Incluye el frontend React/Vite y el backend
Express/Prisma conectado a PostgreSQL.

```text
VocaTest/
├── backend/       API REST, Prisma y pruebas
├── public/        logos y mallas universitarias
├── src/           frontend React
└── package.json   comandos principales
```

## Ejecución local

```powershell
Copy-Item .env.example .env
npm.cmd ci
npm.cmd ci --prefix backend
npm.cmd run dev
```

En otra terminal:

```powershell
npm.cmd run start:backend
```

También se pueden iniciar ambos servidores desde VS Code con `Ctrl+Shift+B` y
la tarea `VocaTest: Iniciar frontend y backend`.

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Estado de PostgreSQL: `http://localhost:3000/api/health`

Variables:

```env
VITE_API_URL=http://127.0.0.1:3000
```

## Verificación

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run check:backend
npm.cmd run test:backend
```

## Despliegue en Vercel

- Framework preset: `Vite`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Variable `VITE_API_URL`: URL pública HTTPS del backend en Render.
- `vercel.json` contiene el rewrite necesario para React Router.
