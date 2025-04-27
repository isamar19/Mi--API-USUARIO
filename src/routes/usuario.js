// Importamos express
const express = require('express');
const router = express.Router();

// Simulamos una base de datos con un array
const usuarios = [
    { id: 1, nombre: 'Juan', email: 'juan@ejemplo.com' },
    { id: 2, nombre: 'Maria', email: 'maria@ejemplo.com' }
];

// Middleware para verificar si un usuario existe
function verificarUsuario(req, res, next) {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    req.usuario = usuario; // Guardar el usuario encontrado en la solicitud
    next();
}

// Obtener todos los usuarios
router.get('/', (req, res) => {
    res.json(usuarios);
});

// Obtener un usuario por su ID
router.get('/:id', verificarUsuario, (req, res) => {
    res.json(req.usuario);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { nombre, email } = req.body;

    // Validación de datos
    if (!nombre || !email) {
        return res.status(400).json({ mensaje: 'El nombre y el email son obligatorios' });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        email
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
});

// Actualizar un usuario
router.put('/:id', verificarUsuario, (req, res) => {
    const { nombre, email } = req.body;

    // Actualizar solo los campos proporcionados
    req.usuario.nombre = nombre || req.usuario.nombre;
    req.usuario.email = email || req.usuario.email;

    res.json({ mensaje: 'Usuario actualizado', usuario: req.usuario });
});

// Eliminar un usuario
router.delete('/:id', verificarUsuario, (req, res) => {
    const index = usuarios.findIndex(u => u.id === req.usuario.id);
    usuarios.splice(index, 1);
    res.json({ mensaje: 'Usuario eliminado' });
});

module.exports = router;

