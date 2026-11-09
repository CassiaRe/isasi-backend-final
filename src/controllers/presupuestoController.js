
/* 1. IMPORTAR EL SERVICIO
   Contiene las operaciones de Presupuestos. */

import * as presupuestoService from "../services/presupuestoService.js";

/* 2. LISTAR PRESUPUESTOS
   GET: devuelve todos los presupuestos. */

export const listarPresupuestosController = async (req, res, next) => {
  try {
    const presupuestos = await presupuestoService.listarPresupuestos();

    res.status(200).json(presupuestos);
  } catch (error) {
    next(error);
  }
};

/* 3. OBTENER UN PRESUPUESTO POR ID
   GET: busca un presupuesto específico. */

export const obtenerPresupuestoController = async (req, res, next) => {
  try {
    const presupuesto = await presupuestoService.obtenerPresupuestoPorId(
      req.params.id
    );

    // Si no existe, responder con 404
    if (!presupuesto) {
      return res.status(404).json({
        error: "Presupuesto no encontrado"
      });
    }

    res.status(200).json(presupuesto);
  } catch (error) {
    next(error);
  }
};

/* 4. CREAR UN PRESUPUESTO
   POST: recibe y registra una solicitud. */

export const crearPresupuestoController = async (req, res, next) => {
  try {
    const presupuesto = await presupuestoService.crearPresupuesto(req.body);

    res.status(201).json(presupuesto);
  } catch (error) {
    next(error);
  }
};

/* 5. ACTUALIZAR UN PRESUPUESTO
   PUT: modifica un presupuesto existente. */

export const actualizarPresupuestoController = async (req, res, next) => {
  try {
    const presupuesto = await presupuestoService.actualizarPresupuesto(
      req.params.id,
      req.body
    );

    // Si no existe, responder con 404
    if (!presupuesto) {
      return res.status(404).json({
        error: "Presupuesto no encontrado"
      });
    }

    res.status(200).json(presupuesto);
  } catch (error) {
    next(error);
  }
};

/* 6. ELIMINAR UN PRESUPUESTO
   DELETE: elimina un presupuesto por su ID. */

export const eliminarPresupuestoController = async (req, res, next) => {
  try {
    const presupuesto = await presupuestoService.eliminarPresupuesto(
      req.params.id
    );

    // Si no existe, responder con 404
    if (!presupuesto) {
      return res.status(404).json({
        error: "Presupuesto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Presupuesto eliminado correctamente",
      presupuesto
    });
  } catch (error) {
    next(error);
  }
};
