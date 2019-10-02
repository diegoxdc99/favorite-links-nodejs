const mysql = require('mysql')
const { promisify } = require('util')
const { database } = require('./keys')

const sqlErrors = {
  PROTOCOL_CONNECTION_LOST: 'DATABASE CONNECTION WAS CLOSED',
  ER_CON_COUNT_ERROR: 'DATABASE HAS TO MANY CONNECTIONS',
  ECONNREFUSED: 'DATABASE CONNECTION WAS REFUSED',
  ERROR: 'ERROR WITH DATABASE'
}

// Tiene hilos que va haciendo una tarea a la vez en secuencia
const pool = mysql.createPool(database)
pool.getConnection((err, connection) => {
  if (err) console.log(sqlErrors[err.code || 'ERROR'])

  if (connection) connection.release()
  console.log('DB is Connected')
})

// PRomisify Pool Querys
pool.query = promisify(pool.query)

module.exports = pool
