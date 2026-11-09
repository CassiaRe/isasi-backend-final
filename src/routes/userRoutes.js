
/* 1. IMPORTAR EXPRESS
   Router permite organizar las rutas de Usuarios. */
import { Router } from "express";

/* 2. IMPORTAR EL CONTROLADOR
   Se encarga de recibir y responder las solicitudes. */
import { registrarUsuarioController } from "../controllers/userController.js";

/* 3. CREAR EL ENRUTADOR */
const router = Router();

/* 4. DEFINIR LA RUTA DE REGISTRO
   POST recibe los datos de un nuevo usuario. */
router.post("/registro", registrarUsuarioController);

/* 5. EXPORTAR EL ENRUTADOR
   Se conectará con index.js. */
export default router;

