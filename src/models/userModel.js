
/* 1. IMPORTAR LIBRERÍAS
   Mongoose define los datos.
   bcrypt protege las contraseñas. */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* 2. DEFINIR EL ESQUEMA DE USUARIOS */

const userSchema = new mongoose.Schema({

  // Nombre y apellido del usuario
  nombre: {
    type: String,
    required: true,
    trim: true
  },

  apellido: {
    type: String,
    required: true,
    trim: true
  },

  // Correo electrónico único
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  // Teléfono de contacto opcional
  telefono: {
    type: String,
    trim: true
  },

  // Contraseña almacenada como hash
  passwordHash: {
    type: String,
    required: true,
    select: false
  },

  // Tipo de usuario
  rol: {
    type: String,
    enum: ["cliente", "admin"],
    default: "cliente"
  },

  // Estado de la cuenta
  activo: {
    type: Boolean,
    default: true
  },

  // Fecha del registro
  fechaRegistro: {
    type: Date,
    default: Date.now
  }

}, {
  collection: "usuarios"
});

/* 3. PROTEGER LA CONTRASEÑA
   Antes de guardar, bcrypt convierte
   la contraseña recibida en un hash. */

userSchema.pre("save", async function () {

  // Si la contraseña no cambió, no vuelve a procesarla
  if (!this.isModified("passwordHash")) return;

  // Genera el hash con un factor de costo de 10
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);

});

/* 4. COMPARAR CONTRASEÑAS
   Permite verificar la contraseña durante el login. */

userSchema.methods.compararPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

/* 5. PROTEGER LAS RESPUESTAS JSON
   Evita incluir el hash cuando se
   convierte el usuario a JSON. */

userSchema.set("toJSON", {
  transform: (documento, resultado) => {
    delete resultado.passwordHash;
    return resultado;
  }
});

/* 6. CREAR Y EXPORTAR EL MODELO */

const Usuario = mongoose.model("Usuario", userSchema);

export default Usuario;
