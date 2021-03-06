var express = require('express');
var router = express.Router();

const { client } = require('../db');

/* GET data listing. */
router.get('/presupuesto/:cr', function(req, res, next) {
  client.query(
    `SELECT sum(total) as real, mes FROM presupuesto
    WHERE CAST(cr as VARCHAR) LIKE '${req.params.cr}%'
    GROUP BY mes
    ORDER BY mes;`,
    (error, response) => {
      if (error) throw error;
      res.send(response.rows);
    }
  );
});

router.get('/facturado/:cr', function(req, res, next) {
  client.query(
    `SELECT SUM(monto) AS monto, EXTRACT(MONTH FROM fecha) as mes FROM facturas 
    WHERE CAST(CR as VARCHAR) LIKE '${req.params.cr}%' AND fecha IS NOT NULL
    GROUP BY mes
    ORDER BY mes;`,
    (error, response) => {
      if (error) throw error;
      res.send(response.rows);
    }
  );
});

router.get('/facturacion-por-cr', function(req, res, next) {
  client.query(
    `SELECT SUM(monto) AS total, cr FROM facturas
    GROUP BY cr
    ORDER BY total DESC;`,
    (error, response) => {
      if (error) throw error;
      res.send(response.rows);
    }
  );
  // res.send('facturacion-por-cr');
});

module.exports = router;
