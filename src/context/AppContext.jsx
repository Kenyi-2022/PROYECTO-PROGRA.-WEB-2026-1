import React, { createContext, useState, useContext, useEffect } from "react";

import {
  iniciarSesion,
  registrarUsuario,
  apiGetUniversidades,
  apiGetUsers,
  apiUpdateUser,
  apiDeleteUser,
} from "../services/api.js";

const AppContext = createContext();

export function AppProvider({ children }) {
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
    const sesionActiva = localStorage.getItem("vocatest_sesion");

    if (sesionActiva) {
      const u = JSON.parse(sesionActiva);

      setUser({
        ...u,
        notificacionesEmail: u.notificacionesEmail ?? true,
        recordatorios: u.recordatorios ?? true,
        perfilPublico: u.perfilPublico ?? true,
      });
    }

    const carreraGuardada = localStorage.getItem("carreraTemporal");

    if (carreraGuardada) {
      setCarreraTemporal(carreraGuardada);
    }

    const salasGuardadas = localStorage.getItem("vocatest_salas");

    if (salasGuardadas) {
      setSalas(JSON.parse(salasGuardadas));
    }
  }, []);

  const login = async (correo, contrasena) => {
    try {
      const respuesta = await iniciarSesion(correo, contrasena);
      const usuarioBackend = respuesta.data;

      const rolFrontend =
        usuarioBackend.rol === "Administrador" ? "Admin" : usuarioBackend.rol;

      const usuarioSesion = {
        ...usuarioBackend,
        rol: rolFrontend,

        notificacionesEmail: true,
        recordatorios: true,
        perfilPublico: true,

        carrerasRecomendadas: usuarioBackend.carreraRecomendada
          ? [usuarioBackend.carreraRecomendada]
          : [],

        universidadesFavoritas: [],
        historialTests: [],
      };

      setUser(usuarioSesion);

      localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioSesion));

      return {
        ok: true,
        rol: rolFrontend,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message,
      };
    }
  };

  const register = async (datosUsuario) => {
    try {
      const rol = datosUsuario.rol || "Estudiante";
      const esEstudiante = rol === "Estudiante";

      const respuesta = await registrarUsuario({
        ...datosUsuario,
        rol,
        carreraRecomendada:
          esEstudiante && carreraTemporal ? carreraTemporal : null,
      });

      const usuarioBackend = respuesta.data;

      const rolFrontend =
        usuarioBackend.rol === "Administrador" ? "Admin" : usuarioBackend.rol;

      const ahora = new Date();

      const fechaFormateada = ahora.toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const usuarioSesion = {
        ...usuarioBackend,
        rol: rolFrontend,
        notificacionesEmail: true,
        recordatorios: true,
        perfilPublico: true,

        ...(esEstudiante
          ? {
              carrerasRecomendadas: usuarioBackend.carreraRecomendada
                ? [usuarioBackend.carreraRecomendada]
                : [],

              universidadesFavoritas: [],

              historialTests: usuarioBackend.carreraRecomendada
                ? [
                    {
                      resultado: usuarioBackend.carreraRecomendada,
                      fecha: fechaFormateada,
                    },
                  ]
                : [],

              fechaTest: usuarioBackend.carreraRecomendada
                ? fechaFormateada
                : "",
            }
          : {
              estadoCuenta: "Activo",
              estudiantesAsignados: 0,
              testRevisados: 0,
              recursosCompartidos: 0,
              historialTests: [],
            }),
      };

      setUser(usuarioSesion);

      localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioSesion));

      if (esEstudiante) {
        localStorage.removeItem("carreraTemporal");
        setCarreraTemporal("");
      }

      return {
        ok: true,
        rol: rolFrontend,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message,
      };
    }
  };

  const cargarUsuarios = async () => {
    try {
      const data = await apiGetUsers();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const editarUsuario = async (id, nuevosDatos) => {
    try {
      const actualizado = await apiUpdateUser(id, nuevosDatos);

      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((usuario) =>
          usuario.id === id ? actualizado : usuario,
        ),
      );

      if (user && user.id === id) {
        const usuarioSesion = {
          ...user,
          ...actualizado,
        };

        setUser(usuarioSesion);

        localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioSesion));
      }

      return {
        ok: true,
        data: actualizado,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo actualizar el usuario.",
      };
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await apiDeleteUser(id);

      setUsuarios((usuariosActuales) =>
        usuariosActuales.filter((usuario) => usuario.id !== id),
      );

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo eliminar el usuario.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vocatest_sesion");
  };

  const guardarResultadoTest = (resultadoFinal) => {
    if (typeof setCarreraTemporal === "function") {
      setCarreraTemporal(resultadoFinal);
    }
    localStorage.setItem("carreraTemporal", resultadoFinal);

    if (!user) return;

    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const entrada = { resultado: resultadoFinal, fecha: fechaFormateada };

    const usuarioActualizado = {
      ...user,
      carreraRecommended: resultadoFinal,
      carreraRecomendada: resultadoFinal,
      carrerasRecomendadas: [
        resultadoFinal,
        ...(user.carrerasRecomendadas || []),
      ].slice(0, 5),
      historialTests: [entrada, ...(user.historialTests || [])].slice(0, 20),
      fechaTest: fechaFormateada,
    };

    setUser(usuarioActualizado);
    localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioActualizado));

    const usuarios = JSON.parse(
      localStorage.getItem("vocatest_usuarios") || "[]",
    );
    const actualizados = usuarios.map((u) =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u,
    );
    localStorage.setItem("vocatest_usuarios", JSON.stringify(actualizados));

    const codigoSala = localStorage.getItem("vocatest_sala_actual");
    if (codigoSala) {
      const salasAlmacenadas = JSON.parse(
        localStorage.getItem("vocatest_salas") || "[]",
      );
      const salasActualizadas = salasAlmacenadas.map((sala) => {
        if (sala.codigo === codigoSala && sala.activa) {
          const nuevoResultado = {
            nombre: `${user.nombres} ${user.apellidos}`,
            correo: user.correo,
            resultado: resultadoFinal,
            fecha: ahora.toLocaleTimeString("es-PE", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          const resultadosPrevios = (sala.resultados || []).filter(
            (r) => r.correo !== user.correo,
          );
          return {
            ...sala,
            resultados: [...resultadosPrevios, nuevoResultado],
          };
        }
        return sala;
      });

      localStorage.setItem("vocatest_salas", JSON.stringify(salasActualizadas));
      if (typeof setSalas === "function") setSalas(salasActualizadas);
    }
  };

  const marcarFavoritoContext = (nombreUniversidad) => {
    if (!user) return;
    const usuarioActualizado = { ...user };
    if (!usuarioActualizado.universidadesFavoritas)
      usuarioActualizado.universidadesFavoritas = [];

    if (usuarioActualizado.universidadesFavoritas.includes(nombreUniversidad)) {
      usuarioActualizado.universidadesFavoritas =
        usuarioActualizado.universidadesFavoritas.filter(
          (uni) => uni !== nombreUniversidad,
        );
    } else {
      usuarioActualizado.universidadesFavoritas.push(nombreUniversidad);
    }

    setUser(usuarioActualizado);
    localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioActualizado));
    const usuariosGlobales = JSON.parse(
      localStorage.getItem("vocatest_usuarios") || "[]",
    );
    const actualizados = usuariosGlobales.map((u) =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u,
    );
    localStorage.setItem("vocatest_usuarios", JSON.stringify(actualizados));
  };

  const crearSala = (nombreSala, codigoPersonalizado, pin) => {
    const codigo = codigoPersonalizado
      ? codigoPersonalizado.toUpperCase().trim()
      : Math.random().toString().slice(2, 10).toUpperCase();
    const nuevaSala = {
      id: Date.now(),
      nombre: nombreSala,
      codigo,
      pin,
      resultados: [],
      activa: true,
      creador: user.correo,
    };
    const nuevasSalas = [...salas, nuevaSala];
    setSalas(nuevasSalas);
    localStorage.setItem("vocatest_salas", JSON.stringify(nuevasSalas));
    return codigo;
  };

  const cerrarSala = (codigo) => {
    const salasActualizadas = salas.map((s) =>
      s.codigo === codigo ? { ...s, activa: false } : s,
    );
    setSalas(salasActualizadas);
    localStorage.setItem("vocatest_salas", JSON.stringify(salasActualizadas));
  };

  const abrirSala = (codigo) => {
    const salasActualizadas = salas.map((s) =>
      s.codigo === codigo ? { ...s, activa: true } : s,
    );
    setSalas(salasActualizadas);
    localStorage.setItem("vocatest_salas", JSON.stringify(salasActualizadas));
  };

  const eliminarSala = (codigo) => {
    const salasFiltradas = salas.filter((s) => s.codigo !== codigo);
    setSalas(salasFiltradas);
    localStorage.setItem("vocatest_salas", JSON.stringify(salasFiltradas));
  };

  const actualizarPreferencias = (preferencias) => {
    if (!user) return;
    const usuarioActualizado = { ...user, ...preferencias };
    setUser(usuarioActualizado);
    localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioActualizado));
    const usuarios = JSON.parse(
      localStorage.getItem("vocatest_usuarios") || "[]",
    );
    const actualizados = usuarios.map((u) =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u,
    );
    localStorage.setItem("vocatest_usuarios", JSON.stringify(actualizados));
  };

  const cambiarNombre = (nombres, apellidos, passwordActual) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    if (user.contrasena !== passwordActual)
      return { ok: false, mensaje: "La contrasena es incorrecta." };
    editarUsuario(user.id, { nombres, apellidos });
    return { ok: true };
  };

  const cambiarCorreo = (nuevoCorreo, confirmarCorreo, passwordActual) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    const nuevoCorreoNormalizado = nuevoCorreo.trim().toLowerCase();
    const confirmarCorreoNormalizado = confirmarCorreo.trim().toLowerCase();
    if (nuevoCorreoNormalizado !== confirmarCorreoNormalizado)
      return { ok: false, mensaje: "Los correos no coinciden." };
    if (user.contrasena !== passwordActual)
      return { ok: false, mensaje: "La contrasena es incorrecta." };

    const usuarios = JSON.parse(
      localStorage.getItem("vocatest_usuarios") || "[]",
    );
    if (
      usuarios.find(
        (u) =>
          u.correo.toLowerCase() === nuevoCorreoNormalizado && u.id !== user.id,
      )
    ) {
      return { ok: false, mensaje: "Ese correo ya está registrado." };
    }

    editarUsuario(user.id, { correo: nuevoCorreoNormalizado });
    return { ok: true };
  };

  const cambiarPassword = (
    passwordActual,
    nuevaPassword,
    confirmarPassword,
  ) => {
    if (!user) return { ok: false, mensaje: "No hay sesión activa." };
    if (user.contrasena !== passwordActual)
      return { ok: false, mensaje: "La contrasena actual es incorrecta." };
    if (nuevaPassword !== confirmarPassword)
      return { ok: false, mensaje: "Las contrasenas no coinciden." };

    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexPassword.test(nuevaPassword)) {
      return {
        ok: false,
        mensaje:
          "La contrasena debe tener al menos 8 caracteres, una mayúscula y un número.",
      };
    }

    editarUsuario(user.id, { contrasena: nuevaPassword });
    return { ok: true };
  };

  const agregarUniversidad = (nuevaUni) => {
    const uniConId = { ...nuevaUni, id: Date.now() };
    const unisActualizadas = [...universidades, uniConId];
    setUniversidades(unisActualizadas);
    localStorage.setItem(
      "vocatest_universidades",
      JSON.stringify(unisActualizadas),
    );
  };

  const eliminarUniversidad = (nombreUni) => {
    const unisActualizadas = universidades.filter(
      (u) => u.nombre !== nombreUni,
    );
    setUniversidades(unisActualizadas);
    localStorage.setItem(
      "vocatest_universidades",
      JSON.stringify(unisActualizadas),
    );
  };

  const eliminarCarrera = (nombreUni, nombreCarrera) => {
    const unisActualizadas = universidades.map((uni) => {
      if (uni.nombre === nombreUni) {
        return {
          ...uni,
          carreras: uni.carreras.filter((c) => c.nombre !== nombreCarrera),
        };
      }
      return uni;
    });
    setUniversidades(unisActualizadas);
    localStorage.setItem(
      "vocatest_universidades",
      JSON.stringify(unisActualizadas),
    );
  };

  const buscarCarreraGlobal = (nombreCarrera) => {
    for (const uni of universidades) {
      if (uni.carreras) {
        const encontrada = uni.carreras.find((c) =>
          c.nombre.toLowerCase().includes(nombreCarrera.toLowerCase()),
        );
        if (encontrada) {
          return { ...encontrada, universidad: uni.nombre };
        }
      }
    }
    return null;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        usuarios,
        login,
        register,
        logout,
        cargarUsuarios,
        cargandoUniversidades,

        marcarFavoritoContext,
        guardarResultadoTest,

        carreraTemporal,
        setCarreraTemporal,

        salas,
        crearSala,
        cerrarSala,
        abrirSala,
        eliminarSala,

        universidades,
        agregarUniversidad,
        eliminarUniversidad,
        eliminarCarrera,

        editarUsuario,
        eliminarUsuario,
        buscarCarreraGlobal,

        cambiarNombre,
        cambiarCorreo,
        cambiarPassword,
        actualizarPreferencias,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
