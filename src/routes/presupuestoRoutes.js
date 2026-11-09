
/* 1. IMPORTAR EXPRESS
   Router permite organizar las rutas de Presupuestos. */
import { Router } from "express";

/* 2. IMPORTAR LOS CONTROLADORES
   Cada controlador gestiona una operación HTTP. */
import {
  listarPresupuestosController,
  obtenerPresupuestoController,
  crearPresupuestoController,
  actualizarPresupuestoController,
  eliminarPresupuestoController
} from "../controllers/presupuestoController.js";

/* 3. CREAR EL ENRUTADOR */
const router = Router();

/* 4. DEFINIR LAS RUTAS CRUD */

// GET: listar todos los presupuestos
router.get("/", listarPresupuestosController);

// GET: consultar un presupuesto por ID
router.get("/:id", obtenerPresupuestoController);

// POST: crear una solicitud de presupuesto
router.post("/", crearPresupuestoController);

// PUT: actualizar un presupuesto existente
router.put("/:id", actualizarPresupuestoController);

// DELETE: eliminar un presupuesto por ID
router.delete("/:id", eliminarPresupuestoController);

/* 5. EXPORTAR LAS RUTAS
   Se conectarán al servidor principal. */
export default router;
