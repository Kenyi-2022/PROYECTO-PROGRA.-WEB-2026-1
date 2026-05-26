import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx' // IMPORTANTE
import Home from './pages/Home.jsx' 
import TestVocacional from './pages/TestVocacional.jsx'
import Login from './pages/Login.jsx'
import Perfil from './pages/Perfil.jsx'
import PerfilProfesor from'./pages/PerfilProfesor.jsx'
import EscogerPuesto from './pages/EscogerPuesto.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider> {/* 👈 Envolvemos aquí */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestVocacional />} />
          <Route path="/login" element={<Login />} />
          <Route path='/escogerpuesto' element={<EscogerPuesto/>}></Route>
           <Route path="/perfil" element={<Perfil/>} /> 
           <Route path="/perfilprofesor" element={<PerfilProfesor/>} /> 
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
