import React, { createContext, useState, useContext, useEffect } from 'react';
import universidadesData from '../data/universidades';
import { iniciarSesion, registrarUsuario } from '../services/api';

const AppContext = createContext();

const USUARIOS_DEFAULT = [
  {
    id: 1, nombres: "Carlos", apellidos: "Mendoza Torres", correo: "estudiante@ulima.edu.pe",
    contraseña: "ulima123", rol: "Estudiante", ciudad: "Lima", tipoColegio: "Privado", telefono: "987-654-321",
    edad: "18", sexo: "Masculino", carreraRecomendada: "Ingeniería de Sistemas y Computación",
    carrerasRecomendadas: ["Ingeniería de Sistemas", "Economía", "Ingeniería Civil"],
    universidadesFavoritas: ["Universidad de Lima", "Universidad del Pacífico", "Universidad Nacional Mayor de San Marcos"],
    historialTests: [{ resultado: "Ingeniería de Sistemas y Computación", fecha: "12 enero 2026" }],
    fechaTest: "12 enero 2026", ultimoIngreso: "25/05/2026", notificacionesEmail: true, recordatorios: true, perfilPublico: true
  },
  {
    id: 2, nombres: "María", apellidos: "García López", correo: "profesor@ulima.edu.pe",
    contraseña: "profe123", rol: "Profesor", ciudad: "Lima", telefono: "999-123-456",
    edad: "38", sexo: "Femenino", especialidad: "Ingeniería de Sistemas",
    gradoAcademico: "Magíster en Ingeniería de Software", aniosExperiencia: "12 años",
    estadoCuenta: "Activo", estudiantesAsignados: 24, testRevisados: 48, recursosCompartidos: 15,
    historialTests: [], ultimoIngreso: "25/05/2026", notificacionesEmail: true, recordatorios: true, perfilPublico: true
  },
  {
    id: 99, nombres: "Admin", apellidos: "VocaTest", correo: "admin@vocatest.pe",
    contraseña: "admin123", rol: "Admin", ciudad: "Lima", estadoCuenta: "Activo",
    historialTests: [], ultimoIngreso: new Date().toLocaleDateString('es-PE'),
    notificacionesEmail: true, recordatorios: true, perfilPublico: true
  }
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carreraTemporal, setCarreraTemporal] = useState("");
  const [salas, setSalas] = useState([]);
  const [universidades, setUniversidades] = useState(universidadesData);

  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('vocatest_usuarios');
    if (!usuariosGuardados) {
      localStorage.setItem('vocatest_usuarios', JSON.stringify(USUARIOS_DEFAULT));
    } else {
      const lista = JSON.parse(usuariosGuardados);
      if (!lista.find(u => u.rol === "Admin")) {
        lista.push(USUARIOS_DEFAULT[2]);
        localStorage.setItem('vocatest_usuarios', JSON.stringify(lista));
      }
    }

    const sesionActiva = localStorage.getItem('vocatest_sesion');
    if (sesionActiva) {
      const u = JSON.parse(sesionActiva);
      setUser({
        ...u,
        notificacionesEmail: u.notificacionesEmail ?? true,
        recordatorios: u.recordatorios ?? true,
        perfilPublico: u.perfilPublico ?? true
      });
    }

    const carreraGuardada = localStorage.getItem('carreraTemporal');
    if (carreraGuardada) setCarreraTemporal(carreraGuardada);

    const salasGuardadas = localStorage.getItem('vocatest_salas');
    if (salasGuardadas) setSalas(JSON.parse(salasGuardadas));

    const unisGuardadas = localStorage.getItem('vocatest_universidades');
    if (unisGuardadas) {
      const parsedUnis = JSON.parse(unisGuardadas);
      
      const uLima = parsedUnis.find(u => u.nombre === "Universidad de Lima");
      const industrialTienePDF = uLima?.carreras.find(c => c.nombre === "Ingeniería Industrial")?.planEstudios;

      if (!industrialTienePDF || parsedUnis[0].logo?.includes('http')) {
        setUniversidades(universidadesData);
        localStorage.setItem('vocatest_universidades', JSON.stringify(universidadesData));
      } else {
        setUniversidades(parsedUnis);
      }
    } else {
      setUniversidades(universidadesData);
      localStorage.setItem('vocatest_universidades', JSON.stringify(universidadesData));
    }
  }, []);

