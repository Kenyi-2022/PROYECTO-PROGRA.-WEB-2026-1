# VocaTest — Frontend

Aplicación React/Vite de VocaTest. El backend oficial se mantiene por separado
en `..\backend-repo\Backend proyecto` y se consume mediante HTTP.

```text
Programación Web - Proyecto Final/
├── frontend/                       React/Vite
└── backend-repo/Backend proyecto/  Express, Prisma y PostgreSQL
```

## Ejecución local

Primero inicia el backend en una terminal:

```powershell
cd "..\backend-repo\Backend proyecto"
npm.cmd install
npx.cmd prisma generate
npm.cmd run dev
```

Luego inicia el frontend en otra terminal:

```powershell
cd "..\..\frontend"
Copy-Item .env.example .env -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Estado de PostgreSQL: `http://localhost:3000/api/health`

Variable local del frontend:

```env
VITE_API_URL=http://127.0.0.1:3000
```

## Verificación

Frontend:

```powershell
npm.cmd run lint
npm.cmd run build
```

Backend:

```powershell
cd "..\backend-repo\Backend proyecto"
npm.cmd run check
npm.cmd test
```

## Despliegue

- Vercel aloja el frontend (`frontend`).
- Render aloja el backend (`backend-repo/Backend proyecto`).
- PostgreSQL permanece en Render.
- En Vercel, `VITE_API_URL` debe contener la URL pública HTTPS del backend.
- En el backend desplegado, `DATABASE_URL` debe usar la conexión interna de
  PostgreSQL cuando ambos servicios estén en la misma cuenta y región de Render.
