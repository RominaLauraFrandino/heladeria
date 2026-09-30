// ============================================================
// Servidor principal - Heladería El Iglú
// Clase 13: API para el front por componentes
//
// EL ORDEN DE LOS MIDDLEWARES ES LA CLASE DE HOY:
//   1. cors / json / logger        (antes de las rutas)
//   2. las rutas de la API
//   3. rutaNoEncontrada            (si ninguna ruta atendió)
//   4. manejadorErrores            (SIEMPRE al final de todo)
// ============================================================
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const logger = require("./middlewares/logger");
const { manejadorErrores, rutaNoEncontrada } = require("./middlewares/errores");
const pedidosRoutes = require("./routes/pedidos.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("API Heladería El Iglú funcionando");
});

app.use("/api", pedidosRoutes);

// Ninguna ruta atendió la petición -> 404 prolijo en JSON
app.use(rutaNoEncontrada);

// El manejador de errores SIEMPRE se monta último
app.use(manejadorErrores);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log("Logs en: back/logs/acceso.log y back/logs/errores.log");
});
