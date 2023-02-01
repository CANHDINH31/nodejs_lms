const express = require("express");
const router = express.Router();

const {
  createTerm,
  getTerm,
  deleteTermById,
  getTermById,
  updateTermById,
  getLastLestTerm,
} = require("../controllers/term.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router
  .route("/")
  .post(asyncMiddelware(createTerm))
  .get(asyncMiddelware(getTerm));

router.route("/lastlestterm").get(asyncMiddelware(getLastLestTerm));

router
  .route("/:id")
  .patch(asyncMiddelware(updateTermById))
  .delete(asyncMiddelware(deleteTermById))
  .get(asyncMiddelware(getTermById));

module.exports = router;
