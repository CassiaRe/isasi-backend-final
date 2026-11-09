
# Isasi Muebles | Backend API REST

## 1. Descripción del proyecto

API REST desarrollada como Trabajo Práctico Final del curso Backend Developer de UTN.

El proyecto permite gestionar solicitudes de presupuestos de muebles a medida para Isasi Muebles mediante una base de datos MongoDB.

La entidad principal es Presupuestos, relacionada con Usuarios y Materiales.

## 2. Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript ES Modules
- dotenv
- CORS
- bcrypt

## 3. Modelo de datos

### Usuarios
Almacena nombre, apellido, email, teléfono, contraseña protegida, rol, estado y fecha de registro.

La contraseña se guarda como hash mediante bcrypt y un pre-save hook de Mongoose.

### Materiales
Almacena nombre, categoría, precio de referencia, unidad de cálculo, estado y fecha de actualización.

### Presupuestos
Almacena el usuario solicitante, los muebles solicitados, importes, descuentos, estado y fechas.

Cada presupuesto contiene un arreglo `items` con los datos de cada mueble.

### Relaciones

- Un usuario puede tener varios presupuestos (1:N).
- Cada presupuesto contiene uno o varios ítems embebidos.
- Cada ítem referencia un material mediante ObjectId.
- Se utiliza `populate()` para consultar los datos relacionados de Usuarios y Materiales.

## 4. Arquitectura del proyecto

- `src/config/`: conexión a MongoDB.
- `src/models/`: esquemas y modelos de Mongoose.
- `src/services/`: lógica de negocio y consultas a la base de datos.
- `src/controllers/`: recepción de solicitudes y respuestas HTTP.
- `src/routes/`: definición de rutas de la API.
- `src/middleware/`: manejo centralizado de errores.
- `index.js`: configuración e inicio del servidor.

Se aplica separación de responsabilidades entre modelos, servicios, controladores y rutas.

## 5. Instalación y ejecución

Requisitos:
- Node.js
- Conexión a MongoDB Atlas

Instalar dependencias:

    npm install

Crear un archivo `.env` con las variables:

    PORT=4000
    MONGO_URI=mongodb+srv://USUARIO:CLAVE@SERVIDOR/isasi_backend

Reemplazar los datos de ejemplo por las credenciales propias.

Iniciar el servidor:

    node index.js

La API estará disponible en:

    http://localhost:4000

## 6. Endpoints disponibles

### Materiales

| Método | Ruta | Acción |
|--------|------|--------|
| GET | /api/materiales | Listar materiales |
| GET | /api/materiales/:id | Obtener material |
| POST | /api/materiales | Crear material |
| PUT | /api/materiales/:id | Actualizar material |
| DELETE | /api/materiales/:id | Eliminar material |

### Presupuestos

| Método | Ruta | Acción |
|--------|------|--------|
| GET | /api/presupuestos | Listar presupuestos |
| GET | /api/presupuestos/:id | Obtener presupuesto |
| POST | /api/presupuestos | Crear presupuesto |
| PUT | /api/presupuestos/:id | Actualizar presupuesto |
| DELETE | /api/presupuestos/:id | Eliminar presupuesto |

### Usuarios

| Método | Ruta | Acción |
|--------|------|--------|
| POST | /api/usuarios/registro | Registrar cliente |

## 7. Ejemplos de solicitudes JSON

### Crear material

POST /api/materiales

    {
      "nombre": "Guatambú",
      "categoria": "Maderas",
      "precioReferencia": 52000,
      "unidadCalculo": "m2"
    }

El precio es orientativo y se utiliza para las pruebas académicas.

### Actualizar material

PUT /api/materiales/:id

    {
      "precioReferencia": 55000
    }

### Registrar usuario

POST /api/usuarios/registro

    {
      "nombre": "Cliente",
      "apellido": "Prueba",
      "email": "cliente.prueba@example.com",
      "password": "Ejemplo123!"
    }

El registro asigna automáticamente el rol cliente y protege la contraseña con bcrypt.

### Crear presupuesto

POST /api/presupuestos

    {
      "usuarioId": "ID_USUARIO",
      "items": [
        {
          "tipoMueble": "Placard",
          "descripcion": "Placard a medida",
          "anchoCm": 200,
          "altoCm": 240,
          "profundidadCm": 60,
          "cantidad": 1,
          "materialId": "ID_MATERIAL"
        }
      ]
    }

Reemplazar ID_USUARIO e ID_MATERIAL por ObjectId existentes en MongoDB.

### Actualizar presupuesto

PUT /api/presupuestos/:id

    {
      "estado": "en_revision"
    }

## 8. Funcionalidades implementadas

- Conexión con MongoDB Atlas.
- CRUD completo de Materiales.
- CRUD completo de Presupuestos.
- Registro de usuarios.
- Contraseñas protegidas mediante bcrypt.
- Referencias entre colecciones mediante ObjectId.
- Consultas relacionadas mediante populate().
- Validaciones de esquemas con Mongoose.
- Manejo centralizado de errores y códigos HTTP.
- Configuración mediante variables de entorno.

Se probaron las operaciones CRUD, el registro de usuarios y las consultas relacionadas.

## 9. Funcionalidades futuras

- Inicio de sesión y autenticación mediante JWT.
- Protección de rutas según roles.
- Cálculo automático de presupuestos.
- Actualización de precios y ampliación del catálogo.
- Integración con el frontend React de Isasi Muebles.
- Validaciones y controles adicionales para producción.

## 10. Seguridad

Las credenciales reales se mantienen fuera del repositorio mediante `.gitignore`.

Se proporciona un archivo `.env.example` con valores de ejemplo.

La API es una implementación académica. Antes de utilizarla en producción deberán completarse la autenticación, la autorización y otros controles de seguridad.
