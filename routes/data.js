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
      res.send(response.rows);
    }
  );
});

router.get('/facturado/:cr', function(req, res, next) {
  // client.query(
  //   `SELECT sum(total) as real, mes FROM presupuesto
  //   WHERE CAST(cr as VARCHAR) LIKE '${req.params.cr}%'
  //   GROUP BY mes
  //   ORDER BY mes;`,
  //   (error, response) => {
  //     res.send(response.rows);
  //   }
  // );
  res.send('facturado');
});

module.exports = router;
