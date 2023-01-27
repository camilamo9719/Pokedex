import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Pokemon404 from '../components/pokedexId/Pokemon404'
import '../components/Pokedex/styles/PokedexInfo.css'

const PokedexInfo = () => {

  const {id} = useParams()

  const [pokemon, setPokemon] = useState()

  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [])

  const navigate = useNavigate()
  const handleToPokedex = () => {
    navigate(`/pokedex/`)
  }

  if(hasError){
    return <Pokemon404 />
  }
  

    // Logica de paginacion


  return (
    <article>

      <header>
        <div className='pokedex-id__pokemon-img' onClick={handleToPokedex}>
          <img className='pokedex-id__img' src="/public/images/home/pokedex.png" alt="pokedex__img" />
        </div>
    </header>


      <main className='pokedexById-container'>
      <section className='pokemon-data'>
        <div className="pokedex-id__header">
          <div className="pokedex-id__pokemon-img">
            <img className='pokedex-id__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
          </div>
        </div>
        <div className='pokemon-id'>{`#${pokemon?.id}`}</div>
        <div className="pokemon-name">
          <h2>{pokemon?.name}</h2>
          <hr />
        </div>
        <div className="pokemon-physics">
          <div className="weight">
            <h6>weight</h6>
            <p>{pokemon?.weight}</p>
          </div>
          <div className="height">
            <h6>height</h6>
            <p>{pokemon?.height}</p>
          </div>
        </div>
        <div className="pokemon-data-body">
        <div className="pokemon-types">
          <h4>Types</h4>
          <div className='pokemon-types__type'>
            {
            pokemon?.types.map((type, i)=>{
              const random = Math.floor(Math.random() * 150)
              const rgb = `rgb(${random},${random},${random})`
              
              return <div key={i} style={{backgroundColor:rgb}}>{type.type.name}</div>
              })
            }
          </div>
        </div>
        <div className="pokemon-abilities">
        <h4>Abilities</h4>
        <div className="ability">
        {
            pokemon?.abilities.map((ability, i)=>(
              <div key={i} >{ability.ability.name}</div>
            ))
            }
            </div>
        </div>
        <div className="statics">
          <h3>Stats</h3>
          <ul className='stats'>
            {
              pokemon?.stats.map((stat, i)=>(
                <li key={i}>
                  <span className='text'>{stat.stat.name}</span>
                  <span className='base'>{`${stat.base_stat}/150`}</span>
                  <span className='percent'>
                      <div style={{width: `${stat.base_stat}%`}}></div>
                  </span>
                </li>
              ))
            }
            
          </ul>
        </div>
        </div>
      </section>

      <section className="pokemon-moves">
        <h3>Movements</h3>
        <hr />
        <div className="movements">
            {
              pokemon?.moves.map((move, i)=>(
                <div key={i}>{move.move.name}</div>
              ))
            }
          </div>
      </section>
      </main>
    </article>
  )
}

export default PokedexInfo

