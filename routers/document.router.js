const express = require("express");
const router = express.Router();

const {
  createDocument,
  getLastLestDocument,
  deleteDocument,
  getDocument,
  getDocumentById,
  updateDocumentById,
  addDocumentToCourse,
  removeDocumentFromCourse,
} = require("../controllers/document.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router
  .route("/")
  .post(asyncMiddelware(createDocument))
  .get(asyncMiddelware(getDocument));

router.route("/deleteDocument").post(asyncMiddelware(deleteDocument));
router.route("/addDocumentToCourse").post(asyncMiddelware(addDocumentToCourse));
router.route("/lastlestdocument").get(asyncMiddelware(getLastLestDocument));
router
  .route("/removeDocumentFromCourse")
  .post(asyncMiddelware(removeDocumentFromCourse));

router
  .route("/:id")
  .patch(asyncMiddelware(updateDocumentById))
  .get(asyncMiddelware(getDocumentById));

module.exports = router;
