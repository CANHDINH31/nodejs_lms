const express = require("express");
const router = express.Router();

const {
  createSocial,
  getSocial,
  getLastLestSocial,
  deleteSocial,
  getSocialById,
  updateSocialById,
} = require("../controllers/social.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router
  .route("/")
  .post(asyncMiddelware(createSocial))
  .get(asyncMiddelware(getSocial));

router.route("/deleteSocial").post(asyncMiddelware(deleteSocial));
router.route("/lastlestsocial").get(asyncMiddelware(getLastLestSocial));

router
  .route("/:id")
  .patch(asyncMiddelware(updateSocialById))
  .get(asyncMiddelware(getSocialById));

module.exports = router;
