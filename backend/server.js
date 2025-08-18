require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routers/usuarioRouter');
const productoRouter = require('./routers/productoRouter');
const compraRouter = require('./routers/compraRouter');
const detalleCompraRouter = require('./routers/detalleCompraRouter');
const sequelize = require('./db/db');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(cors({
  origin: 'http://localhost:4200'  // O usa '*' para permitir todos
}));

console.log("JWT_SECRET =", process.env.JWT_SECRET); 

app.use(bodyParser.json());

// Usar las rutas de usuario
app.use('/usuario', userRouter);
app.use('/producto', productoRouter); 
app.use('/compra', compraRouter); 
app.use('/detalle-compra', detalleCompraRouter);

// Sincronizar DB y luego levantar servidor
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});