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

export async function registrarUsuario(datosUsuario) {
  const respuesta = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombres: datosUsuario.nombres,
      apellidos: datosUsuario.apellidos,
      correo: datosUsuario.correo,

      contrasena: datosUsuario.contraseña,

      rol: datosUsuario.rol || 'Estudiante',
      ciudad: datosUsuario.ciudad || null,
      telefono: datosUsuario.telefono || null,

      edad: datosUsuario.edad
        ? Number(datosUsuario.edad)
        : null,

      sexo: datosUsuario.sexo || null,
      tipoColegio: datosUsuario.tipoColegio || null,
      carreraRecomendada:
        datosUsuario.carreraRecomendada || null,

      especialidad:
        datosUsuario.especialidad || null,

      gradoAcademico:
        datosUsuario.gradoAcademico || null
    })
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datos.mensaje || 'No se pudo registrar el usuario.'
    );
  }

  return datos;
}