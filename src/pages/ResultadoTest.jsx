import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useApp } from "../context/AppContext";

function normalizarTexto(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function palabrasClave(value) {
  const stopWords = new Set(["de", "la", "el", "e", "y", "en", "del"]);
  return normalizarTexto(value)
    .split(" ")
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

function puntuarCarrera(nombre, objetivo) {
  const normalizado = normalizarTexto(nombre);
  const objetivoNormalizado = normalizarTexto(objetivo);

  if (normalizado === objetivoNormalizado) return 100;
  if (
    normalizado.includes(objetivoNormalizado) ||
    objetivoNormalizado.includes(normalizado)
  ) {
    return 80;
  }

  const palabrasObjetivo = palabrasClave(objetivo);
  const coincidencias = palabrasObjetivo.filter((word) =>
    normalizado.includes(word),
  ).length;

  return coincidencias >= 2 ? coincidencias * 10 : 0;
}

export default function ResultadoTest() {
  const navigate = useNavigate();
  const {
    carreraTemporal,
    universidades,
    cargandoUniversidades,
  } = useApp();
  const carreraFinal =
    carreraTemporal || localStorage.getItem("carreraTemporal") || "";

  const universidadesRecomendadas = useMemo(() => {
    if (!carreraFinal) return [];

    return universidades
      .map((universidad) => {
        const coincidencias = (universidad.carreras || [])
          .map((carrera) => ({
            carrera,
            puntaje: puntuarCarrera(carrera.nombre, carreraFinal),
          }))
          .filter((item) => item.puntaje > 0)
          .sort((a, b) => b.puntaje - a.puntaje);

        if (!coincidencias.length) return null;

        return {
          ...universidad,
          carreraCoincidente: coincidencias[0].carrera,
          puntaje: coincidencias[0].puntaje,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, 5);
  }, [carreraFinal, universidades]);

  const abrirEnlaceExterno = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!carreraFinal) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
            <h1 className="text-2xl font-black text-slate-900 mb-3">
              Aún no tienes un resultado
            </h1>
            <p className="text-slate-500 mb-6">
              Completa el test para recibir una carrera y universidades afines.
            </p>
            <button
              onClick={() => navigate("/test")}
              className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl"
            >
              Iniciar test
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 text-center">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Resultado oficial
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">
            ¡Tu perfil está listo!
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto mb-4">
            Según las respuestas procesadas por la API, tienes una alta afinidad
            con:
          </p>
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl md:text-2xl font-bold px-6 py-3 rounded-xl shadow-md">
            {carreraFinal}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Opciones encontradas en el directorio
          </h2>
          <p className="text-sm text-gray-500">
            Estas recomendaciones se calculan con universidades y carreras
            obtenidas desde PostgreSQL.
          </p>
        </div>

        <div className="grid gap-4 mb-8">
          {cargandoUniversidades ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200 text-gray-500">
              Cargando universidades desde la API...
            </div>
          ) : universidadesRecomendadas.length > 0 ? (
            universidadesRecomendadas.map((universidad, index) => (
              <article
                key={universidad.id}
                className={`bg-white rounded-xl shadow-sm p-5 border transition-all ${
                  index === 0
                    ? "border-blue-400 ring-2 ring-blue-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">
                        {universidad.nombre}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                          universidad.tipo === "Privada"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {universidad.tipo}
                      </span>
                      {index === 0 && (
                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-md font-semibold">
                          Mayor coincidencia
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      <p>
                        <span className="font-semibold text-gray-700">
                          Carrera:
                        </span>{" "}
                        {universidad.carreraCoincidente.nombre}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Matrícula:
                        </span>{" "}
                        {universidad.costoMatricula || "Consultar universidad"}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Ubicación:
                        </span>{" "}
                        {universidad.ubicacion || "No especificada"}
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 justify-end">
                    {universidad.carreraCoincidente.planEstudios && (
                      <button
                        onClick={() =>
                          abrirEnlaceExterno(
                            universidad.carreraCoincidente.planEstudios,
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
                      >
                        Ver plan de estudios
                      </button>
                    )}
                    {universidad.webOficial && (
                      <button
                        onClick={() => abrirEnlaceExterno(universidad.webOficial)}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg"
                      >
                        Más detalles
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300 text-gray-500">
              El catálogo aún no contiene una carrera suficientemente similar a
              “{carreraFinal}”. El administrador puede agregarla y el resultado se
              actualizará automáticamente.
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-gray-200 pt-6">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("carreraTemporal");
              navigate("/test");
            }}
            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm px-6 py-2.5 rounded-xl"
          >
            Repetir cuestionario
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