const login = async (correo, contrasena) => {
  try {
    const respuesta = await iniciarSesion(correo, contrasena);
    const usuarioBackend = respuesta.data;

    const rolFrontend =
      usuarioBackend.rol === 'Administrador'
        ? 'Admin'
        : usuarioBackend.rol;

    const usuarioSesion = {
      ...usuarioBackend,
      rol: rolFrontend,

      notificacionesEmail: true,
      recordatorios: true,
      perfilPublico: true,

      carrerasRecomendadas:
        usuarioBackend.carreraRecomendada
          ? [usuarioBackend.carreraRecomendada]
          : [],

      universidadesFavoritas: [],
      historialTests: []
    };

    setUser(usuarioSesion);

    localStorage.setItem(
      'vocatest_sesion',
      JSON.stringify(usuarioSesion)
    );

    return {
      ok: true,
      rol: rolFrontend
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message
    };
  }
};

const register = async (datosUsuario) => {
  try {
    const rol = datosUsuario.rol || 'Estudiante';
    const esEstudiante = rol === 'Estudiante';

    const respuesta = await registrarUsuario({
      ...datosUsuario,
      rol,
      carreraRecomendada:
        esEstudiante && carreraTemporal
          ? carreraTemporal
          : null
    });

    const usuarioBackend = respuesta.data;

    const rolFrontend =
      usuarioBackend.rol === 'Administrador'
        ? 'Admin'
        : usuarioBackend.rol;

    const ahora = new Date();

    const fechaFormateada = ahora.toLocaleDateString(
      'es-PE',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    );

    const usuarioSesion = {
      ...usuarioBackend,
      rol: rolFrontend,
      notificacionesEmail: true,
      recordatorios: true,
      perfilPublico: true,

      ...(esEstudiante
        ? {
            carrerasRecomendadas:
              usuarioBackend.carreraRecomendada
                ? [usuarioBackend.carreraRecomendada]
                : [],

            universidadesFavoritas: [],

            historialTests:
              usuarioBackend.carreraRecomendada
                ? [
                    {
                      resultado:
                        usuarioBackend.carreraRecomendada,
                      fecha: fechaFormateada
                    }
                  ]
                : [],

            fechaTest:
              usuarioBackend.carreraRecomendada
                ? fechaFormateada
                : ''
          }
        : {
            estadoCuenta: 'Activo',
            estudiantesAsignados: 0,
            testRevisados: 0,
            recursosCompartidos: 0,
            historialTests: []
          })
    };

    setUser(usuarioSesion);

    localStorage.setItem(
      'vocatest_sesion',
      JSON.stringify(usuarioSesion)
    );

    if (esEstudiante) {
      localStorage.removeItem('carreraTemporal');
      setCarreraTemporal('');
    }

    return {
      ok: true,
      rol: rolFrontend
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message
    };
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vocatest_sesion');
  };

  const guardarResultadoTest = (resultadoFinal) => {
    if (typeof setCarreraTemporal === 'function') {
      setCarreraTemporal(resultadoFinal);
    }
    localStorage.setItem('carreraTemporal', resultadoFinal);

    if (!user) return;

    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
    const entrada = { resultado: resultadoFinal, fecha: fechaFormateada };

    const usuarioActualizado = {
      ...user, 
      carreraRecommended: resultadoFinal, 
      carreraRecomendada: resultadoFinal,
      carrerasRecomendadas: [resultadoFinal, ...(user.carrerasRecomendadas || [])].slice(0, 5),
      historialTests: [entrada, ...(user.historialTests || [])].slice(0, 20),
      fechaTest: fechaFormateada
    };

    setUser(usuarioActualizado);
    localStorage.setItem('vocatest_sesion', JSON.stringify(usuarioActualizado));

    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    const actualizados = usuarios.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u);
    localStorage.setItem('vocatest_usuarios', JSON.stringify(actualizados));

    const codigoSala = localStorage.getItem("vocatest_sala_actual");
    if (codigoSala) {
      const salasAlmacenadas = JSON.parse(localStorage.getItem("vocatest_salas") || "[]");
      const salasActualizadas = salasAlmacenadas.map(sala => {
        if (sala.codigo === codigoSala && sala.activa) {
          const nuevoResultado = {
            nombre: `${user.nombres} ${user.apellidos}`, correo: user.correo,
            resultado: resultadoFinal, fecha: ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
          };
          const resultadosPrevios = (sala.resultados || []).filter(r => r.correo !== user.correo);
          return { ...sala, resultados: [...resultadosPrevios, nuevoResultado] };
        }
        return sala;
      });

      localStorage.setItem("vocatest_salas", JSON.stringify(salasActualizadas));
      if (typeof setSalas === 'function') setSalas(salasActualizadas);
    }
  };

  const marcarFavoritoContext = (nombreUniversidad) => {
    if (!user) return;
    const usuarioActualizado = { ...user };
    if (!usuarioActualizado.universidadesFavoritas) usuarioActualizado.universidadesFavoritas = [];

    if (usuarioActualizado.universidadesFavoritas.includes(nombreUniversidad)) {
      usuarioActualizado.universidadesFavoritas = usuarioActualizado.universidadesFavoritas.filter((uni) => uni !== nombreUniversidad);
    } else {
      usuarioActualizado.universidadesFavoritas.push(nombreUniversidad);
    }

    setUser(usuarioActualizado);
    localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioActualizado));
    const usuariosGlobales = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    const actualizados = usuariosGlobales.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u);
    localStorage.setItem('vocatest_usuarios', JSON.stringify(actualizados));
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

  const editarUsuario = (id, nuevosDatos) => {
    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    const actualizados = usuarios.map(u => u.id === id ? { ...u, ...nuevosDatos } : u);
    localStorage.setItem('vocatest_usuarios', JSON.stringify(actualizados));
    if (user && user.id === id) {
      setUser({ ...user, ...nuevosDatos });
      localStorage.setItem('vocatest_sesion', JSON.stringify({ ...user, ...nuevosDatos }));
    }
  };

  const eliminarUsuario = (id) => {
    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    const filtrados = usuarios.filter(u => u.id !== id);
    localStorage.setItem('vocatest_usuarios', JSON.stringify(filtrados));
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
    if (user.contraseña !== passwordActual) return { ok: false, mensaje: "La contraseña es incorrecta." };
    editarUsuario(user.id, { nombres, apellidos });
    return { ok: true };
  };

  const cambiarCorreo = (nuevoCorreo, confirmarCorreo, passwordActual) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    const nuevoCorreoNormalizado = nuevoCorreo.trim().toLowerCase();
    const confirmarCorreoNormalizado = confirmarCorreo.trim().toLowerCase();
    if (nuevoCorreoNormalizado !== confirmarCorreoNormalizado) return { ok: false, mensaje: "Los correos no coinciden." };
    if (user.contraseña !== passwordActual) return { ok: false, mensaje: "La contraseña es incorrecta." };
    
    const usuarios = JSON.parse(localStorage.getItem('vocatest_usuarios') || '[]');
    if (usuarios.find(u => u.correo.toLowerCase() === nuevoCorreoNormalizado && u.id !== user.id)) {
      return { ok: false, mensaje: "Ese correo ya está registrado." };
    }
    
    editarUsuario(user.id, { correo: nuevoCorreoNormalizado });
    return { ok: true };
  };

  const cambiarPassword = (passwordActual, nuevaPassword, confirmarPassword) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    if (user.contraseña !== passwordActual) return { ok: false, mensaje: "La contraseña actual es incorrecta." };
    if (nuevaPassword !== confirmarPassword) return { ok: false, mensaje: "Las contraseñas no coinciden." };
    
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexPassword.test(nuevaPassword)) {
      return { ok: false, mensaje: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número." };
    }
    
    editarUsuario(user.id, { contraseña: nuevaPassword });
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
      buscarCarreraGlobal,
      cambiarNombre, cambiarCorreo, cambiarPassword, actualizarPreferencias
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);