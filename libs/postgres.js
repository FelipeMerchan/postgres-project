const { Client } = require('pg');

/* Configuración de la conexión */
async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'felipe',
    password: 'admin123',
    database: 'my_store'
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
