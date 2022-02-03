const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Por detrás va a gestionar el pooling
const sequelize = new Sequelize(URI, {
  dialect: 'postgres', // Indica qué base de datos estamos utilizando
  logging: true, //En la consola cada vez que haga una consulta con el ORM veremos cuál sería la forma de hacer esa consulta, pero en SQL
});

module.exports = sequelize;
