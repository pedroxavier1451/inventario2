const verificarAdmin = (req, res, next) => {
  try {
    const user = req.user; // se asigna en verificarToken

    console.log('Rol del usuario en middleware:', user?.rol); 

    if (!user || user.rol !== 'admin') {
      return res.status(403).json({ message: 'Acceso prohibido: solo administradores' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = verificarAdmin;
