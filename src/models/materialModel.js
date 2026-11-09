
/* 1. IMPORTAR MONGOOSE
   Permite crear el modelo de datos para MongoDB. */

import mongoose from "mongoose";

/* 2. DEFINIR EL ESQUEMA DE MATERIALES
   Un esquema establece los campos, sus tipos
   y las validaciones que deben cumplir. */

const materialSchema = new mongoose.Schema({

  // Nombre del material: obligatorio
  nombre: {
    type: String,
    required: true,
    trim: true
  },

  // Categoría: obligatoria, sin limitar las opciones
  categoria: {
    type: String,
    required: true,
    trim: true
  },

  // Precio de referencia: obligatorio y no negativo
  precioReferencia: {
    type: Number,
    required: true,
    min: 0
  },

  // Unidad utilizada para calcular el precio
  unidadCalculo: {
    type: String,
    required: true,
    trim: true
  },

  // Indica si el material está disponible
  activo: {
    type: Boolean,
    default: true
  },

  // Fecha de registro o actualización del precio
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }

}, {
  // Nombre de la colección en MongoDB
  collection: "materiales"
});

/* 3. CREAR EL MODELO
   Vincula el esquema con la colección materiales. */

const Material = mongoose.model("Material", materialSchema);

/* 4. EXPORTAR EL MODELO
   Permite utilizarlo desde los servicios. */

export default Material;
