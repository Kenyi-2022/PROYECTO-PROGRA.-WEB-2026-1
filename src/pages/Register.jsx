import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, carreraTemporal } = useApp();

  const [form, setForm] = useState({
    rol: "Estudiante", 
    nombres: "",
    apellidos: "",
    correo: "",
    contraseña: "",
    confirmar: "",
    ciudad: "",
    telefono: "",
    edad: "",
    sexo: "",
    tipoColegio: "",
    especialidad: "" 
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (rol) => {
    setForm({ ...form, rol: rol, tipoColegio: "", especialidad: "" });
    setError('');
  };

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

  const isProfesor = form.rol === "Profesor";
  const themeColor = isProfesor ? "purple" : "blue";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-10">
      <div className="max-w-lg w-full space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-${themeColor}-600 rounded-2xl mb-4 shadow-lg transition-colors`}>
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
          <h1 className="text-3xl font-black text-slate-900">Crear cuenta</h1>
          <p className="text-slate-500 text-sm mt-1">Únete a VocaTest — Universidad de Lima</p>
        </div>

        {/* Selector de Rol */}
        <div className="bg-slate-200 p-1.5 rounded-xl flex gap-1 shadow-inner">
          <button 
            type="button"
            onClick={() => handleRoleChange("Estudiante")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isProfesor ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            👨‍🎓 Soy Estudiante
          </button>
          <button 
            type="button"
            onClick={() => handleRoleChange("Profesor")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isProfesor ? 'bg-white shadow-sm text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            👨‍🏫 Soy Profesor
          </button>
        </div>

        {/* Aviso si viene del test */}
        {carreraTemporal && !isProfesor && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
            ✅ Tu resultado del test (<strong>{carreraTemporal}</strong>) se guardará automáticamente.
          </div>
        )}
        {carreraTemporal && isProfesor && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
            ⚠️ Si te registras como Profesor, se descartará el test vocacional que tomaste temporalmente.
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Fila nombres */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombres *</label>
                <input name="nombres" onChange={handleChange} placeholder="Ej. Carlos"
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Apellidos *</label>
                <input name="apellidos" onChange={handleChange} placeholder="Ej. Mendoza"
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Correo electrónico *</label>
              <input name="correo" type="email" onChange={handleChange} placeholder="tucorreo@ulima.edu.pe"
                className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña *</label>
                <input name="contraseña" type="password" onChange={handleChange} placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Confirmar *</label>
                <input name="confirmar" type="password" onChange={handleChange} placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Ciudad</label>
                <input name="ciudad" onChange={handleChange} placeholder="Lima"
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Teléfono</label>
                <input name="telefono" onChange={handleChange} placeholder="9XX-XXX-XXX"
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Edad</label>
                <input name="edad" type="number" onChange={handleChange} placeholder="17"
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Sexo</label>
                <select name="sexo" onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-${themeColor}-100 font-medium transition-all bg-white`}>
                  <option value="">Seleccionar</option>
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Prefiero no decir</option>
                </select>
              </div>
            </div>

            {/* Campo Dinámico según el Rol */}
            {isProfesor ? (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Especialidad Docente</label>
                <input name="especialidad" onChange={handleChange} placeholder="Ej. Matemáticas, Psicología, Letras" value={form.especialidad}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-purple-100 font-medium transition-all`} />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de colegio de procedencia</label>
                <select name="tipoColegio" onChange={handleChange} value={form.tipoColegio}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium transition-all bg-white">
                  <option value="">Seleccionar tipo</option>
                  <option>Público</option>
                  <option>Privado</option>
                </select>
              </div>
            )}

            <button type="submit" disabled={cargando}
              className={`w-full bg-linear-to-r ${isProfesor ? 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-60 mt-2`}>
              {cargando ? "Creando cuenta..." : `Registrarme como ${form.rol} 🚀`}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className={`text-${themeColor}-600 font-bold hover:underline`}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}