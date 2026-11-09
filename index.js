
/* 1. IMPORTAR LIBRERÍAS
   Configuración, Express y CORS. */
import "dotenv/config";
import express from "express";
import cors from "cors";

/* 2. IMPORTAR CONEXIÓN A MONGODB */
import { conectarDB } from "./src/config/db.js";

/* 3. IMPORTAR LAS RUTAS
   Materiales, Presupuestos y Usuarios. */
import materialRoutes from "./src/routes/materialRoutes.js";
import presupuestoRoutes from "./src/routes/presupuestoRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

/* 4. IMPORTAR MANEJADOR DE ERRORES */
import { errorHandler } from "./src/middleware/errorHandler.js";

/* 5. CONFIGURAR EL SERVIDOR */
const app = express();
const PORT = process.env.PORT || 4000;

/* 6. CONFIGURAR MIDDLEWARES
   Permitimos solicitudes y datos JSON. */
app.use(cors());
app.use(express.json());

/* 7. RUTA DE PRUEBA */
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API de Isasi Muebles funcionando"
  });
});

/* 8. REGISTRAR LAS RUTAS DE LA API */
app.use("/api/materiales", materialRoutes);
app.use("/api/presupuestos", presupuestoRoutes);
app.use("/api/usuarios", userRoutes);

/* 9. MANEJAR LOS ERRORES
   Debe estar después de las rutas. */
app.use(errorHandler);

/* 10. CONECTAR CON MONGODB */
await conectarDB();

/* 11. INICIAR EL SERVIDOR */
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
