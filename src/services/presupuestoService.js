
/* 1. IMPORTAR LOS MODELOS
   Permiten trabajar con las tres colecciones. */

import Presupuesto from "../models/presupuestoModel.js";
import Usuario from "../models/userModel.js";
import Material from "../models/materialModel.js";

/* 2. CONFIGURAR POPULATE
   Permite consultar los datos relacionados
   de Usuarios y Materiales. */

const POPULATE_USUARIO = {
  path: "usuarioId",
  select: "nombre apellido email"
};

const POPULATE_MATERIALES = {
  path: "items.materialId",
  select: "nombre categoria precioReferencia unidadCalculo"
};

/* 3. VERIFICAR REFERENCIAS
   Comprueba que existan el usuario y los materiales
   antes de guardar una solicitud. */

const verificarReferencias = async (datos) => {

  // Verificar que exista el usuario indicado
  if (datos.usuarioId) {
    const usuarioExiste = await Usuario.exists({
      _id: datos.usuarioId
    });

    if (!usuarioExiste) {
      const error = new Error("El usuario no existe");
      error.status = 400;
      throw error;
    }
  }

  // Verificar los materiales incluidos en los muebles
  if (Array.isArray(datos.items)) {
    for (const item of datos.items) {

      // El modelo verifica si falta materialId
      if (!item.materialId) continue;

      const materialExiste = await Material.exists({
        _id: item.materialId
      });

      if (!materialExiste) {
        const error = new Error("El material no existe");
        error.status = 400;
        throw error;
      }
    }
  }
};

/* 4. LISTAR PRESUPUESTOS
   Consulta todos los presupuestos con sus referencias. */

export const listarPresupuestos = async () => {
  return await Presupuesto.find()
    .populate(POPULATE_USUARIO)
    .populate(POPULATE_MATERIALES)
    .sort({ fechaCreacion: -1 });
};

/* 5. OBTENER UN PRESUPUESTO POR ID
   Consulta un presupuesto específico. */

export const obtenerPresupuestoPorId = async (id) => {
  return await Presupuesto.findById(id)
    .populate(POPULATE_USUARIO)
    .populate(POPULATE_MATERIALES);
};

/* 6. CREAR UN PRESUPUESTO
   Verifica las referencias y guarda la solicitud. */

export const crearPresupuesto = async (datos) => {

  // Verificar usuario y materiales
  await verificarReferencias(datos);

  // Guardar el presupuesto
  const presupuesto = await Presupuesto.create(datos);

  // Devolverlo con los datos relacionados
  return await presupuesto.populate([
    POPULATE_USUARIO,
    POPULATE_MATERIALES
  ]);
};

/* 7. ACTUALIZAR UN PRESUPUESTO
   Modifica sus datos aplicando las validaciones. */

export const actualizarPresupuesto = async (id, datos) => {

  // Verificar las referencias recibidas
  await verificarReferencias(datos);

  // Actualizar y devolver el documento modificado
  return await Presupuesto.findByIdAndUpdate(
    id,
    datos,
    {
      returnDocument: "after",
      runValidators: true
    }
  )
    .populate(POPULATE_USUARIO)
    .populate(POPULATE_MATERIALES);
};

/* 8. ELIMINAR UN PRESUPUESTO
   Busca el presupuesto por ID y lo elimina. */

export const eliminarPresupuesto = async (id) => {
  return await Presupuesto.findByIdAndDelete(id);
};
