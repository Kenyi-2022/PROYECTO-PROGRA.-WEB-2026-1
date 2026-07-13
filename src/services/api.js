const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function iniciarSesion(correo, contrasena) {
  const respuesta = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      correo,
      contrasena
    })
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datos.mensaje || 'No se pudo iniciar sesión.'
    );
  }

  return datos;
}

