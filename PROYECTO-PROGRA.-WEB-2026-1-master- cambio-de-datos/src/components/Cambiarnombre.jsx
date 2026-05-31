import { useState } from "react";
import { useApp } from "../context/AppContext";

const Cambiarnombre = () => {
  const { user, actualizarUsuario } = useApp();
  const [abierto, setAbierto] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handleGuardar = () => {
    setError("");
    if (contrasena !== user.contraseña) {
      setError("La contraseña es incorrecta.");
      return;
    }
    if (!nombres.trim() || !apellidos.trim()) {
      setError("El nombre y apellido no pueden estar vacíos.");
      return;
    }
    actualizarUsuario({ nombres: nombres.trim(), apellidos: apellidos.trim() });
    setExito(true);
    setTimeout(() => {
      setAbierto(false);
      setExito(false);
      setNombres(""); setApellidos(""); setContrasena("");
    }, 1500);
  };

  return (
    <div>
      <button
        onClick={() => { setNombres(user?.nombres || ""); setApellidos(user?.apellidos || ""); setAbierto(true); }}
        className="text-blue-600 font-bold hover:text-blue-700 transition-all cursor-pointer"
      >
        Cambiar
      </button>

      {abierto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
            <button onClick={() => setAbierto(false)} className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl">✕</button>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Cambiar Nombre de Usuario</h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Nuevo Nombre</p>
                <input type="text" value={nombres} onChange={e => setNombres(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Nuevo Apellido</p>
                <input type="text" value={apellidos} onChange={e => setApellidos(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Contraseña Actual</p>
                <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              {exito && <p className="text-green-600 text-sm font-semibold">¡Nombre actualizado!</p>}

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

export default Cambiarnombre;