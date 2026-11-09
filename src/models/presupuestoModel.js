
/* 1. IMPORTAR MONGOOSE
   Permite definir los esquemas de MongoDB. */
import mongoose from "mongoose";

/* 2. DEFINIR LOS ÍTEMS DEL PRESUPUESTO
   Cada ítem representa un mueble solicitado.
   Los ítems quedan dentro del presupuesto. */
const itemSchema = new mongoose.Schema({

  // Tipo de mueble y descripción
  tipoMueble: {
    type: String,
    required: true,
    trim: true
  },

  descripcion: {
    type: String,
    required: true,
    trim: true
  },

  // Medidas expresadas en centímetros
  // Si se informan, deben ser mayores que cero
  anchoCm: {
    type: Number,
    validate: {
      validator: (valor) => valor == null || valor > 0,
      message: "El ancho debe ser mayor que cero"
    }
  },

  altoCm: {
    type: Number,
    validate: {
      validator: (valor) => valor == null || valor > 0,
      message: "El alto debe ser mayor que cero"
    }
  },

  profundidadCm: {
    type: Number,
    validate: {
      validator: (valor) => valor == null || valor > 0,
      message: "La profundidad debe ser mayor que cero"
    }
  },

  // Cantidad de muebles
  cantidad: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "La cantidad debe ser un número entero"
    }
  },

  // Puertas y cajones, cuando corresponda
  cantidadPuertas: {
    type: Number,
    min: 0,
    validate: {
      validator: (valor) =>
        valor == null || Number.isInteger(valor),
      message: "La cantidad de puertas debe ser entera"
    }
  },

  cantidadCajones: {
    type: Number,
    min: 0,
    validate: {
      validator: (valor) =>
        valor == null || Number.isInteger(valor),
      message: "La cantidad de cajones debe ser entera"
    }
  },

  /* 3. REFERENCIA AL MATERIAL
     ObjectId identifica un documento
     de la colección materiales. */
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true
  },

  // Conserva los datos del material al cotizar
  materialNombreAlCotizar: {
    type: String,
    trim: true
  },

  precioMaterialAlCotizar: {
    type: Number,
    min: 0,
    default: null
  },

  // Importes pendientes hasta preparar la cotización
  precioUnitario: {
    type: Number,
    min: 0,
    default: null
  },

  precioItem: {
    type: Number,
    min: 0,
    default: null
  },

  // Información adicional del mueble
  observaciones: {
    type: String,
    trim: true
  },

  adjuntos: {
    type: [String],
    default: []
  }

}, {
  // Los ítems no necesitan identificador propio
  _id: false
});

/* 4. DEFINIR EL ESQUEMA DE PRESUPUESTOS */
const presupuestoSchema = new mongoose.Schema({

  // Relación directa con el usuario que solicita
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  // Lista de muebles dentro del presupuesto
  items: {
    type: [itemSchema],
    validate: {
      validator: (items) => items.length > 0,
      message: "El presupuesto debe contener al menos un mueble"
    }
  },

  /* 5. CÁLCULO DEL PRESUPUESTO
     Los importes comienzan en null porque
     todavía no existe una cotización. */
  subtotal: {
    type: Number,
    min: 0,
    default: null
  },

  porcentajeDescuento: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },

  montoDescuento: {
    type: Number,
    min: 0,
    default: null
  },

  total: {
    type: Number,
    min: 0,
    default: null
  },

  /* 6. ESTADO DEL PRESUPUESTO
     Una solicitud nueva comienza como solicitada. */
  estado: {
    type: String,
    enum: [
      "solicitado",
      "en_revision",
      "cotizado",
      "aceptado",
      "rechazado",
      "vencido"
    ],
    default: "solicitado"
  },

  // Fecha automática de la solicitud
  fechaCreacion: {
    type: Date,
    default: Date.now
  },

  // Se establece cuando se emite la cotización
  fechaVencimiento: {
    type: Date,
    default: null
  }

}, {
  collection: "presupuestos"
});

/* 7. CREAR Y EXPORTAR EL MODELO
   Vincula el esquema con MongoDB. */
const Presupuesto = mongoose.model(
  "Presupuesto",
  presupuestoSchema
);

export default Presupuesto;
