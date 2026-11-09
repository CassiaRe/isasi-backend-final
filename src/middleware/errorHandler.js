
/* 1. MANEJADOR GENERAL DE ERRORES
   Recibe los errores enviados por los controladores.
   Los cuatro parámetros identifican este middleware. */

export const errorHandler = (error, req, res, next) => {

  /* 2. ERRORES DEFINIDOS EN LOS SERVICIOS
     Utiliza el código HTTP indicado. */
  if (error.status) {
    return res.status(error.status).json({
      error: error.message
    });
  }

  /* 3. JSON INCORRECTO
     Se produce cuando los datos enviados
     no tienen un formato JSON válido. */
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "El JSON enviado no es válido"
    });
  }

  /* 4. IDENTIFICADOR INCORRECTO
     Detecta identificadores incompatibles
     con el formato esperado por MongoDB. */
  if (error.name === "CastError") {
    return res.status(400).json({
      error: "El identificador no tiene un formato válido"
    });
  }

  /* 5. ERROR DE VALIDACIÓN
     Por ejemplo, cuando falta un campo obligatorio. */
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Los datos no son válidos",
      detalles: Object.values(error.errors).map(
        (detalle) => detalle.message
      )
    });
  }

  /* 6. REGISTRO DUPLICADO
     Por ejemplo, un correo electrónico repetido. */
  if (error.code === 11000) {
    return res.status(400).json({
      error: "Ya existe un registro con ese dato"
    });
  }

  /* 7. ERROR INTERNO
     Muestra el detalle en la terminal,
     pero no expone información interna al cliente. */
  console.error(error);

  return res.status(500).json({
    error: "Error interno del servidor"
  });
};
