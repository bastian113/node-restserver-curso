const express = require('express');
const { modelName } = require('../models/usuario');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));



module.exports = app;