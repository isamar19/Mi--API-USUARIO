const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Importar rutas
const usuarioRoutes = require('./routes/usuario');

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
const DEFAULT_PORT = process.env.PORT || 3002;

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
    console.log(`El puerto ${port} está en uso, intentando con el 3002...`);
    if (port !== 3002) {
        startServer(3002);
    } else {
        console.error('Ya el puerto 3002 también está en uso. Cerrando...');
        process.exit(1);
    }
    } else {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
    }
});
}

startServer(DEFAULT_PORT);
