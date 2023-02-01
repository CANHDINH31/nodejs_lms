const express = require("express");
const router = express.Router();

const {
  createCourse,
  getLastLestCourse,
  deleteCourseById,
  deleteMultiCourseById,
  getCourse,
  addCourseToTerm,
  removeCourseFromTerm,
  getCourseById,
  updateCourseById,
} = require("../controllers/course.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router
  .route("/")
  .post(asyncMiddelware(createCourse))
  .get(asyncMiddelware(getCourse));

router.route("/lastlestcourse").get(asyncMiddelware(getLastLestCourse));
router.route("/deleteMulti").post(asyncMiddelware(deleteMultiCourseById));
router.route("/addCourseToTerm").post(asyncMiddelware(addCourseToTerm));
router
  .route("/removeCourseFromTerm")
  .post(asyncMiddelware(removeCourseFromTerm));

router
  .route("/:id")
  .delete(asyncMiddelware(deleteCourseById))
  .get(asyncMiddelware(getCourseById))
  .patch(asyncMiddelware(updateCourseById));

module.exports = router;
