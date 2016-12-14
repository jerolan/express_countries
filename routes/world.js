var express = require('express');
var mysql = require('mysql')
var router = express.Router();

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b8e500c9702fa7',
  password: '2c744d3f',
  database: 'heroku_688dc8f33b399ce'
});

function getCountries() {
  const query = `SELECT id, name FROM countries`
  let result = {}

  return new Promise((resolve, reject) => {
    connection.query(query, function(err, rows, fields) {
      if (err) reject(err);

      rows.forEach(a => {
        result[a.id] = a.name
      })

      resolve({
        status: 'success',
        tp: 1,
        msg: 'Countries fetched successfully.',
        result
      })
    });
  })
}

function getStates(countryId) {
  const query = `SELECT id, name FROM states WHERE country_id=${countryId}`
   let result = {}

  return new Promise((resolve, reject) => {
    connection.query(query, function(err, rows, fields) {
      if (err) reject(err);

      rows.forEach(a => {
        result[a.id] = a.name
      })

      resolve({
        status: 'success',
        tp: 1,
        msg: 'Countries fetched successfully.',
        result
      })
    });
  })
}

function getCities(stateId) {
  const query = `SELECT id, name FROM cities WHERE state_id=${stateId}`
   let result = {}

  return new Promise((resolve, reject) => {
    connection.query(query, function(err, rows, fields) {
      if (err) reject(err);

      rows.forEach(a => {
        result[a.id] = a.name
      })

      resolve({
        status: 'success',
        tp: 1,
        msg: 'Countries fetched successfully.',
        result
      })
    });
  })
}

router.get('/', function(req, res, next) {
  if (!req.query) {
    res.status(403).json({error: true, message: 'empty type'});
  }

  const type = req.query.type

  if (type === 'getCountries') {
    getCountries()
      .then(countries => {
        res.json(countries);
      })
  }

  if (type === 'getStates' && req.query.countryId) {
    getStates(req.query.countryId)
      .then(states => {
        res.json(states);
      })
  } else if (type === 'getStates' && !req.query.countryId) {
    res.status(403).json({status: 'error', message: 'no countryId'});
  }

  if (type === 'getCities' && req.query.stateId) {
    getCities(req.query.stateId)
      .then(city => {
        res.json(city);
      })
  } else if (type === 'getCities' && !req.query.stateId) {
    res.status(403).json({status: 'error', message: 'no stateId'});
  }
});

module.exports = router;
