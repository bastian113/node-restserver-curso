// ================================
// Puerto
// ================================
process.env.PORT = process.env.PORT || 3000;


// ================================
// Entorno
// ================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ================================
// Vencimiento del Token
// ================================
// seg * min * horas * días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ================================
// SEED de autenticación
// ================================
// Se declarará una vble de entorno en Heroku llamada SEED con una semilla compleja
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// ================================
// Base de datos
// ================================
let urlDB;

/*
 * Se hace de esta forma para evitar que se suba al repositorio y sea visible,
 * los verdaderos datos se encuentran configurados en una variable de entorno de Heroku
 */
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/*
 * vbles de entorno Heroku
 * heroku config -> Listar mis variables de entorno
 * heroku config:set nombre_vble = valor_vble
 * heroku config:unset nombre_vble
 */

// ================================
// Google Client ID
// ================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '332630524776-v6rktf89qhh28t49o664qvt1ki072eh3.apps.googleusercontent.com';