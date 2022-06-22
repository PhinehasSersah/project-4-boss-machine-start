const express = require("express");
const ideasRouter = express.Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db");

ideasRouter.use(checkMillionDollarIdea);

ideasRouter.param("ideasId", (req, res, next, id) => {
  const ideasId = getFromDatabaseById("ideas", id);
  if (ideasId) {
    req.ideasId = ideasId;
    next();
  } else {
    res.status(404).send("Not Found");
  }
});

ideasRouter
  .get("/", (req, res, _next) => {
    res.status(200).send(getAllFromDatabase("ideas"));
  })
  .post((req, res, _next) => {
    const data = req.body;
    addToDatabase("ideas", data);
    res.status(204).send();
  });

ideasRouter
  .get("/:ideas", (req, res, _next) => {
    res.status(200).send(req.ideasId);
  })
  .put((req, res, next) => {
    updateInstanceInDatabase("ideas", req.body);
    res.send(204).send(updateInstanceInDatabase("ideas", req.body));
  })
  .delete((req, res, next) => {
    const id = Number(req.params.id);
    const deleted = deleteFromDatabasebyId("ideas", id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(504);
    }
    res.send();
  });

module.exports = ideasRouter;
