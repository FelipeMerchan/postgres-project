const { Pool } = require('pg');

const { config } = require('./../config/config');

const options = {}

if (config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false /* Configuracion de Heroku */
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgress://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

/* Configuración de la conexión */
const pool = new Pool(options);

module.exports = pool;
