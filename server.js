
const express = require("express");
const path = require("path");
const studentRoutes = require("./src/routes/studentRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Rutas de estudiantes
app.use("/api/students", studentRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
