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
        // Crear la tabla users si no existe
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error al crear la tabla users:', err.message);
            } else {
                console.log('Tabla users lista');
            }
        });
    }
});

// Exportamos la instancia de db para usarla en otras partes del proyecto
module.exports = db;