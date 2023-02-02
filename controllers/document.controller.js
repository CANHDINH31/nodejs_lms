const courseModel = require("../models/course.model");
const documentModel = require("../models/document.model");
const ErrorResponse = require("../helpers/ErrorResponse");
module.exports = {
  addDocumentToCourse: async (req, res, next) => {
    const { idCourse, arrayDocument } = req.body;
    const course = await courseModel.findById(idCourse);
    const newArrayDocument = arrayDocument.filter(
      (i) => !course?.documents.includes(i)
    );

    let result = await courseModel.findByIdAndUpdate(
      { _id: idCourse },
      { $push: { documents: { $each: newArrayDocument } } }
    );
    return res.status(200).json(result);
  },
  createDocument: async (req, res, next) => {
    let { ...body } = req.body;
    document = await documentModel.create(body);
    return res.status(201).json(document);
  },
  getLastLestDocument: async (req, res, next) => {
    try {
      let document = await documentModel
        .find()
        .sort({ createdAt: -1 })
        .limit(40);
      return res.status(200).json(document);
    } catch (error) {
      console.log(error);
    }
  },
  getDocument: async (req, res, next) => {
    const query = req?.query?.title || "";
    try {
      let video = await documentModel
        .find({ title: { $regex: `${query}`, $options: "i" } })
        .sort({ createdAt: -1 });
      return res.status(200).json(video);
    } catch (error) {
      console.log(error);
    }
  },
  getDocumentById: async (req, res, next) => {
    let id = req.params.id;
    let document = await documentModel.findById(id);
    if (!document) {
      throw new ErrorResponse(404, "not found document");
    }
    return res.status(200).json(document);
  },
  updateDocumentById: async (req, res, next) => {
    let id = req.params.id;
    let { ...body } = req.body;
    let document = await documentModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!document) {
      throw new ErrorResponse(404, "Not found document");
    }
    return res.status(200).json(document);
  },
  removeDocumentFromCourse: async (req, res, next) => {
    const { idCourse, arrayDocument } = req.body;

    let result = await courseModel.updateOne(
      { _id: idCourse },
      {
        $pullAll: {
          documents: arrayDocument,
        },
      }
    );
    return res.status(200).json(result);
  },
  deleteDocument: async (req, res, next) => {
    const { arrayId } = req.body;

    let document = await documentModel.deleteMany({
      _id: {
        $in: arrayId,
      },
    });
    return res.status(200).json(document);
  },
};
