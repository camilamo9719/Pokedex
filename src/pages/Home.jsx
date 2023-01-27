import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import '../components/Pokedex/styles/home.css'

const Home = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value = ''
        navigate('/pokedex')
    }

  return (
    <div className='home__body'>
        <img className='home__img' src="/Home/pokedex.png" alt=""></img>
        <h1 className='home__title'>Hello Trainer! :D </h1>
        <p className='home__subtitle'> Give me your name for start with your search!</p>
        <form className='home-form-container' onSubmit={handleSubmit}>
            <input className='home-form__input' id='name' type="text" />
            <button className='home-form__button'>Start</button>
        </form>
    </div>
  )
}

export default Home