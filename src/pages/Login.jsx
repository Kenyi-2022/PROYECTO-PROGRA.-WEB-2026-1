import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  if (!correo || !contrasena) { setError('Por favor completa todos los campos.'); return; }

  setCargando(true);
  const resultado = await login(correo, contrasena);
  setCargando(false);

  if (resultado.ok) {
    navigate(resultado.rol === "Admin" ? '/admin' : '/perfil');
  } else {
    setError(resultado.mensaje || 'Correo o contraseña incorrectos.');
  }
};

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">

        {/* Logo / Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            {/* 🔥 AQUÍ ESTÁ EL LOGO DEL COHETE EXACTO 🔥 */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
              <path d="M6 3l.5 1.5c.2.5.5.9 1 1.1L9 6l-1.5.5c-.5.2-.9.5-1.1 1L6 9l-.5-1.5c-.2-.5-.5-.9-1-1.1L3 6l1.5-.5c.5-.2.9-.5 1.1-1L6 3z"/>
              <path d="M18 6.5l.4 1c.1.3.3.6.6.7l1 .4-1 .4c-.3.1-.6.3-.7.6l-.4 1-.4-1c-.1-.3-.3-.6-.6-.7l-1-.4 1-.4c.3-.1.6-.3.7-.6l.4-1z"/>
              <path d="M17.5 14.5l.3.8c.1.3.2.5.5.6l.8.3-.8.3c-.3.1-.5.2-.6.5l-.3.8-.3-.8c-.1-.3-.2-.5-.5-.6l-.8-.3.8-.3c.3-.1.5-.2.6-.5l.3-.8z"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C12 1.5 7.5 5 7.5 11.5v3.2L4.3 17c-.3.2-.5.6-.5 1 0 .6.5 1 1 1h14.4c.6 0 1-.4 1-1 0-.4-.2-.8-.5-1l-3.2-2.3v-3.2C16.5 5 12 1.5 12 1.5zm0 6c.5 1 1 2.2 1 3.2 0 1-.5 2.2-1 3.2-.5-1-1-2.2-1-3.2 0-1 .5-2.2 1-3.2z" />
              <path d="M11.2 20.5a.8.8 0 0 1 1.6 0v2a.8.8 0 0 1-1.6 0v-2z" />
              <path d="M7.5 20.2a.8.8 0 0 1 1.2-.4l1.5 1a.8.8 0 0 1-.8 1.4l-1.5-1a.8.8 0 0 1-.4-1z" />
              <path d="M16.5 20.2a.8.8 0 0 0-1.2-.4l-1.5 1a.8.8 0 0 0 .8 1.4l1.5-1a.8.8 0 0 0 .4-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900">VocaTest</h1>
          <p className="text-slate-500 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Credenciales demo */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Cuentas de prueba
            </p>
            <p className="text-xs text-blue-600">
              👨‍🎓 Estudiante:{" "}
              <span className="font-mono font-bold">estudiante@ulima.edu.pe</span> / <span className="font-mono font-bold">ulima123</span>
            </p>
            <p className="text-xs text-blue-600">
              👨‍🏫 Profesor:{" "}
              <span className="font-mono font-bold">profesor@ulima.edu.pe</span> / <span className="font-mono font-bold">profe123</span>
            </p>
            <p className="text-xs text-purple-700 font-semibold">
              🛡️ Admin:{" "}
              <span className="font-mono">admin@vocatest.pe</span> / <span className="font-mono">admin123</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tucorreo@ulima.edu.pe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              {cargando ? "Verificando..." : "Iniciar Sesión 🚀"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}