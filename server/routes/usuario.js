const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion'); // Destructuración de objetos

app.get('/usuario', verificaToken, (req, res) => { // verificaToken actúa como un middleware

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // De esta forma filtro por el estado
    Usuario.find({ estado: true }, 'nombre email role estado google img') // De esta forma retorno únicamente estos campos
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // De esta forma filtro por el estado
            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });

        });

});

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // Encripta el pass para ser guardado en BD con 10 vueltas
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        /* usuarioDB.password = null; Para no devolver el pass al front, 
         * esto se hizo de mejor forma en el schema Usuario
         */


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //Sólo actualiza estos campos


    //El body enviado es lo que quiero actualizar
    //El new me retorna el usuario nuevo, no el antiguo
    //El runValidators indica si se activan las validacioens definidas en el modelo
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});


app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { Para eliminar físicamente
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;