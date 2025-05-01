import './App.css'
import Nosotros from './components/Nosotros/Nosotros'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { ThemeProvider } from './context/themeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tienda from './pages/Tienda'
import Hombre from './pages/Hombre'
import Mujer from './pages/Mujer'
import Ninos from './pages/Ninos'

function App() {


  return (
    <>
    <ThemeProvider>
        <div className="App">
          <Navbar />
            <Routes>
              {/* Anidamos los demás componentes que van a actuar como rutas en <Routes> y cada uno como <Route> */}
                <Route path='/tienda' element={<Tienda />}></Route>

                <Route path='/hombre' element={<Hombre />}></Route>
                <Route path='/mujer' element={<Mujer />}></Route>
                <Route path='/ninos' element={<Ninos />}></Route>
           
                <Route path='/nosotros' element={<Nosotros />}></Route>
             
            {/* Otros componentes */}
            </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
