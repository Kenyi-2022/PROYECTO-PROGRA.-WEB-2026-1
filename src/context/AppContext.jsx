import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  apiGetUniversidades, apiLogin, apiRegister,
  apiGetHistorialTest, apiGuardarResultado,  
  apiAgregarFavorito, apiQuitarFavorito, apiGetFavoritos,
  apiGetUsers, apiUpdateUser, apiDeleteUser
} from '../service/client.js';
const AppContext = createContext();



export function AppProvider({ children }) {
  const [historialTests, setHistorialTests] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState(null);
  const [carreraTemporal, setCarreraTemporal] = useState("");
  const [salas, setSalas] = useState([]);
const [universidades, setUniversidades] = useState([]);
const [cargandoUniversidades, setCargandoUniversidades] = useState(true);
 useEffect(() => {
  apiGetUniversidades()
    .then(setUniversidades)
    .catch((err) => console.error("Error cargando universidades:", err))
    .finally(() => setCargandoUniversidades(false));
}, []);

useEffect(() => {
  if (user?.id) {
    apiGetHistorialTest(user.id)
      .then((data) => {
        const mapeado = data.map(r => ({
          resultado: r.resultado,
          fecha: new Date(r.fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
        }));
        setHistorialTests(mapeado);
      })
      .catch((err) => console.error("Error cargando historial:", err));
  } else {
    setHistorialTests([]);
  }
}, [user?.id]);
useEffect(() => {
  if (user?.id) {
    apiGetFavoritos(user.id)
      .then(setFavoritos)
      .catch((err) => console.error("Error cargando favoritos:", err));
  } else {
    setFavoritos([]);
  }
}, [user?.id]);


const cargarUsuarios = async () => {
  try {
    const data = await apiGetUsers();
    setUsuarios(data);
  } catch (err) {
    console.error("Error cargando usuarios:", err);
  }
};

useEffect(() => {
  cargarUsuarios();
}, []);

const editarUsuario = async (id, nuevosDatos) => {
  const actualizado = await apiUpdateUser(id, nuevosDatos);
  setUsuarios(usuarios.map(u => u.id === id ? actualizado : u));
  if (user && user.id === id) {
    setUser(actualizado);
    localStorage.setItem('vocatest_sesion', JSON.stringify(actualizado));
  }
};

const eliminarUsuario = async (id) => {
  await apiDeleteUser(id);
  setUsuarios(usuarios.filter(u => u.id !== id));
};

 const login = async (correo, contrasena) => {
  const resultado = await apiLogin(correo, contrasena);
  if (resultado.ok) {
    let historialTests = [];
    try {
      const historial = await apiGetHistorialTest(resultado.data.id);
      historialTests = historial.map(r => ({
        resultado: r.resultado,
        fecha: new Date(r.fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
      }));
    } catch (err) {
      console.error("Error cargando historial:", err);
    }

    const usuarioConHistorial = { ...resultado.data, historialTests };
    setUser(usuarioConHistorial);
    localStorage.setItem('vocatest_sesion', JSON.stringify(usuarioConHistorial));
    return { ok: true, rol: resultado.rol };
  }
  return { ok: false, mensaje: resultado.mensaje };
};

const register = async (datosUsuario) => {
  const resultado = await apiRegister(datosUsuario);
  if (resultado.ok) {
    setUser(resultado.data);
    localStorage.setItem('vocatest_sesion', JSON.stringify(resultado.data));
    return { ok: true };
  }
  return { ok: false, mensaje: resultado.mensaje };
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vocatest_sesion');
  };

  const guardarResultadoTest = async (resultadoFinal) => {
  setCarreraTemporal(resultadoFinal);
  localStorage.setItem('carreraTemporal', resultadoFinal);
  if (!user) return;

  try {
    await apiGuardarResultado(user.id, resultadoFinal);

    // Refresca el historial completo desde el backend
    const historialActualizado = await apiGetHistorialTest(user.id);
    const mapeado = historialActualizado.map(r => ({
      resultado: r.resultado,
      fecha: new Date(r.fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
    }));
    setHistorialTests(mapeado);

    const usuarioActualizado = {
      ...user,
      carreraRecomendada: resultadoFinal,
      fechaTest: mapeado[0]?.fecha
    };
    setUser(usuarioActualizado);
    localStorage.setItem('vocatest_sesion', JSON.stringify(usuarioActualizado));
  } catch (err) {
    console.error("Error guardando resultado del test:", err);
  }

  // ... bloque de salas igual que antes
};

  const marcarFavoritoContext = async (universidadId) => {
  if (!user) return;

  const yaEsFavorito = favoritos.some(f => f.universidadId === universidadId);

  try {
    if (yaEsFavorito) {
      await apiQuitarFavorito(user.id, universidadId);
      setFavoritos(favoritos.filter(f => f.universidadId !== universidadId));
    } else {
      await apiAgregarFavorito(user.id, universidadId);
      const actualizados = await apiGetFavoritos(user.id);
      setFavoritos(actualizados);
    }
  } catch (err) {
    console.error("Error actualizando favorito:", err);
  }
};

  const crearSala = (nombreSala, codigoPersonalizado, pin) => {
    const codigo = codigoPersonalizado ? codigoPersonalizado.toUpperCase().trim() : Math.random().toString().slice(2, 10).toUpperCase();
    const nuevaSala = { id: Date.now(), nombre: nombreSala, codigo, pin, resultados: [], activa: true, creador: user.correo };
    const nuevasSalas = [...salas, nuevaSala];
    setSalas(nuevasSalas);
    localStorage.setItem('vocatest_salas', JSON.stringify(nuevasSalas));
    return codigo;
  };

  const cerrarSala = (codigo) => {
    const salasActualizadas = salas.map(s => s.codigo === codigo ? { ...s, activa: false } : s);
    setSalas(salasActualizadas);
    localStorage.setItem('vocatest_salas', JSON.stringify(salasActualizadas));
  };

  const abrirSala = (codigo) => {
    const salasActualizadas = salas.map(s => s.codigo === codigo ? { ...s, activa: true } : s);
    setSalas(salasActualizadas);
    localStorage.setItem('vocatest_salas', JSON.stringify(salasActualizadas));
  };

  const eliminarSala = (codigo) => {
    const salasFiltradas = salas.filter(s => s.codigo !== codigo);
    setSalas(salasFiltradas);
    localStorage.setItem('vocatest_salas', JSON.stringify(salasFiltradas));
  };

  const actualizarPreferencias = (preferencias) => {
    if (!user) return;
    const usuarioActualizado = { ...user, ...preferencias };
    setUser(usuarioActualizado);
    localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioActualizado));
    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    const actualizados = usuarios.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u);
    localStorage.setItem('vocatest_usuarios', JSON.stringify(actualizados));
  };

  const cambiarNombre = (nombres, apellidos, passwordActual) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    if (user.contrasena !== passwordActual) return { ok: false, mensaje: "La contrasena es incorrecta." };
    editarUsuario(user.id, { nombres, apellidos });
    return { ok: true };
  };

  const cambiarCorreo = (nuevoCorreo, confirmarCorreo, passwordActual) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    const nuevoCorreoNormalizado = nuevoCorreo.trim().toLowerCase();
    const confirmarCorreoNormalizado = confirmarCorreo.trim().toLowerCase();
    if (nuevoCorreoNormalizado !== confirmarCorreoNormalizado) return { ok: false, mensaje: "Los correos no coinciden." };
    if (user.contrasena !== passwordActual) return { ok: false, mensaje: "La contrasena es incorrecta." };
    
    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    if (usuarios.find(u => u.correo.toLowerCase() === nuevoCorreoNormalizado && u.id !== user.id)) {
      return { ok: false, mensaje: "Ese correo ya está registrado." };
    }
    
    editarUsuario(user.id, { correo: nuevoCorreoNormalizado });
    return { ok: true };
  };

  const cambiarPassword = (passwordActual, nuevaPassword, confirmarPassword) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    if (user.contrasena !== passwordActual) return { ok: false, mensaje: "La contrasena actual es incorrecta." };
    if (nuevaPassword !== confirmarPassword) return { ok: false, mensaje: "Las contrasenas no coinciden." };
    
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexPassword.test(nuevaPassword)) {
      return { ok: false, mensaje: "La contrasena debe tener al menos 8 caracteres, una mayúscula y un número." };
    }
    
    editarUsuario(user.id, { contrasena: nuevaPassword });
    return { ok: true };
  };

  const agregarUniversidad = (nuevaUni) => {
    const uniConId = { ...nuevaUni, id: Date.now() };
    const unisActualizadas = [...universidades, uniConId];
    setUniversidades(unisActualizadas);
    localStorage.setItem('vocatest_universidades', JSON.stringify(unisActualizadas));
  };

  const eliminarUniversidad = (nombreUni) => {
    const unisActualizadas = universidades.filter(u => u.nombre !== nombreUni);
    setUniversidades(unisActualizadas);
    localStorage.setItem('vocatest_universidades', JSON.stringify(unisActualizadas));
  };

  const eliminarCarrera = (nombreUni, nombreCarrera) => {
    const unisActualizadas = universidades.map(uni => {
      if (uni.nombre === nombreUni) {
        return {
          ...uni,
          carreras: uni.carreras.filter(c => c.nombre !== nombreCarrera)
        };
      }
      return uni;
    });
    setUniversidades(unisActualizadas);
    localStorage.setItem('vocatest_universidades', JSON.stringify(unisActualizadas));
  };

  const buscarCarreraGlobal = (nombreCarrera) => {
    for (const uni of universidades) {
      if (uni.carreras) {
        const encontrada = uni.carreras.find(c =>
          c.nombre.toLowerCase().includes(nombreCarrera.toLowerCase())
        );
        if (encontrada) {
          return { ...encontrada, universidad: uni.nombre };
        }
      }
    }
    return null;
  };

  return (
  <AppContext.Provider value={{
    user, login, register, logout, marcarFavoritoContext, guardarResultadoTest,
  carreraTemporal, setCarreraTemporal, salas, crearSala, cerrarSala, abrirSala, eliminarSala,
  universidades, agregarUniversidad, eliminarUniversidad, eliminarCarrera,
  editarUsuario, eliminarUsuario,
  favoritos, historialTests,  
  buscarCarreraGlobal,
  cambiarNombre, cambiarCorreo, cambiarPassword, actualizarPreferencias
  }}>
    {children}
  </AppContext.Provider>
);
}

export const useApp = () => useContext(AppContext);