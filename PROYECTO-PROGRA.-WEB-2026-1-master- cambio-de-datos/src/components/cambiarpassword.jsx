import { useState } from "react";
import { useApp } from "../context/AppContext";

const Cambiarpassword = () => {
  const { user, actualizarUsuario } = useApp();
  const [abierto, setAbierto] = useState(false);
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handleGuardar = () => {
    setError("");
    if (actual !== user.contraseña) {
      setError("La contraseña actual es incorrecta.");
      return;
    }
    if (nueva.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (nueva !== confirmar) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }
    actualizarUsuario({ contraseña: nueva });
    setExito(true);
    setTimeout(() => {
      setAbierto(false);
      setExito(false);
      setActual(""); setNueva(""); setConfirmar("");
    }, 1500);
  };

  return (
    <div>
      <button
        onClick={() => setAbierto(true)}
        className="text-blue-600 font-bold hover:text-blue-700 transition-all cursor-pointer"
      >
        Cambiar
      </button>

      {abierto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
            <button onClick={() => setAbierto(false)} className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl">✕</button>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Cambiar contraseña</h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Contraseña actual</p>
                <input type="password" value={actual} onChange={e => setActual(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Contraseña nueva</p>
                <input type="password" value={nueva} onChange={e => setNueva(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Vuelva a introducir la contraseña</p>
                <input type="password" value={confirmar} onChange={e => setConfirmar(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              {exito && <p className="text-green-600 text-sm font-semibold">¡Contraseña actualizada!</p>}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button onClick={handleGuardar}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition-all">
                  Guardar
                </button>
                <button onClick={() => setAbierto(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-3 rounded-xl font-bold transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cambiarpassword;