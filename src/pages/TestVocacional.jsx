import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/footer";
import { useApp } from "../context/AppContext";
import { apiCalculateTest, apiGetTest } from "../services/api";

export default function TestVocacional() {
  const navigate = useNavigate();
  const {
    setCarreraTemporal,
    guardarResultadoTest,
    buscarCarreraGlobal,
    user,
  } = useApp();
  const [preguntas, setPreguntas] = useState([]);
  const [currentPregunta, setCurrentPregunta] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [cargandoPreguntas, setCargandoPreguntas] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let componenteActivo = true;

    apiGetTest()
      .then((data) => {
        if (componenteActivo) setPreguntas(data);
      })
      .catch((requestError) => {
        if (componenteActivo) setError(requestError.message);
      })
      .finally(() => {
        if (componenteActivo) setCargandoPreguntas(false);
      });

    return () => {
      componenteActivo = false;
    };
  }, []);

  const procesarResultados = async (listaRespuestas) => {
    setProcesando(true);
    setError("");

    try {
      const resultado = await apiCalculateTest(listaRespuestas);
      const infoCarrera = buscarCarreraGlobal(resultado.carrera);
      const carreraFinal = infoCarrera?.nombre || resultado.carrera;

      if (user) {
        const guardado = await guardarResultadoTest(carreraFinal);

        if (!guardado.ok) {
          throw new Error(guardado.mensaje || "No se pudo guardar el resultado.");
        }
      } else {
        setCarreraTemporal(carreraFinal);
        localStorage.setItem("carreraTemporal", carreraFinal);
      }

      navigate("/resultado-test");
    } catch (requestError) {
      setError(requestError.message);
      setProcesando(false);
    }
  };

  const handleOpcionSeleccionada = (categoria) => {
    if (procesando) return;

    const nuevasRespuestas = [...respuestas, categoria];
    setRespuestas(nuevasRespuestas);

    if (currentPregunta < preguntas.length - 1) {
      setCurrentPregunta((actual) => actual + 1);
    } else {
      procesarResultados(nuevasRespuestas);
    }
  };

  if (cargandoPreguntas || procesando) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-sm">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {procesando ? "Procesando respuestas..." : "Cargando test..."}
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              {procesando
                ? "La API está cruzando tus intereses con el catálogo universitario."
                : "Obteniendo las preguntas dinámicas desde VocaTest."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !preguntas.length) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white border border-red-100 shadow-xl rounded-3xl p-10 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            No se pudo abrir el test
          </h1>
          <p className="text-slate-500 mb-6">
            {error || "El banco de preguntas está vacío."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const preguntaActual = preguntas[currentPregunta];
  const progreso = ((currentPregunta + 1) / preguntas.length) * 100;

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <main className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 mx-auto my-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-slate-400">
              <span className="text-blue-600 uppercase tracking-wider">
                {preguntaActual.bloque}
              </span>
              <span>
                Pregunta {currentPregunta + 1} de {preguntas.length}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-teal-400 h-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>

          <section>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Selecciona la alternativa que más te representa
            </p>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {preguntaActual.pregunta}
            </h1>
          </section>

          <div className="grid gap-3">
            {preguntaActual.opciones.map((opcion, index) => (
              <button
                key={`${preguntaActual.id}-${opcion.categoria}`}
                onClick={() => handleOpcionSeleccionada(opcion.categoria)}
                className="group w-full text-left border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 rounded-2xl px-5 py-4 transition-all flex items-start gap-4"
              >
                <span className="w-8 h-8 shrink-0 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-black text-slate-500 transition-colors">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-semibold text-slate-700 group-hover:text-slate-900 leading-relaxed">
                  {opcion.texto}
                </span>
              </button>
            ))}
          </div>

          {error && (
            <p className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              {error}
            </p>
          )}
        </div>
      </main>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
