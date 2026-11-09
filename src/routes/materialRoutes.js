
/* 1. IMPORTAR EXPRESS
   Router permite organizar las rutas de Materiales. */
import { Router } from "express";

/* 2. IMPORTAR LOS CONTROLADORES
   Cada controlador responde a una operación HTTP. */
import {
  listarMaterialesController,
  obtenerMaterialController,
  crearMaterialController,
  actualizarMaterialController,
  eliminarMaterialController
} from "../controllers/materialController.js";

/* 3. CREAR EL ENRUTADOR */
const router = Router();

/* 4. DEFINIR LAS RUTAS CRUD */

// GET: listar todos los materiales
router.get("/", listarMaterialesController);

// GET: consultar un material por ID
router.get("/:id", obtenerMaterialController);

// POST: crear un material
router.post("/", crearMaterialController);

// PUT: actualizar un material
router.put("/:id", actualizarMaterialController);

// DELETE: eliminar un material
router.delete("/:id", eliminarMaterialController);

/* 5. EXPORTAR LAS RUTAS
   Se conectarán al servidor principal. */
export default router;
