const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

async function procesarRespuesta(respuesta, mensajePredeterminado) {
  let datos;

  try {
    datos = await respuesta.json();
  } catch {
    throw new Error("El backend devolvió una respuesta inválida.");
  }

  if (!respuesta.ok || datos.ok === false) {
    throw new Error(datos.mensaje || datos.error || mensajePredeterminado);
  }

  return datos;
}

/* ======================================================
   AUTENTICACIÓN
====================================================== */

export async function iniciarSesion(correo, contrasena) {
  const respuesta = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: correo.trim().toLowerCase(),
      contrasena,
    }),
  });

  return procesarRespuesta(respuesta, "No se pudo iniciar sesión.");
}

export async function registrarUsuario(datosUsuario) {
  const respuesta = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombres: datosUsuario.nombres,
      apellidos: datosUsuario.apellidos,
      correo: datosUsuario.correo.trim().toLowerCase(),

      contrasena: datosUsuario.contraseña || datosUsuario.contrasena,

      rol: datosUsuario.rol || "Estudiante",

      ciudad: datosUsuario.ciudad || null,

      telefono: datosUsuario.telefono || null,

      edad:
        datosUsuario.edad !== "" &&
        datosUsuario.edad !== undefined &&
        datosUsuario.edad !== null
          ? Number(datosUsuario.edad)
          : null,

      sexo: datosUsuario.sexo || null,

      tipoColegio: datosUsuario.tipoColegio || null,

      carreraRecomendada: datosUsuario.carreraRecomendada || null,

      especialidad: datosUsuario.especialidad || null,

      gradoAcademico: datosUsuario.gradoAcademico || null,
    }),
  });

  return procesarRespuesta(respuesta, "No se pudo registrar el usuario.");
}

/* ======================================================
   USUARIOS
====================================================== */

export async function apiGetUsers() {
  const respuesta = await fetch(`${API_URL}/api/db/users`);

  const datos = await procesarRespuesta(
    respuesta,
    "Error al obtener usuarios.",
  );

  return datos.data;
}

export async function apiUpdateUser(id, datosUsuario) {
  const respuesta = await fetch(`${API_URL}/api/db/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosUsuario),
  });

  const datos = await procesarRespuesta(
    respuesta,
    "Error al actualizar el usuario.",
  );

  return datos.data;
}

export async function apiUpdateProfile(id, datosPerfil) {
  const respuesta = await fetch(`${API_URL}/api/db/users/${id}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosPerfil),
  });

  const datos = await procesarRespuesta(
    respuesta,
    "No se pudo actualizar el perfil.",
  );

  return datos.data;
}

export async function apiDeleteUser(id) {
  const respuesta = await fetch(`${API_URL}/api/db/users/${id}`, {
    method: "DELETE",
  });

  return procesarRespuesta(respuesta, "Error al eliminar el usuario.");
}

/* ======================================================
   UNIVERSIDADES
====================================================== */

function normalizarUniversidad(universidad) {
  const logos = universidad.logos || universidad.Logo || [];

  const carreras = universidad.carreras || universidad.Carrera || [];

  const escalas = universidad.escalas || universidad.Escala || [];

  return {
    id: universidad.id,
    nombre: universidad.nombre,
    tipo: universidad.tipo,
    ubicacion: universidad.ubicacion,
    costoMatricula: universidad.costoMatricula,
    webOficial: universidad.webOficial,

    logo: universidad.logo || logos[0]?.url || "",

    carreras,
    escalas,
  };
}

export async function apiGetUniversidades() {
  const respuesta = await fetch(`${API_URL}/api/db/universidades`);

  const datos = await procesarRespuesta(
    respuesta,
    "Error al obtener universidades.",
  );

  return datos.data.map(normalizarUniversidad);
}

export async function apiCreateUniversidad(datosUniversidad) {
  const respuesta = await fetch(`${API_URL}/api/db/universidades`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(datosUniversidad),
  });

  const datos = await procesarRespuesta(
    respuesta,
    "No se pudo registrar la universidad.",
  );

  return normalizarUniversidad(datos.data);
}

export async function apiUpdateUniversidad(id, datosUniversidad) {
  const respuesta = await fetch(`${API_URL}/api/db/universidades/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(datosUniversidad),
  });

  const datos = await procesarRespuesta(
    respuesta,
    "No se pudo actualizar la universidad.",
  );

  return normalizarUniversidad(datos.data);
}

export async function apiDeleteUniversidad(id) {
  const respuesta = await fetch(`${API_URL}/api/db/universidades/${id}`, {
    method: "DELETE",
  });

  return procesarRespuesta(respuesta, "No se pudo eliminar la universidad.");
}

export async function apiDeleteCarrera(id) {
  const respuesta = await fetch(`${API_URL}/api/db/carreras/${id}`, {
    method: "DELETE",
  });

  return procesarRespuesta(respuesta, "No se pudo eliminar la carrera.");
}

export const apiLogin = iniciarSesion;
export const apiRegister = registrarUsuario;
