const Perfil = () => {
    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
            
            {/* NAVBAR */}
            <nav className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                
                <button className="text-2xl">
                    ☰
                </button>

                <div className="flex items-center gap-3">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="https://placehold.co/40x40/png"
                        alt="perfil"
                    />

                    <div>
                        <h3 className="text-lg font-black text-slate-900">
                            Nombre
                        </h3>

                        <p className="text-slate-600 text-sm">
                            Profesor
                        </p>
                    </div>
                </div>
            </nav>

            {/* TITULO */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                
                <div>
                    <h3 className="text-2xl font-black text-slate-900">
                        Mi Perfil
                    </h3>

                    <p className="text-slate-600 text-sm md:text-base">
                        Gestiona tu información personal y revisa tu actividad
                    </p>
                </div>

                <button className="cursor-pointer rounded-lg bg-indigo-600 text-white px-4 py-2 shadow-lg shadow-indigo-600/20 hover:shadow-xl w-full md:w-auto">
                    ✎ Editar Perfil
                </button>
            </div>

            {/* GRID */}
            <section className="py-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* INFORMACION PERSONAL */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-5">
                        
                        <img
                            className="w-24 h-24 rounded-full object-cover shrink-0"
                            src="https://placehold.co/100x100/png"
                            alt="perfil"
                        />

                        <div className="wrap-break-words">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Nombre
                            </h3>

                            <div className="space-y-2">
                                <p className="text-slate-600">
                                    ✉ Correo
                                </p>

                                <p className="text-slate-600">
                                    🕻 Teléfono
                                </p>

                                <p className="text-slate-600">
                                    🕯️ Edad
                                </p>

                                <p className="text-slate-600">
                                    ⚥ Sexo
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        
                        <div className="flex items-center gap-3 mb-5">
                            <div className="text-xl bg-emerald-100 p-2 rounded-xl text-emerald-600">
                                🔒︎
                            </div>

                            <h3 className="text-xl font-bold text-slate-900">
                                Seguridad de la cuenta
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 text-sm md:text-base">
                            
                            <p className="text-slate-600">
                                Contraseña:
                            </p>

                            <p className="text-right text-slate-600">
                                ********
                            </p>

                            <p className="text-slate-600">
                                Correo:
                            </p>

                            <div className="text-right">
                                <button className="rounded-lg bg-indigo-100 text-indigo-600 px-2 py-1 text-sm">
                                    Verificado
                                </button>
                            </div>

                            <p className="text-slate-600">
                                Último inicio:
                            </p>

                            <p className="text-right text-slate-600">
                                30/06/2022
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 xl:col-span-2">
                        
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            
                            <div className="flex items-center gap-3">
                                <div className="text-xl bg-purple-100 p-2 rounded-xl text-purple-600">
                                    📄
                                </div>

                                <h3 className="text-xl font-bold text-slate-900">
                                    Resumen de mi actividad
                                </h3>
                            </div>

                            <select
                                name="antiguedad"
                                id="antiguedad"
                                className="border border-slate-300 rounded-lg px-3 py-2"
                            >
                                <option value="semana">
                                    Esta semana
                                </option>

                                <option value="mes">
                                    Este mes
                                </option>

                                <option value="anio">
                                    Este año
                                </option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                            <div className="bg-purple-100 p-4 rounded-xl text-center">
                                <div className="text-2xl mb-2 text-purple-600">
                                    ❤︎
                                </div>

                                <p className="text-2xl font-bold text-slate-900">
                                    10
                                </p>

                                <p className="text-slate-600 text-sm">
                                    Estudiantes asignados
                                </p>
                            </div>

                            <div className="bg-emerald-100 p-4 rounded-xl text-center">
                                <div className="text-2xl mb-2 text-emerald-600">
                                    ❤︎
                                </div>

                                <p className="text-2xl font-bold text-slate-900">
                                    18
                                </p>

                                <p className="text-slate-600 text-sm">
                                    Clases realizadas
                                </p>
                            </div>

                            <div className="bg-orange-100 p-4 rounded-xl text-center">
                                <div className="text-2xl mb-2 text-orange-600">
                                    ❤︎
                                </div>

                                <p className="text-2xl font-bold text-slate-900">
                                    40
                                </p>

                                <p className="text-slate-600 text-sm">
                                    Test revisados
                                </p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-xl text-center">
                                <div className="text-2xl mb-2 text-blue-600">
                                    ❤︎
                                </div>

                                <p className="text-2xl font-bold text-slate-900">
                                    12
                                </p>

                                <p className="text-slate-600 text-sm">
                                    Recursos compartidos
                                </p>
                            </div>
                        </div>
                    </div>

                  
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 xl:col-span-2">
                        
                        <div className="flex items-center gap-3 mb-6">
                            
                            <div className="text-xl bg-red-100 p-2 rounded-xl text-red-600">
                                ❤︎
                            </div>

                            <h3 className="text-xl font-bold text-slate-900">
                                Información profesional
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            
                            <div className="space-y-3">
                                <p className="text-slate-600">
                                    Especialidad
                                </p>

                                <p className="text-slate-600">
                                    Grado académico
                                </p>

                                <p className="text-slate-600">
                                    Años de experiencia
                                </p>

                                <p className="text-slate-600">
                                    Estado de cuenta
                                </p>
                            </div>

                            <div className="space-y-3 sm:text-right">
                                <p className="text-slate-900 font-medium">
                                    Matemáticas
                                </p>

                                <p className="text-slate-900 font-medium">
                                    Magíster en educación
                                </p>

                                <p className="text-slate-900 font-medium">
                                    8 años
                                </p>

                                <p className="text-emerald-600 font-semibold">
                                    Activo
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Perfil