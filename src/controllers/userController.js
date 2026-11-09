
/* 1. IMPORTAR EL SERVICIO
   El controlador no accede directamente a MongoDB. */
import * as userService from "../services/userService.js";

/* 2. REGISTRAR UN USUARIO
   POST: recibe los datos y solicita su registro. */
export const registrarUsuarioController = async (req, res, next) => {
  try {
    // Enviar los datos recibidos al servicio
    const usuario = await userService.registrarUsuario(req.body);

    // Responder con 201: usuario creado correctamente
    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario
    });

  } catch (error) {
    // Enviar los errores al middleware central
    next(error);
  }
};
