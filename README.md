# VocaTest — Frontend

Frontend React/Vite de VocaTest. El backend se mantiene por separado en [`Elielichi/Backend_VocaTest`](https://github.com/Elielichi/Backend_VocaTest).

## Ejecución local

Primero inicia el backend desde su repositorio:

```powershell
cd "Backend proyecto"
Copy-Item .env.example .env -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run db:generate
npm.cmd run dev
```

Luego inicia este frontend en otra terminal:

```powershell
Copy-Item .env.example .env -ErrorAction SilentlyContinue
npm.cmd install
npm.cmd run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Estado del backend: `http://localhost:3000/api/health`

Variable local del frontend:

```env
VITE_API_URL=http://127.0.0.1:3000
```

## Verificación

```powershell
npm.cmd run lint
npm.cmd run build
```

## Despliegue

- El frontend puede alojarse en Vercel.
- El backend puede alojarse como Web Service en Render desde su repositorio independiente.
- PostgreSQL permanece en Render.
- En Vercel, `VITE_API_URL` debe contener la URL pública HTTPS del backend.
- Las contraseñas y variables privadas deben configurarse en cada plataforma y nunca publicarse en GitHub.
