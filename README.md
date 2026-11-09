
# Isasi Muebles | Backend API REST

## 1. Descripción del proyecto

Trabajo Práctico Final del curso Backend Developer de UTN.

API REST desarrollada con Node.js, Express y MongoDB para gestionar solicitudes de presupuestos de muebles a medida de Isasi Muebles.

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

Campos principales:

- nombre
- apellido
- email
- telefono
- passwordHash
- rol
- activo
- fechaRegistro

Las contraseñas se protegen con bcrypt mediante un pre-save hook de Mongoose.

### Materiales

Campos principales:

- nombre
- categoria
- precioReferencia
- unidadCalculo
- activo
- fechaActualizacion

### Presupuestos

Campos principales:

- usuarioId
- items
- subtotal
- porcentajeDescuento
- montoDescuento
- total
- estado
- fechaCreacion
- fechaVencimiento

Cada presupuesto contiene ítems embebidos con información sobre los muebles solicitados.

Los ítems incluyen tipo de mueble, descripción, medidas, cantidad, material, precios, observaciones y adjuntos.

### Relaciones entre colecciones

- Usuarios y Presupuestos: relación directa 1:N.
- Presupuestos e Ítems: documentos embebidos.
- Ítems y Materiales: referencia mediante ObjectId.

Se utiliza populate() para consultar los datos relacionados de Usuarios y Materiales.

## 4. Arquitectura del proyecto

```text
isasi-backend-final/
├── index.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── userModel.js
    │   ├── materialModel.js
    │   └── presupuestoModel.js
    ├── services/
    │   ├── userService.js
    │   ├── materialService.js
    │   └── presupuestoService.js
    ├── controllers/
    │   ├── userController.js
    │   ├── materialController.js
    │   └── presupuestoController.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── materialRoutes.js
    │   └── presupuestoRoutes.js
    └── middleware/
        └── errorHandler.js
```

### Separación de responsabilidades

- Models: definen los esquemas de MongoDB.
- Services: contienen la lógica de negocio y las consultas a la base de datos.
- Controllers: reciben solicitudes HTTP y devuelven respuestas.
- Routes: vinculan las direcciones de la API con sus controladores.
- Middleware: centraliza el manejo de errores.
- Config: establece la conexión con MongoDB.

## 5. Instalación y ejecución

### Requisitos

- Node.js
- npm
- Una base de datos MongoDB Atlas

### Instalar dependencias

```bash
npm install
```

### Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
MONGO_URI=mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/isasi_backend
```

Reemplazar los valores de ejemplo por las credenciales correspondientes.

El archivo `.env` real no debe publicarse.

### Iniciar el servidor

```bash
node index.js
```

Dirección local:

http://localhost:4000

## 6. Endpoints de la API

### Materiales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/materiales | Listar materiales |
| GET | /api/materiales/:id | Consultar un material |
| POST | /api/materiales | Crear un material |
| PUT | /api/materiales/:id | Actualizar un material |
| DELETE | /api/materiales/:id | Eliminar un material |

### Presupuestos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/presupuestos | Listar presupuestos |
| GET | /api/presupuestos/:id | Consultar un presupuesto |
| POST | /api/presupuestos | Crear un presupuesto |
| PUT | /api/presupuestos/:id | Actualizar un presupuesto |
| DELETE | /api/presupuestos/:id | Eliminar un presupuesto |

### Usuarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/usuarios/registro | Registrar un cliente |

El inicio de sesión con JWT no está implementado. Se contempla como funcionalidad futura.

## 7. Ejemplos de solicitudes

Todos los ejemplos utilizan la dirección:

http://localhost:4000

Los identificadores indicados como `ID_MATERIAL`, `ID_USUARIO` e `ID_PRESUPUESTO` deben reemplazarse por ObjectId existentes.

### 7.1. Listar materiales

**GET /api/materiales**

No requiere cuerpo JSON.

### 7.2. Consultar un material

**GET /api/materiales/ID_MATERIAL**

No requiere cuerpo JSON.

### 7.3. Crear un material

**POST /api/materiales**

```json
{
  "nombre": "Guatambú",
  "categoria": "Maderas",
  "precioReferencia": 52000,
  "unidadCalculo": "m2"
}
```

El precio es provisional y se utiliza con fines académicos.

### 7.4. Actualizar un material

**PUT /api/materiales/ID_MATERIAL**

```json
{
  "precioReferencia": 55000
}
```

### 7.5. Eliminar un material

**DELETE /api/materiales/ID_MATERIAL**

No requiere cuerpo JSON.

Un material utilizado en presupuestos no puede eliminarse.

### 7.6. Registrar un usuario

**POST /api/usuarios/registro**

```json
{
  "nombre": "Cliente",
  "apellido": "Prueba",
  "email": "cliente.prueba@example.com",
  "password": "Ejemplo123!"
}
```

El sistema asigna automáticamente el rol `cliente`.

La contraseña se almacena protegida mediante bcrypt.

### 7.7. Listar presupuestos

**GET /api/presupuestos**

No requiere cuerpo JSON.

La respuesta incluye los datos relacionados de Usuarios y Materiales mediante populate().

### 7.8. Consultar un presupuesto

**GET /api/presupuestos/ID_PRESUPUESTO**

No requiere cuerpo JSON.

### 7.9. Crear un presupuesto

**POST /api/presupuestos**

```json
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
```

El usuario y el material deben existir previamente en MongoDB.

El presupuesto comienza con estado `solicitado`.

Los importes pendientes se almacenan como null.

### 7.10. Actualizar un presupuesto

**PUT /api/presupuestos/ID_PRESUPUESTO**

```json
{
  "estado": "en_revision"
}
```

### 7.11. Eliminar un presupuesto

**DELETE /api/presupuestos/ID_PRESUPUESTO**

No requiere cuerpo JSON.

## 8. Respuestas HTTP y errores

La API utiliza los siguientes códigos:

- 200: operación exitosa.
- 201: recurso creado.
- 400: datos incorrectos.
- 404: recurso no encontrado.
- 409: conflicto con una regla de negocio.
- 500: error interno del servidor.

Ejemplo de error:

```json
{
  "error": "El identificador no tiene un formato válido"
}
```

Los errores se gestionan mediante un middleware centralizado.

## 9. Pruebas realizadas

Se verificaron las siguientes operaciones contra MongoDB Atlas:

- Conexión del servidor a la base de datos.
- Creación de materiales mediante POST.
- Consulta de materiales mediante GET.
- Actualización de materiales mediante PUT.
- Eliminación de materiales mediante DELETE.
- Registro de un usuario ficticio.
- Verificación de contraseña mediante bcrypt.compare().
- Creación de un presupuesto relacionado con un usuario y un material.
- Consulta de referencias mediante populate().
- Actualización del estado de un presupuesto.
- Eliminación de un presupuesto de prueba.
- Manejo de errores para identificadores inválidos.

## 10. Funcionalidades implementadas

- API REST con Express.
- Base de datos MongoDB Atlas.
- Modelos definidos con Mongoose.
- CRUD completo de Materiales.
- CRUD completo de Presupuestos.
- Registro de usuarios.
- Contraseñas protegidas con bcrypt.
- Relaciones mediante ObjectId.
- Consultas relacionadas mediante populate().
- Validaciones de esquemas.
- Separación de responsabilidades mediante servicios.
- Manejo centralizado de errores.
- Variables de entorno y CORS.

## 11. Funcionalidades futuras

- Inicio de sesión con JWT.
- Protección de rutas mediante autenticación.
- Autorización según roles de cliente y administrador.
- Cálculo automático de presupuestos.
- Gestión de descuentos y precios comerciales.
- Ampliación del catálogo de materiales.
- Integración con el frontend React de Isasi Muebles.
- Controles adicionales para uso en producción.

## 12. Seguridad y configuración

Las credenciales reales de MongoDB se mantienen fuera del repositorio mediante `.gitignore`.

El archivo `.env.example` contiene valores de ejemplo para configurar el proyecto.

La API corresponde a una implementación académica. No se considera preparada para producción, ya que todavía no implementa autenticación ni autorización de acceso a los presupuestos.
