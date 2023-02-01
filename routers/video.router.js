const express = require("express");
const router = express.Router();

const {
  createVideo,
  getLastLestVideo,
  getVideo,
  deleteVideo,
  addVideoToCourse,
  getVideoById,
  updateVideoById,
  removeVideoFromCourse,
} = require("../controllers/video.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router
  .route("/")
  .post(asyncMiddelware(createVideo))
  .get(asyncMiddelware(getVideo));

router.route("/deleteVideo").post(asyncMiddelware(deleteVideo));
router.route("/addVideoToCourse").post(asyncMiddelware(addVideoToCourse));
router.route("/lastlestvideo").get(asyncMiddelware(getLastLestVideo));
router
  .route("/removeVideoFromCourse")
  .post(asyncMiddelware(removeVideoFromCourse));

router
  .route("/:id")
  .patch(asyncMiddelware(updateVideoById))
  .get(asyncMiddelware(getVideoById));

module.exports = router;
