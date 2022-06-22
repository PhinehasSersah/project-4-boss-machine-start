const express = require("express");
const meetingRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  deleteFromDatabasebyId,
} = require("./db");

meetingRouter
  .get("/", (req, res, next) => {
    res.status(200).send(getAllFromDatabase("meetings"));
  })
  .post((req, res, next) => {
    let meeting = createMeeting();
    if (meeting) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  })
  .delete((req, res, next) => {
    let id = Number(req.params.id);
    const deleted = deleteFromDatabasebyId("meetings", id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });

module.exports = meetingRouter;
