import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import Pokedex from './pages/Pokedex'
import PokedexInfo from './pages/PokedexInfo'
import Pagination from './components/Pokedex/Pagination'
import Footer from './pages/Footer'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Rutas protegidas para acceder a la Pokedex */ }
        <Route element={<ProtectedRoutes />}>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokedexInfo />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
