const express = require("express");
const wishlistRouter = express.Router();
const countries = require("./countries.js");


wishlistRouter.get("/", (req, res, next) => {
  //console.log(req);
  res.send(countries);
});

wishlistRouter.get("/:code", (req, res, next) => {
  const countryCode = req.params;
  const lengthTest = countryCode.code.length;
  let country = {};
  if (lengthTest === 2) {
    country = countries.find(
      (country) => country.alpha2Code === req.params.code
    );
  } else if (lengthTest === 3) {
    country = countries.find(
      (country) => country.alpha3Code === req.params.code
    );
  }
  res.send(country);
});

wishlistRouter.post("/", (req, res, next) => {
  //console.log(req);
  const newCountry = {
    id: countries.length + 1,
    name: req.body.name,
    alpha2Code: req.body.alpha2Code,
    alpha3Code: req.body.alpha3Code,
  };

  countries.push(newCountry);
  res.status(201).send(countries);
});

wishlistRouter.put("/:name", (req, res, next) => {
  //console.log(req.params);
  const country = countries.find((country) => country.name === req.params.name);
  country.name = req.body.name || country.name;
  country.alpha2Code = req.body.alpha2Code || country.alpha2Code;
  country.alpha3Code = req.body.alpha3Code || country.alpha3Code;
  res.status(201).send(country);
});

wishlistRouter.delete("/:name", (req, res, next) => {
  //console.log(req.params);
  const country = countries.find((country) => country.name === req.params.name);
  const countryIndex = countries.indexOf(country);
  countries.splice(countryIndex, 1);
  res.status(201).send(countries);
});

module.exports = wishlistRouter;
