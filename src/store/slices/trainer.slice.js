// Aquí vendrá el nombre del entrenador Pokemon :D
// Crear una función para el estado global

import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
    name: 'trainer',
    initialState: '',
    reducers: {
        setTrainerGlobal: (state, action) => action.payload
    }
})

export const { setTrainerGlobal } = trainerSlice.actions

export default trainerSlice.reducer