import React, { createContext, useState, useContext, useEffect } from "react";

import {
  iniciarSesion,
  registrarUsuario,
  apiGetUniversidades,
  apiCreateUniversidad,
  apiUpdateUniversidad,
  apiDeleteUniversidad,
  apiDeleteCarrera,
  apiGetUsers,
  apiUpdateUser,
  apiDeleteUser,
  apiGetFavoritos,
  apiAddFavorito,
  apiDeleteFavorito,
  apiGetHistorial,
  apiCreateHistorial,
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

  useEffect(() => {
    if (!user?.id || user.rol !== "Estudiante") {
      return;
    }

    let componenteActivo = true;

    const cargarFavoritosUsuario = async () => {
      try {
        const favoritos = await apiGetFavoritos(user.id);

        if (!componenteActivo) {
          return;
        }

        const nombresFavoritos = favoritos.map(
          (universidad) => universidad.nombre,
        );

        setUser((usuarioActual) => {
          if (!usuarioActual || usuarioActual.id !== user.id) {
            return usuarioActual;
          }

          const usuarioActualizado = {
            ...usuarioActual,
            universidadesFavoritas: nombresFavoritos,
          };

          localStorage.setItem(
            "vocatest_sesion",
            JSON.stringify(usuarioActualizado),
          );

          return usuarioActualizado;
        });
      } catch (error) {
        console.error("No se pudieron cargar los favoritos:", error);
      }
    };

    cargarFavoritosUsuario();

    return () => {
      componenteActivo = false;
    };
  }, [user?.id, user?.rol]);

  useEffect(() => {
    if (!user?.id || user.rol !== "Estudiante") {
      return;
    }

    let componenteActivo = true;

    const cargarHistorialUsuario = async () => {
      try {
        const historial = await apiGetHistorial(user.id);

        if (!componenteActivo) {
          return;
        }

        setUser((usuarioActual) => {
          if (!usuarioActual || usuarioActual.id !== user.id) {
            return usuarioActual;
          }

          const ultimoResultado = historial[0] || null;

          /*
           * La lista de recomendaciones no repite
           * carreras iguales y conserva las 5 recientes.
           */
          const carrerasRecomendadas = [
            ...new Set(historial.map((entrada) => entrada.resultado)),
          ].slice(0, 5);

          const usuarioActualizado = {
            ...usuarioActual,

            historialTests: historial,

            carreraRecomendada:
              ultimoResultado?.resultado ||
              usuarioActual.carreraRecomendada ||
              null,

            carreraRecommended:
              ultimoResultado?.resultado ||
              usuarioActual.carreraRecomendada ||
              null,

            carrerasRecomendadas,

            fechaTest: ultimoResultado?.fecha || usuarioActual.fechaTest || "",
          };

          localStorage.setItem(
            "vocatest_sesion",
            JSON.stringify(usuarioActualizado),
          );

          return usuarioActualizado;
        });
      } catch (error) {
        console.error("No se pudo cargar el historial:", error);
      }
    };

    cargarHistorialUsuario();

    return () => {
      componenteActivo = false;
    };
  }, [user?.id, user?.rol]);

  const login = async (correo, contrasena) => {
    try {
      const respuesta = await iniciarSesion(
        correo.trim().toLowerCase(),
        contrasena,
      );

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
        usuario: usuarioSesion,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo iniciar sesión.",
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

  const actualizarPerfil = async (datosPerfil) => {
    if (!user) {
      return {
        ok: false,
        mensaje: "No hay una sesión activa.",
      };
    }

    try {
      const usuarioActualizado = await apiUpdateProfile(user.id, datosPerfil);

      const usuarioSesion = {
        ...user,
        ...usuarioActualizado,

        rol: user.rol,
      };

      setUser(usuarioSesion);

      localStorage.setItem("vocatest_sesion", JSON.stringify(usuarioSesion));

      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((usuario) =>
          usuario.id === user.id
            ? {
                ...usuario,
                ...usuarioActualizado,
              }
            : usuario,
        ),
      );

      return {
        ok: true,
        data: usuarioSesion,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo actualizar el perfil.",
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

  const guardarResultadoTest = async (resultadoFinal) => {
    const resultadoLimpio = String(resultadoFinal || "").trim();

    if (!resultadoLimpio) {
      return {
        ok: false,
        mensaje: "El resultado del test no es válido.",
      };
    }

    /*
     * Esto se conserva porque ResultadoTest.jsx
     * usa carreraTemporal para mostrar el resultado.
     */
    setCarreraTemporal(resultadoLimpio);

    localStorage.setItem("carreraTemporal", resultadoLimpio);

    if (!user) {
      return {
        ok: true,
        temporal: true,
      };
    }

    try {
      /*
       * PostgreSQL crea la entrada y devuelve
       * su ID, resultado y fecha.
       */
      const entradaGuardada = await apiCreateHistorial(
        user.id,
        resultadoLimpio,
      );

      const historialActualizado = [
        entradaGuardada,
        ...(user.historialTests || []).filter(
          (entrada) => entrada.id !== entradaGuardada.id,
        ),
      ].slice(0, 20);

      const carrerasRecomendadas = [
        ...new Set(historialActualizado.map((entrada) => entrada.resultado)),
      ].slice(0, 5);

      const usuarioActualizado = {
        ...user,

        carreraRecommended: resultadoLimpio,
        carreraRecomendada: resultadoLimpio,

        carrerasRecomendadas,

        historialTests: historialActualizado,

        fechaTest: entradaGuardada.fecha,
      };

      setUser(usuarioActualizado);

      localStorage.setItem(
        "vocatest_sesion",
        JSON.stringify(usuarioActualizado),
      );

      /*
       * Conservamos tu lógica actual de salas.
       * Las salas todavía trabajan con localStorage.
       */
      const codigoSala = localStorage.getItem("vocatest_sala_actual");

      if (codigoSala) {
        const salasAlmacenadas = JSON.parse(
          localStorage.getItem("vocatest_salas") || "[]",
        );

        const ahora = new Date();

        const salasActualizadas = salasAlmacenadas.map((sala) => {
          if (sala.codigo === codigoSala && sala.activa) {
            const nuevoResultado = {
              nombre: `${user.nombres} ${user.apellidos}`,

              correo: user.correo,

              resultado: resultadoLimpio,

              fecha: ahora.toLocaleTimeString("es-PE", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };

            const resultadosPrevios = (sala.resultados || []).filter(
              (resultado) => resultado.correo !== user.correo,
            );

            return {
              ...sala,

              resultados: [...resultadosPrevios, nuevoResultado],
            };
          }

          return sala;
        });

        localStorage.setItem(
          "vocatest_salas",
          JSON.stringify(salasActualizadas),
        );

        setSalas(salasActualizadas);
      }

      return {
        ok: true,
        data: entradaGuardada,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo guardar el resultado.",
      };
    }
  };

  const marcarFavoritoContext = async (universidadId, nombreUniversidad) => {
    if (!user) {
      return {
        ok: false,
        mensaje: "Debes iniciar sesión para guardar favoritos.",
      };
    }

    if (user.rol !== "Estudiante") {
      return {
        ok: false,
        mensaje: "Solo los estudiantes pueden guardar favoritos.",
      };
    }

    try {
      const favoritosActuales = user.universidadesFavoritas || [];

      const yaEsFavorito = favoritosActuales.includes(nombreUniversidad);

      if (yaEsFavorito) {
        await apiDeleteFavorito(user.id, universidadId);
      } else {
        await apiAddFavorito(user.id, universidadId);
      }

      const nuevosFavoritos = yaEsFavorito
        ? favoritosActuales.filter((nombre) => nombre !== nombreUniversidad)
        : [...favoritosActuales, nombreUniversidad];

      const usuarioActualizado = {
        ...user,
        universidadesFavoritas: nuevosFavoritos,
      };

      setUser(usuarioActualizado);

      localStorage.setItem(
        "vocatest_sesion",
        JSON.stringify(usuarioActualizado),
      );

      return {
        ok: true,
        esFavorito: !yaEsFavorito,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo actualizar el favorito.",
      };
    }
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

  const cambiarNombre = async (nombres, apellidos, passwordActual) => {
    const nombresLimpios = String(nombres || "").trim();
    const apellidosLimpios = String(apellidos || "").trim();

    if (!nombresLimpios || !apellidosLimpios) {
      return {
        ok: false,
        mensaje: "Debes ingresar nombres y apellidos.",
      };
    }

    if (!passwordActual.trim()) {
      return {
        ok: false,
        mensaje: "Debes ingresar tu contraseña actual.",
      };
    }

    return actualizarPerfil({
      nombres: nombresLimpios,
      apellidos: apellidosLimpios,
      passwordActual,
    });
  };

  const cambiarCorreo = async (
    nuevoCorreo,
    confirmarCorreo,
    passwordActual,
  ) => {
    const nuevoCorreoNormalizado = String(nuevoCorreo || "")
      .trim()
      .toLowerCase();

    const confirmarCorreoNormalizado = String(confirmarCorreo || "")
      .trim()
      .toLowerCase();

    if (
      !nuevoCorreoNormalizado ||
      !confirmarCorreoNormalizado ||
      !passwordActual.trim()
    ) {
      return {
        ok: false,
        mensaje: "Completa todos los campos.",
      };
    }

    if (nuevoCorreoNormalizado !== confirmarCorreoNormalizado) {
      return {
        ok: false,
        mensaje: "Los correos no coinciden.",
      };
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(nuevoCorreoNormalizado)) {
      return {
        ok: false,
        mensaje: "El formato del correo no es válido.",
      };
    }

    if (nuevoCorreoNormalizado === user.correo.toLowerCase()) {
      return {
        ok: false,
        mensaje: "El nuevo correo debe ser diferente al actual.",
      };
    }

    return actualizarPerfil({
      correo: nuevoCorreoNormalizado,
      passwordActual,
    });
  };

  const cambiarPassword = async (
    passwordActual,
    nuevaPassword,
    confirmarPassword,
  ) => {
    if (!passwordActual || !nuevaPassword || !confirmarPassword) {
      return {
        ok: false,
        mensaje: "Completa todos los campos.",
      };
    }

    if (nuevaPassword !== confirmarPassword) {
      return {
        ok: false,
        mensaje: "Las contraseñas no coinciden.",
      };
    }

    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexPassword.test(nuevaPassword)) {
      return {
        ok: false,
        mensaje:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.",
      };
    }

    if (passwordActual === nuevaPassword) {
      return {
        ok: false,
        mensaje: "La nueva contraseña debe ser diferente a la actual.",
      };
    }

    return actualizarPerfil({
      passwordActual,
      nuevaContrasena: nuevaPassword,
    });
  };

  const agregarUniversidad = async (nuevaUni) => {
    try {
      const universidadCreada = await apiCreateUniversidad(nuevaUni);

      setUniversidades((universidadesActuales) => [
        ...universidadesActuales,
        universidadCreada,
      ]);

      return {
        ok: true,
        data: universidadCreada,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo registrar la universidad.",
      };
    }
  };

  const editarUniversidad = async (id, datosUniversidad) => {
    try {
      const universidadActualizada = await apiUpdateUniversidad(
        id,
        datosUniversidad,
      );

      setUniversidades((universidadesActuales) =>
        universidadesActuales.map((universidad) =>
          universidad.id === id ? universidadActualizada : universidad,
        ),
      );

      return {
        ok: true,
        data: universidadActualizada,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo actualizar la universidad.",
      };
    }
  };

  const eliminarUniversidad = async (id) => {
    try {
      await apiDeleteUniversidad(id);

      setUniversidades((universidadesActuales) =>
        universidadesActuales.filter((universidad) => universidad.id !== id),
      );

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo eliminar la universidad.",
      };
    }
  };

  const eliminarCarrera = async (idCarrera) => {
    try {
      await apiDeleteCarrera(idCarrera);

      setUniversidades((universidadesActuales) =>
        universidadesActuales.map((universidad) => ({
          ...universidad,

          carreras: universidad.carreras.filter(
            (carrera) => carrera.id !== idCarrera,
          ),
        })),
      );

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        mensaje: error.message || "No se pudo eliminar la carrera.",
      };
    }
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
        editarUniversidad,
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
