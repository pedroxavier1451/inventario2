const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routers/usuarioRouter');
const sequelize = require('./db/db');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(cors({
  origin: 'http://localhost:4200'  // O usa '*' para permitir todos
}));

app.use(bodyParser.json());

// Usar las rutas de usuario
app.use('/api', userRouter);

// Sincronizar DB y luego levantar servidor
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});