
/* 1. IMPORTAR MONGOOSE
   Permite conectar nuestra aplicación con MongoDB. */

import mongoose from "mongoose";

/* 2. FUNCIÓN DE CONEXIÓN
   async permite trabajar con operaciones
   que necesitan tiempo para completarse. */

export async function conectarDB() {
  try {
    // Obtiene la dirección privada desde .env
    await mongoose.connect(process.env.MONGO_URI);

    // Confirma que la conexión fue exitosa
    console.log("MongoDB Atlas conectado correctamente");

  } catch (error) {
    // Informa si ocurrió un problema
    console.error("Error al conectar con MongoDB:", error.message);

    // Detiene la aplicación si no hay conexión
    process.exit(1);
  }
}

