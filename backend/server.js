const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/usuarioRouter');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Usar las rutas de usuario
app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
