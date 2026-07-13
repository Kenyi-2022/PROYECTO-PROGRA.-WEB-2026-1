const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiLogin(correo, contrasena) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });
  return res.json();
}
export async function apiGetUsers() {
  const res = await fetch(`${API_URL}/api/db/users`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.mensaje || "Error al obtener usuarios");
  return json.data;
}

export async function apiUpdateUser(id, datos) {
  const res = await fetch(`${API_URL}/api/db/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.mensaje || "Error al actualizar usuario");
  return json.data;
}

export async function apiDeleteUser(id) {
  const res = await fetch(`${API_URL}/api/db/users/${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!json.ok) throw new Error(json.mensaje || "Error al eliminar usuario");
  return json;
}
export async function apiRegister(datosUsuario) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosUsuario),
  });
  return res.json();
}

export async function apiGetUniversidades() {
  const res = await fetch(`${API_URL}/api/db/universidades`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Error al obtener universidades");

  return json.data.map((uni) => ({
    id: uni.id,
    nombre: uni.nombre,
    tipo: uni.tipo,
    ubicacion: uni.ubicacion,
    costoMatricula: uni.costoMatricula,
    webOficial: uni.webOficial,
    logo: uni.logos?.[0]?.url || "",
    carreras: uni.carreras || [],
    escalas: uni.escalas || [],
  }));
}