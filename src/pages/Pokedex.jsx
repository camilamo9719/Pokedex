import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import '../components/Pokedex/styles/Pokedex.css'

const Pokedex = () => {

  {/*Acceder al valor del nombre del entrenador desde la store con useSelector*/}
  const { trainer } = useSelector(state => state)

  {/* Peticiones asincrónica */}
  const [pokemons, setPokemons] = useState()
  const [types, setTypes] = useState()
  const [typeSelected, setTypeSelected] = useState('All pokemons')
  
  const navigate = useNavigate()

  useEffect(() => {
    if(typeSelected !== 'All pokemons'){
      // hacer la petición de los pokemons por tipo
      axios.get(typeSelected)
        .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
        .catch(err => console.log(err))
    } else {
      // hacer la petición de todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=30'
      axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }
  }, [typeSelected])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const input = e.target.search.value.trim().toLowerCase()
    navigate(`/pokedex/${input}`)
  }

  const handleChange = e => {
    setTypeSelected(e.target.value)
  }

  // Lógica de la paginación
  const [page, setPage] = useState(1)
  const [pokePerPage, setpokePerPage] = useState(8)
  const initialPoke = (page -1) * pokePerPage
  const finalPoke = page * pokePerPage
  const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

  return (
    <div className='pokedex-container'>
      <h2 className='pokedex-container__title'>Welcome <span className='span__trainer'>{trainer}</span>, here you can find your favorite Pokemon! </h2>
      <form className='pokedex-form-container' onSubmit={handleSubmit}>
        <input className='pokedex-form__input' id='search' type='text' />
        <button className='pokedex-form__button'>Search</button>
      </form>
      <select className='pokedex__select' onChange={handleChange}>
        <option value='All pokemons'>All Pokemons</option>
        {
          types?.map(type => (
            <option key={type.url} value={type.url}>{type.name}</option>
          ))
        }
      </select>
      <Pagination 
        page={page} 
        maxPage={maxPage}
        setPage={setPage}
      />
      <div className='poke-container'>
        {
          pokemons?.slice(initialPoke, finalPoke).map(poke => (
            <PokeCard 
              key={poke.url} 
              url={poke.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Pokedex