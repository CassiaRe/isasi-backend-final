
/* 1. IMPORTAR EL SERVICIO
   El controlador utiliza las funciones de Materiales.
   No consulta MongoDB directamente. */

import * as materialService from "../services/materialService.js";

/* 2. LISTAR MATERIALES
   GET: devuelve todos los materiales. */

export const listarMaterialesController = async (req, res, next) => {
  try {
    const materiales = await materialService.listarMateriales();
    res.status(200).json(materiales);
  } catch (error) {
    next(error);
  }
};

/* 3. OBTENER UN MATERIAL POR ID
   GET: devuelve un material específico. */

export const obtenerMaterialController = async (req, res, next) => {
  try {
    const material = await materialService.obtenerMaterialPorId(req.params.id);

    // Si no existe, responder con 404
    if (!material) {
      return res.status(404).json({ error: "Material no encontrado" });
    }

    res.status(200).json(material);
  } catch (error) {
    next(error);
  }
};

/* 4. CREAR UN MATERIAL
   POST: recibe los datos y crea un material. */

export const crearMaterialController = async (req, res, next) => {
  try {
    const material = await materialService.crearMaterial(req.body);
    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
};

/* 5. ACTUALIZAR UN MATERIAL
   PUT: modifica un material existente. */

export const actualizarMaterialController = async (req, res, next) => {
  try {
    const material = await materialService.actualizarMaterial(
      req.params.id,
      req.body
    );

    // Si no existe, responder con 404
    if (!material) {
      return res.status(404).json({ error: "Material no encontrado" });
    }

    res.status(200).json(material);
  } catch (error) {
    next(error);
  }
};

/* 6. ELIMINAR UN MATERIAL
   DELETE: elimina un material si está permitido. */

export const eliminarMaterialController = async (req, res, next) => {
  try {
    const material = await materialService.eliminarMaterial(req.params.id);

    // Si no existe, responder con 404
    if (!material) {
      return res.status(404).json({ error: "Material no encontrado" });
    }

    res.status(200).json({
      mensaje: "Material eliminado correctamente",
      material
    });
  } catch (error) {
    next(error);
  }
};
