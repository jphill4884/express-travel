const express = require("express");
const wishlistRouter = require("./wishlistRouter.js");
const countries = require("./countries.js");

const app = express();
app.use(express.json());
app.use("/api/countries", wishlistRouter);

app.get("/api/countries", (req, res, next) => {
  //console.log(req);
  res.send(countries);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening to Port: ${port}`);
});

