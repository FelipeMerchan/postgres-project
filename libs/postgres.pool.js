const { Pool } = require('pg');

/* Configuración de la conexión */
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'felipe',
  password: 'admin123',
  database: 'my_store'
});

module.exports = pool;
