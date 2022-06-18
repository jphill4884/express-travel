const express = require("express");
<<<<<<< HEAD
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const countries = require("./countries.js");
=======
const wishlistRouter = require("./wishlistRouter.js");
const countries = require("./countries.js");

const app = express();
app.use(express.json());
app.use("/api/countries", wishlistRouter);
>>>>>>> 2712042dab4d9bfba04b65a0b922e8bb575182ee

app.get("/api/countries", (req, res, next) => {
  //console.log(req);
  res.send(countries);
});

<<<<<<< HEAD
app.get("/api/countries/:code", (req, res, next) => {
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

app.post("/api/countries", (req, res, next) => {
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

app.put("/api/countries/:name", (req, res, next) => {
  //console.log(req.params);
  const country = countries.find((country) => country.name === req.params.name);
  country.name = req.body.name || country.name;
  country.alpha2Code = req.body.alpha2Code || country.alpha2Code;
  country.alpha3Code = req.body.alpha3Code || country.alpha3Code;
  res.status(201).send(country);
});

app.delete("/api/countries/:name", (req, res, next) => {
    //console.log(req.params);
    const country = countries.find((country) => country.name === req.params.name);
    const countryIndex = countries.indexOf(country);
    countries.splice(countryIndex, 1);
    res.status(201).send(countries);
  });
=======
const port = process.env.PORT || 3000;
>>>>>>> 2712042dab4d9bfba04b65a0b922e8bb575182ee

app.listen(port, () => {
  console.log(`App is listening to Port: ${port}`);
});
<<<<<<< HEAD
=======

>>>>>>> 2712042dab4d9bfba04b65a0b922e8bb575182ee
