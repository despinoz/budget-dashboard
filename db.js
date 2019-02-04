const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  database: process.env.REACT_APP_DB_DATABASE,
  password: process.env.REACT_APP_DB_PASSWORD,
  port: process.env.REACT_APP_DB_PORT
});

client.connect(err => {
  if (err) throw err.stack;
  console.log('Conected to PostgreSQL');
});

module.exports = {
  client
};

// client.query(
//   "SELECT sum(total) as real, mes FROM presupuesto WHERE CAST(cr as VARCHAR) LIKE '601%' GROUP BY mes",
//   (err, res) => {
//     console.log(res.rows);
//   }
// );
