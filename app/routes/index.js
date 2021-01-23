const express = require('express');
const router = express.Router();
const axios = require('axios')

/* GET home page. */

/**
 * @description /, get Covid data
 * @param {*} rute
 * @param {function()} cb
 */
router.get('/', function (req, res, next) {
  axios.get('https://api.covid19api.com/summary')
    .then(function (response) {
      function compare(a, b) { //devuelve el más casos
        if (b.TotalConfirmed < a.TotalConfirmed) //si pones antes a que b, te devuelve el que menos casos.
          return -1;
        else
          return 1;
      }

      response.data.Countries.sort(compare);
      var countries = response.data.Countries.map(function (country) {
        return {
          Country: country.Country,
          CountryCode: country.CountryCode,
          Slug: country.Slug,
          NewConfirmed: country.NewConfirmed,
          TotalConfirmed: country.TotalConfirmed,
          NewDeaths: country.NewDeaths,
          TotalDeaths: country.TotalDeaths,
          NewRecovered: country.NewRecovered,
          TotalRecovered: country.TotalRecovered,
          Date: country.Date,
          Flag: `https://flagcdn.com/w20/${country.CountryCode.toLowerCase()}.png`
        }
      });
      res.render('index', { world: response.data.Global, countries: countries });
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * @description /filter, get Covid data by filter
 * @param {*} rute
 * @param {function()} cb
 */
router.get('/filter', function (req, res, next) {
  axios.get('https://api.covid19api.com/summary')
    .then(function (response) {
      function compare(a, b) { 
        if (req.query.value == "recoveries") { //devuelve el más recoveries
          if (b.TotalRecovered < a.TotalRecovered) //si pones antes a que b, te devuelve el que menos casos.
            return -1;
          else
            return 1;
        }
        if (req.query.value == "deaths") { //devuelve el más deaths
          if (b.TotalDeaths < a.TotalDeaths) //si pones antes a que b, te devuelve el que menos casos.
            return -1;
          else
            return 1;
        }
        else { //devuelve el más casos
          if (b.TotalConfirmed < a.TotalConfirmed) //si pones antes a que b, te devuelve el que menos casos.
            return -1;
          else
            return 1;
        }
      }

      response.data.Countries.sort(compare);
      var countries = response.data.Countries.map(function (country) {
        return {
          Country: country.Country,
          CountryCode: country.CountryCode,
          Slug: country.Slug,
          NewConfirmed: country.NewConfirmed,
          TotalConfirmed: country.TotalConfirmed,
          NewDeaths: country.NewDeaths,
          TotalDeaths: country.TotalDeaths,
          NewRecovered: country.NewRecovered,
          TotalRecovered: country.TotalRecovered,
          Date: country.Date,
          Flag: `https://flagcdn.com/w20/${country.CountryCode.toLowerCase()}.png`
        }
      });
      res.send(countries);
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * @description /filter, get Covid data by filter
 * @param {*} rute
 * @param {function()} cb
 */
router.get('/xd', function (req, res, next) {
  axios.get('https://api.covid19api.com/summary')
    .then(function (response) {
      function compare(a, b) { //devuelve el más casos
        if (b.TotalConfirmed < a.TotalConfirmed) //si pones antes a que b, te devuelve el que menos casos.
          return -1;
        else
          return 1;
      }

      response.data.Countries.sort(compare);
      var countries = response.data.Countries.map(function (country) {
        return {
          Country: country.Country,
          CountryCode: country.CountryCode,
          Slug: country.Slug,
          NewConfirmed: country.NewConfirmed,
          TotalConfirmed: country.TotalConfirmed,
          NewDeaths: country.NewDeaths,
          TotalDeaths: country.TotalDeaths,
          NewRecovered: country.NewRecovered,
          TotalRecovered: country.TotalRecovered,
          Date: country.Date,
          Flag: `https://flagcdn.com/w20/${country.CountryCode.toLowerCase()}.png`
        }
      });
      res.send(countries);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
