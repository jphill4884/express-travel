const express = require("express");
const wishlistRouter = express.Router();
const countries = require("./countries.js");


wishlistRouter.get("/", (req, res, next) => {
    const visited = req.query.visited === "true" ? true : false;
    const filteredCountries = countries.filter(country => country.visited === visited);
    console.log(filteredCountries);
    let list = countries;
    if (!filteredCountries) {
       list = countries;
    } else {
       list = filteredCountries;
    }
    if (req.query.sort === "true") {
    res.send(
      list.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      })
    );
  } else {
    res.send(list);
  }
});

wishlistRouter.get("/:code", (req, res, next) => {
  const countryCode = req.params.code;
  const country = countries.find(
      (country) => country.alpha2Code === countryCode || country.alpha3Code === countryCode
    );
  if (country) {
    res.send(country);
  } else {
    res.status(404).send('Country not found, please check your spelling and search again.')
  }
});

wishlistRouter.post("/", (req, res, next) => {
  const check = countries.find(
    (country) =>
      country.alpha2Code === req.body.alpha2Code ||
      country.alpha3Code === req.body.alpha3Code
  );
  if (!check) {
    const newCountry = {
      id: countries.length + 1,
      name: req.body.name,
      alpha2Code: req.body.alpha2Code,
      alpha3Code: req.body.alpha3Code,
    };

    countries.push(newCountry);
    res.status(201).send(countries);
  } else {
    res.status(400).send("This country already exists in your list.");
  }
});

wishlistRouter.put("/:name", (req, res, next) => {
  const country = countries.find((country) => country.name === req.params.name);
  if (country) {
  country.name = req.body.name || country.name;
  country.alpha2Code = req.body.alpha2Code || country.alpha2Code;
  country.alpha3Code = req.body.alpha3Code || country.alpha3Code;
  res.status(201).send(country);
  } else {
    res.status(404).send('Country not found, please check your spelling and search again.')
  }

});

wishlistRouter.delete("/:name", (req, res, next) => {
  //console.log(req.params);
  const country = countries.find((country) => country.name === req.params.name);
  //const countryIndex = countries.indexOf(country);
  //countries.splice(countryIndex, 1);
  //console.log(country.visited)
  if (country.visited) {
    country.visited = false;
  } else if (!country.visited) {
    country.visited = true;
  }
  res.status(201).send(countries);
});

module.exports = wishlistRouter;
