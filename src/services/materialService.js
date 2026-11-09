
/* 1. IMPORTAR LOS MODELOS
   Material permite trabajar con los materiales.
   Presupuesto permite verificar sus referencias. */

import Material from "../models/materialModel.js";
import Presupuesto from "../models/presupuestoModel.js";

/* 2. LISTAR MATERIALES
   Obtiene todos los materiales de MongoDB,
   ordenados alfabéticamente por nombre. */

export const listarMateriales = async () => {
  return await Material.find().sort({ nombre: 1 });
};

/* 3. OBTENER UN MATERIAL POR ID
   Busca un material mediante su identificador. */

export const obtenerMaterialPorId = async (id) => {
  return await Material.findById(id);
};

/* 4. CREAR UN MATERIAL
   Recibe los datos y guarda un documento nuevo. */

export const crearMaterial = async (datos) => {
  return await Material.create(datos);
};

/* 5. ACTUALIZAR UN MATERIAL
   Modifica sus datos y registra la fecha del cambio. */

export const actualizarMaterial = async (id, datos) => {
  return await Material.findByIdAndUpdate(
    id,
    {
      ...datos,
      fechaActualizacion: new Date()
    },
    {
      returnDocument: "after",
      runValidators: true
    }
  );
};

/* 6. ELIMINAR UN MATERIAL
   Antes de eliminar, verifica que no esté
   referenciado dentro de algún presupuesto. */

export const eliminarMaterial = async (id) => {

  // Buscar presupuestos que utilicen este material
  const estaUtilizado = await Presupuesto.exists({
    "items.materialId": id
  });

  // Impedir su eliminación si existen referencias
  if (estaUtilizado) {
    const error = new Error(
      "No se puede eliminar un material utilizado en presupuestos"
    );

    error.status = 409;
    throw error;
  }

  // Eliminar únicamente si no está siendo utilizado
  return await Material.findByIdAndDelete(id);
};
