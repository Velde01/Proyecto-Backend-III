const checkRole = (roles) => {
    return (req, res, next) => {
        // 1. Verificamos si Passport dejó al usuario en la request
        if (!req.user) {
            return res.status(401).json({ status: 'error', message: 'No estás autenticado' });
        }
        
        // 2. Verificamos si el rol del usuario está dentro de los permitidos
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 'error', message: 'No tienes permisos para realizar esta acción' });
        }
        
        // 3. Si todo está bien, lo dejamos seguir a la ruta
        next();
    };
};

module.exports = { checkRole };