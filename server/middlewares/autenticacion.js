const jwt = require('jsonwebtoken');

// ================================
// Verificar Token
// ================================
let verificaToken = (req, res, next) => {

    let token = req.get('token'); // De esta manera puedo acceder al header con nombre "token"

    console.log(token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario; // Como en el payload sabemos que viene un objeto usuario, lo podemos tomar así

        // Si no llamo este "next" la ejecución se quedará detenida en este lugar.
        next();

    });

};


// ================================
// Verificar AdminRole
// ================================
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }


};


module.exports = {
    verificaToken,
    verificaAdminRole
}