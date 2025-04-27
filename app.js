const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Importar rutas
const usuarioRoutes = require('./src/routes/usuario');

// Middleware para analizar JSON
app.use(express.json());

// Middleware que elimina la barra final de la URL
app.use((req, res, next) => {
    if (req.url.endsWith('/')) {
        req.url = req.url.slice(0, -1);
    }
    next();
});

// Rutas de usuarios
app.use('/usuario', usuarioRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Recurso no encontrado' });
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({ mensaje: "¡Bienvenido a la API de Usuarios!" });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
