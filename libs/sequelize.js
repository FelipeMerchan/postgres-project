const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setUpModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Por detrás va a gestionar el pooling
const sequelize = new Sequelize(URI, {
  dialect: 'mysql', // Indica qué base de datos estamos utilizando
  logging: true, //En la consola cada vez que haga una consulta con el ORM veremos cuál sería la forma de hacer esa consulta, pero en SQL
});

setUpModels(sequelize);

/* Realiza una sincronización. Es decir, Sequelize va a tomar los modelos que hayamos configurado
y va a crear la estructura de la tabla con el schema que hayamos creado */
sequelize.sync();

module.exports = sequelize;
