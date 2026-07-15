# VocaTest — Frontend y Backend

Proyecto web completo de VocaTest. Este repositorio contiene el frontend React/Vite y el único backend Express/Prisma utilizado por la aplicación.

```text
PROYECTO-PROGRA.-WEB-2026-1/
├── src/                 Frontend React
├── public/              Recursos del frontend
├── package.json         Dependencias del frontend
└── backend/             API Express, Prisma y PostgreSQL
```

## Ejecución local

Primero inicia el backend en una terminal:

```powershell
cd backend
Copy-Item .env.example .env -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run db:generate
npm.cmd run dev
```

Luego inicia el frontend desde la raíz en otra terminal:

```powershell
npm.cmd install
npm.cmd run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Estado del backend: `http://localhost:3000/api/health`
- Prisma Studio local: ejecuta `npm.cmd run db:studio` dentro de `backend/` y abre `http://localhost:5555`

El frontend utiliza esta variable en su `.env` local:

```env
VITE_API_URL=http://127.0.0.1:3000
```

El backend requiere su propio `backend/.env`. Nunca publiques contraseñas, tokens ni la URL privada de PostgreSQL.

## Verificación

Frontend:

```powershell
npm.cmd run lint
npm.cmd run build
```

Backend:

```powershell
cd backend
npm.cmd run db:generate
npm.cmd run check
npm.cmd test
```

## Despliegue

- El frontend puede desplegarse en Vercel.
- El backend puede desplegarse como Web Service en Render usando `backend` como directorio raíz.
- PostgreSQL permanece en Render.
- En Vercel, `VITE_API_URL` debe contener la URL pública HTTPS del backend.
- En Render, configura `DATABASE_URL`, `AUTH_SECRET`, `FRONTEND_URL`, `PGSSL` y `NODE_ENV` como variables privadas.
