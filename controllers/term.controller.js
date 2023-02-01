const termModel = require("../models/term.model");
const ErrorResponse = require("../helpers/ErrorResponse");
module.exports = {
  getTerm: async (req, res, next) => {
    const query = req?.query?.title || "";
    try {
      let term = await termModel
        .find({ title: { $regex: `${query}`, $options: "i" } })
        .sort({ createdAt: -1 });
      return res.status(200).json(term);
    } catch (error) {
      console.log(error);
    }
  },
  getLastLestTerm: async (req, res, next) => {
    try {
      let term = await termModel.find().sort({ createdAt: -1 }).limit(12);
      return res.status(200).json(term);
    } catch (error) {
      console.log(error);
    }
  },
  getTermById: async (req, res, next) => {
    let id = req.params.id;
    let term = await termModel.findById(id).populate("courses");
    if (!term) {
      throw new ErrorResponse(404, "not found transport");
    }
    return res.status(200).json(term);
  },
  createTerm: async (req, res, next) => {
    let { ...body } = req.body;
    term = await termModel.create(body);
    return res.status(201).json(term);
  },
  updateTermById: async (req, res, next) => {
    let id = req.params.id;
    let { ...body } = req.body;
    let term = await termModel.findByIdAndUpdate(id, body, { new: true });
    if (!term) {
      throw new ErrorResponse(404, "Not found term");
    }
    return res.status(200).json(term);
  },
  deleteTermById: async (req, res, next) => {
    let id = req.params.id;
    let term = await termModel.findByIdAndDelete(id);
    return res.status(200).json(term);
  },
};
