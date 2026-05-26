const Perfil = () => {
    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-screen overflow-x-hidden">

            <nav className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                <button className="text-2xl">
                    ☰
                </button>

                <div className="flex items-center gap-3">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="https://placehold.co/40x40/png"
                        alt=""
                    />

                    <div>
                        <h3 className="text-lg font-black text-slate-900">
                            Nombre
                        </h3>

                        <p className="text-slate-600 text-sm">
                            Estudiante
                        </p>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-2">

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

            <section className="py-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-linear-to-br from-slate-50 to-teal-50/20 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-5">

                        <img
                            className="w-24 h-24 rounded-full object-cover shrink-0"
                            src="https://placehold.co/100x100/png"
                            alt=""
                        />

                        <div className="space-y-2 wrap-break-words">
                            <h3 className="text-xl font-bold text-slate-900">
                                Nombre
                            </h3>

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

                    <div className="bg-linear-to-br from-slate-50 to-purple-50/20 p-6 rounded-2xl border border-slate-200">

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

                </div>
            </section>

            <section className="py-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-linear-to-br from-slate-50 to-teal-50/20 p-6 rounded-2xl border border-slate-200">

                        <div className="flex items-start gap-4">
                            <div className="text-xl bg-purple-100 p-2 rounded-xl text-purple-600 shrink-0">
                                📄
                            </div>

                            <div className="w-full">

                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    Resultado del último test vocacional
                                </h3>

                                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">

                                    <p className="text-slate-600 text-sm md:text-base">
                                        Fecha:
                                        <strong className="text-indigo-600 ml-2">
                                            12 enero 2026
                                        </strong>
                                    </p>

                                    <button className="cursor-pointer rounded-lg border-indigo-600 border-2 text-indigo-600 px-3 py-1 hover:bg-indigo-50 w-full sm:w-auto">
                                        Ver detalles
                                    </button>
                                </div>

                                <h4 className="text-lg font-bold text-slate-900 mb-2">
                                    Tus tres carreras recomendadas
                                </h4>

                                <div className="space-y-2">
                                    <p className="text-slate-600">
                                        Ingeniería de Sistemas
                                    </p>

                                    <p className="text-slate-600">
                                        Economía
                                    </p>

                                    <p className="text-slate-600">
                                        Ingeniería Civil
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-slate-50 to-purple-50/20 p-6 rounded-2xl border border-slate-200">

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-5">

                            <div className="flex items-center gap-3">
                                <div className="text-xl bg-red-100 p-2 rounded-xl text-red-600">
                                    ❤︎
                                </div>

                                <h3 className="text-xl font-bold text-slate-900">
                                    Universidades Favoritas
                                </h3>
                            </div>

                            <button className="cursor-pointer rounded-lg border-indigo-600 border-2 text-indigo-600 px-3 py-1 hover:shadow-xl w-full sm:w-auto">
                                Ver todas
                            </button>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-150">
                                <tbody className="divide-y divide-slate-200">

                                    <tr>
                                        <td className="py-3">
                                            <img
                                                className="w-8 h-8 object-contain"
                                                src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Universidad_de_Lima_logo.png"
                                                alt=""
                                            />
                                        </td>

                                        <td className="py-3 px-2">
                                            <span className="text-slate-600 text-sm md:text-base">
                                                Universidad de Lima
                                            </span>
                                        </td>

                                        <td className="py-3 px-2">
                                            <button className="rounded-lg bg-indigo-100 text-indigo-600 px-2 py-1 text-sm">
                                                Privada
                                            </button>
                                        </td>

                                        <td className="py-3 text-red-600 text-xl text-center">
                                            ❤︎
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3">
                                            <img
                                                className="w-8 h-8 object-contain"
                                                src="https://upload.wikimedia.org/wikipedia/commons/e/e0/UPacifico.png"
                                                alt=""
                                            />
                                        </td>

                                        <td className="py-3 px-2">
                                            <span className="text-slate-600 text-sm md:text-base">
                                                Universidad del Pacífico
                                            </span>
                                        </td>

                                        <td className="py-3 px-2">
                                            <button className="rounded-lg bg-indigo-100 text-indigo-600 px-2 py-1 text-sm">
                                                Privada
                                            </button>
                                        </td>

                                        <td className="py-3 text-red-600 text-xl text-center">
                                            ❤︎
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3">
                                            <img
                                                className="w-8 h-8 object-contain"
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNMSM_coatofarms_seal.svg/250px-UNMSM_coatofarms_seal.svg.png"
                                                alt=""
                                            />
                                        </td>

                                        <td className="py-3 px-2">
                                            <span className="text-slate-600 text-sm md:text-base">
                                                Universidad Nacional Mayor de San Marcos
                                            </span>
                                        </td>

                                        <td className="py-3 px-2">
                                            <button className="rounded-lg bg-emerald-100 text-emerald-600 px-2 py-1 text-sm">
                                                Pública
                                            </button>
                                        </td>

                                        <td className="py-3 text-red-600 text-xl text-center">
                                            ❤︎
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default Perfil