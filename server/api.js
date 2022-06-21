const express = require("express");
const apiRouter = express.Router();
const database = require("./db.js");

apiRouter.get("/minions", (_req, res, next) => {
  res.status(200).send(database.allMinions);
  next();
});

module.exports = apiRouter;