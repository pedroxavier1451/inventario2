// Importar sqlite3
const sqlite3 = require('sqlite3').verbose();

// Crear una instancia de la base de datos SQLite
const db = new sqlite3.Database('./db/inventario.db', (err) => {
    if (err) {
        // Si ocurre un error al conectar a la base de datos, lo mostramos
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        // Si la conexión es exitosa, mostramos un mensaje
        console.log('Conectado a la base de datos SQLite');
    }
});

// Exportamos la instancia de db para usarla en otras partes del proyecto
module.exports = db;