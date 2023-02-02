const courseModel = require("../models/course.model");
const termModel = require("../models/term.model");
const ErrorResponse = require("../helpers/ErrorResponse");
module.exports = {
  addCourseToTerm: async (req, res, next) => {
    const { idTerm, arrayCourse } = req.body;

    const term = await termModel.findById(idTerm);
    const newArrayCourse = arrayCourse.filter(
      (i) => !term?.courses.includes(i)
    );

    let result = await termModel.findByIdAndUpdate(
      { _id: idTerm },
      { $push: { courses: { $each: newArrayCourse } } }
    );
    return res.status(200).json(result);
  },
  removeCourseFromTerm: async (req, res, next) => {
    const { idTerm, arrayCourse } = req.body;

    let result = await termModel.updateOne(
      { _id: idTerm },
      {
        $pullAll: {
          courses: arrayCourse,
        },
      }
    );
    return res.status(200).json(result);
  },
  updateCourseById: async (req, res, next) => {
    let id = req.params.id;
    let { ...body } = req.body;
    let course = await courseModel.findByIdAndUpdate(id, body, { new: true });
    if (!course) {
      throw new ErrorResponse(404, "Not found course");
    }
    return res.status(200).json(course);
  },
  createCourse: async (req, res, next) => {
    let { ...body } = req.body;
    term = await courseModel.create(body);
    return res.status(201).json(term);
  },

  getCourse: async (req, res, next) => {
    const query = req?.query?.title || "";
    try {
      let course = await courseModel
        .find({ title: { $regex: `${query}`, $options: "i" } })
        .sort({ createdAt: -1 });
      return res.status(200).json(course);
    } catch (error) {
      console.log(error);
    }
  },
  getLastLestCourse: async (req, res, next) => {
    try {
      let course = await courseModel.find().sort({ createdAt: -1 }).limit(20);
      return res.status(200).json(course);
    } catch (error) {
      console.log(error);
    }
  },
  getCourseById: async (req, res, next) => {
    let id = req.params.id;
    let course = await courseModel
      .findById(id)
      .populate("videos")
      .populate("documents");
    if (!course) {
      throw new ErrorResponse(404, "not found course");
    }
    return res.status(200).json(course);
  },
  deleteCourseById: async (req, res, next) => {
    let id = req.params.id;
    let course = await courseModel.findByIdAndDelete(id);
    return res.status(200).json(course);
  },
  deleteMultiCourseById: async (req, res, next) => {
    const { arrayId } = req.body;

    let course = await courseModel.deleteMany({
      _id: {
        $in: arrayId,
      },
    });
    return res.status(200).json(course);
  },
};
