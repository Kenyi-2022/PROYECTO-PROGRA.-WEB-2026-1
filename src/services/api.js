const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const TOKEN_KEY = "vocatest_token";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function saveToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

export function limpiarTokenSesion() {
  localStorage.removeItem(TOKEN_KEY);
}

export function tieneTokenSesion() {
  return Boolean(getToken());
}

async function apiRequest(
  path,
  { method = "GET", body, auth = true } = {},
  defaultMessage = "No se pudo completar la solicitud.",
) {
  const headers = {};

  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("El backend devolvió una respuesta inválida.");
  }

  if (!response.ok || data.ok === false) {
    throw new Error(data.mensaje || data.error || defaultMessage);
  }

  return data;
}

export async function iniciarSesion(correo, contrasena) {
  const data = await apiRequest(
    "/api/auth/login",
    {
      method: "POST",
      auth: false,
      body: { correo: correo.trim().toLowerCase(), contrasena },
    },
    "No se pudo iniciar sesión.",
  );

  saveToken(data.token);
  return data;
}

export async function registrarUsuario(datosUsuario) {
  const data = await apiRequest(
    "/api/auth/register",
    {
      method: "POST",
      auth: false,
      body: {
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
      },
    },
    "No se pudo registrar el usuario.",
  );

  saveToken(data.token);
  return data;
}

export async function apiGetUsers() {
  const data = await apiRequest(
    "/api/db/users",
    {},
    "Error al obtener usuarios.",
  );
  return data.data;
}

export async function apiUpdateUser(id, datosUsuario) {
  const data = await apiRequest(
    `/api/db/users/${id}`,
    { method: "PUT", body: datosUsuario },
    "Error al actualizar el usuario.",
  );
  return data.data;
}

export async function apiUpdateProfile(id, datosPerfil) {
  const data = await apiRequest(
    `/api/db/users/${id}/profile`,
    { method: "PUT", body: datosPerfil },
    "No se pudo actualizar el perfil.",
  );
  return data.data;
}

export async function apiUpdatePreferences(id, preferencias) {
  const data = await apiRequest(
    `/api/db/users/${id}/preferences`,
    { method: "PATCH", body: preferencias },
    "No se pudieron guardar las preferencias.",
  );
  return data.data;
}

export async function apiDeleteUser(id) {
  return apiRequest(
    `/api/db/users/${id}`,
    { method: "DELETE" },
    "Error al eliminar el usuario.",
  );
}

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
  const data = await apiRequest(
    "/api/db/universidades",
    { auth: false },
    "Error al obtener universidades.",
  );
  return data.data.map(normalizarUniversidad);
}

export async function apiCreateUniversidad(datosUniversidad) {
  const data = await apiRequest(
    "/api/db/universidades",
    { method: "POST", body: datosUniversidad },
    "No se pudo registrar la universidad.",
  );
  return normalizarUniversidad(data.data);
}

export async function apiUpdateUniversidad(id, datosUniversidad) {
  const data = await apiRequest(
    `/api/db/universidades/${id}`,
    { method: "PUT", body: datosUniversidad },
    "No se pudo actualizar la universidad.",
  );
  return normalizarUniversidad(data.data);
}

export async function apiDeleteUniversidad(id) {
  return apiRequest(
    `/api/db/universidades/${id}`,
    { method: "DELETE" },
    "No se pudo eliminar la universidad.",
  );
}

export async function apiDeleteCarrera(id) {
  return apiRequest(
    `/api/db/carreras/${id}`,
    { method: "DELETE" },
    "No se pudo eliminar la carrera.",
  );
}

export async function apiGetFavoritos(userId) {
  const data = await apiRequest(
    `/api/db/users/${userId}/favoritos`,
    {},
    "No se pudieron obtener los favoritos.",
  );
  return data.data;
}

export async function apiAddFavorito(userId, universidadId) {
  const data = await apiRequest(
    `/api/db/users/${userId}/favoritos/${universidadId}`,
    { method: "POST" },
    "No se pudo agregar la universidad a favoritos.",
  );
  return data.data;
}

export async function apiDeleteFavorito(userId, universidadId) {
  return apiRequest(
    `/api/db/users/${userId}/favoritos/${universidadId}`,
    { method: "DELETE" },
    "No se pudo eliminar la universidad de favoritos.",
  );
}

function normalizarHistorialTest(test) {
  const fechaObjeto = new Date(test.fecha);
  const fechaFormateada = Number.isNaN(fechaObjeto.getTime())
    ? ""
    : fechaObjeto.toLocaleDateString("es-PE", {
        timeZone: "America/Lima",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return {
    id: test.id,
    userId: test.userId,
    resultado: test.resultado,
    fecha: fechaFormateada,
    fechaISO: test.fecha,
  };
}

export async function apiGetHistorial(userId) {
  const data = await apiRequest(
    `/api/db/users/${userId}/historial`,
    {},
    "No se pudo obtener el historial de tests.",
  );
  return data.data.map(normalizarHistorialTest);
}

export async function apiCreateHistorial(userId, resultado) {
  const data = await apiRequest(
    `/api/db/users/${userId}/historial`,
    { method: "POST", body: { resultado } },
    "No se pudo guardar el resultado del test.",
  );
  return normalizarHistorialTest(data.data);
}

export async function apiGetTest() {
  const data = await apiRequest(
    "/api/db/test",
    { auth: false },
    "No se pudieron cargar las preguntas.",
  );
  return data.data;
}

export async function apiCalculateTest(respuestas) {
  const data = await apiRequest(
    "/api/db/test/calcular",
    { method: "POST", auth: false, body: { respuestas } },
    "No se pudo calcular el resultado del test.",
  );
  return data.data;
}

export async function apiGetSalas() {
  const data = await apiRequest(
    "/api/db/salas",
    {},
    "No se pudieron cargar las salas.",
  );
  return data.data;
}

export async function apiCreateSala(nombre, codigo, pin) {
  const data = await apiRequest(
    "/api/db/salas",
    { method: "POST", body: { nombre, codigo: codigo || null, pin } },
    "No se pudo crear la sala.",
  );
  return data.data;
}

export async function apiSetSalaEstado(codigo, activa) {
  const data = await apiRequest(
    `/api/db/salas/${codigo}/estado`,
    { method: "PATCH", body: { activa } },
    "No se pudo cambiar el estado de la sala.",
  );
  return data.data;
}

export async function apiDeleteSala(codigo, pin) {
  return apiRequest(
    `/api/db/salas/${codigo}`,
    { method: "DELETE", body: { pin } },
    "No se pudo eliminar la sala.",
  );
}

export async function apiJoinSala(codigo) {
  const data = await apiRequest(
    `/api/db/salas/${codigo}/unirse`,
    { method: "POST" },
    "No se pudo ingresar a la sala.",
  );
  return data.data;
}

export async function apiSubmitSalaResultado(codigo, resultado) {
  const data = await apiRequest(
    `/api/db/salas/${codigo}/resultados`,
    { method: "POST", body: { resultado } },
    "No se pudo enviar el resultado a la sala.",
  );
  return data.data;
}

export const apiLogin = iniciarSesion;
export const apiRegister = registrarUsuario;
