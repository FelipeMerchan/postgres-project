const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setUpModels = require('./../db/models');

const options = {
  dialect: 'postgres', // Indica qué base de datos estamos utilizando
  logging: config.idProd ? false : true, //En la consola cada vez que haga una consulta con el ORM veremos cuál sería la forma de hacer esa consulta, pero en SQL
}

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false /* Configuracion de Heroku */
  }
}

// Por detrás va a gestionar el pooling
const sequelize = new Sequelize(config.dbUrl, options);

setUpModels(sequelize);

/* Realiza una sincronización. Es decir, Sequelize va a tomar los modelos que hayamos configurado
y va a crear la estructura de la tabla con el schema que hayamos creado.
Esto es muy delicado y no se aconseja para producción porque necesitamos un sistema de migraciones
que nos indique en qué punto estaba para saber qué hay que modificar, cada vez que lancemos un release
no debemos estar creando tablas.
*/
/* sequelize.sync(); */

module.exports = sequelize;
