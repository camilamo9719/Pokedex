// Para el store y configurarla con redux
// Esta es la configuración de la store ya que la app es grande

import { configureStore } from "@reduxjs/toolkit";
import trainer from './slices/trainer.slice'

// Función que recibe un objeto con la propiedad reducer
export default configureStore({
        reducer: {
            trainer
        }
    }
)