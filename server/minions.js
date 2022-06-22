const express = require("express");
const { restart } = require("nodemon");
const minionRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

minionRouter.param("minionId", (res, req, next, id) => {
  const minionId = getFromDatabaseById("minions", id);
  if (minionId) {
    req.minionId = minionId;
    next();
  } else {
    res.status(404).send("minion not found");
  }
});

minionRouter
  .get("/", (_req, res, _next) => {
    res.status(200).send(getAllFromDatabase("minions"));
  })
  .post((req, res, _next) => {
    const data = req.body;
    addToDatabase("minions", data);
    res.status(201).send(addToDatabase("minions", data));
  });

minionRouter
  .get("/:minions", (req, res, _next) => {
    res.status(200).send(req.minionId);
  })
  .put((req, res, _next) => {
    updateInstanceInDatabase("minions", req.body);
    res.status(200).send(updateInstanceInDatabase("minions", req.body));
  })
  .delete((req, res, _next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.id);
    if(deleted) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send();
  });

module.exports = minionRouter;
