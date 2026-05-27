import { useNavigate } from "react-router-dom";
//pagina provicional pare ver los perfiles
const EscogerPuesto = () => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4">
            
            <button
                onClick={() => navigate('/Perfil')}
                className="cursor-pointer rounded-lg border-indigo-600 border-2 text-indigo-600 px-2 py-1 hover:shadow-xl"
            >
                <span>Alumno</span>
            </button>

            <button
                onClick={() => navigate('/perfilprofesor')}
                className="cursor-pointer rounded-lg border-indigo-600 border-2 text-indigo-600 px-2 py-1 hover:shadow-xl"
            >
                <span>Profesor</span>
            </button>

        </div>
    );
};

export default EscogerPuesto;