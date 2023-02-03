const socialModel = require("../models/social.model");
const ErrorResponse = require("../helpers/ErrorResponse");
module.exports = {
  createSocial: async (req, res, next) => {
    let { ...body } = req.body;
    const social = await socialModel.create(body);
    return res.status(201).json(social);
  },
  getSocial: async (req, res, next) => {
    const query = req?.query?.title || "";
    try {
      let social = await socialModel
        .find({ title: { $regex: `${query}`, $options: "i" } })
        .sort({ createdAt: -1 });
      return res.status(200).json(social);
    } catch (error) {
      console.log(error);
    }
  },
  getLastLestSocial: async (req, res, next) => {
    try {
      let social = await socialModel.find().sort({ createdAt: -1 }).limit(40);
      return res.status(200).json(social);
    } catch (error) {
      console.log(error);
    }
  },
  getSocialById: async (req, res, next) => {
    let id = req.params.id;
    let social = await socialModel.findById(id);
    if (!social) {
      throw new ErrorResponse(404, "not found social");
    }
    return res.status(200).json(social);
  },
  updateSocialById: async (req, res, next) => {
    let id = req.params.id;
    let { ...body } = req.body;
    let social = await socialModel.findByIdAndUpdate(id, body, { new: true });
    if (!social) {
      throw new ErrorResponse(404, "Not found social");
    }
    return res.status(200).json(social);
  },
  deleteSocial: async (req, res, next) => {
    const { arrayId } = req.body;

    let social = await socialModel.deleteMany({
      _id: {
        $in: arrayId,
      },
    });
    return res.status(200).json(social);
  },
};
