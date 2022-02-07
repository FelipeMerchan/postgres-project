const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setUpModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Por detrás va a gestionar el pooling
const sequelize = new Sequelize(URI, {
  dialect: 'postgres', // Indica qué base de datos estamos utilizando
  logging: true, //En la consola cada vez que haga una consulta con el ORM veremos cuál sería la forma de hacer esa consulta, pero en SQL
});

setUpModels(sequelize);

/* Realiza una sincronización. Es decir, Sequelize va a tomar los modelos que hayamos configurado
y va a crear la estructura de la tabla con el schema que hayamos creado.
Esto es muy delicado y no se aconseja para producción porque necesitamos un sistema de migraciones
que nos indique en qué punto estaba para saber qué hay que modificar, cada vez que lancemos un release
no debemos estar creando tablas.
*/
/* sequelize.sync(); */

module.exports = sequelize;
