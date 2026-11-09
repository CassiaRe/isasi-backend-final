
/* 1. IMPORTAR EL MODELO
   Permite trabajar con la colección Usuarios. */

import Usuario from "../models/userModel.js";

/* 2. REGISTRAR UN USUARIO
   Recibe los datos enviados desde la API. */

export const registrarUsuario = async (datos) => {

  // Obtener únicamente los datos necesarios
  const {
    nombre,
    apellido,
    email,
    telefono,
    password
  } = datos;

  /* 3. VALIDAR LA CONTRASEÑA
     Exigimos al menos 6 caracteres,
     siguiendo el ejemplo del profesor. */

  if (typeof password !== "string" || password.length < 6) {
    const error = new Error(
      "La contraseña debe tener al menos 6 caracteres"
    );

    error.status = 400;
    throw error;
  }

  /* 4. CREAR EL USUARIO
     El modelo transforma passwordHash
     mediante bcrypt antes de guardarlo.
     El rol cliente se asigna automáticamente. */

  const usuario = await Usuario.create({
    nombre,
    apellido,
    email,
    telefono,
    passwordHash: password
  });

  /* 5. DEVOLVER EL USUARIO
     No enviamos la contraseña ni su hash
     en la respuesta de la API. */

  return {
    _id: usuario._id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    telefono: usuario.telefono,
    rol: usuario.rol
  };
};
