const videoModel = require("../models/video.model");
const courseModel = require("../models/course.model");
const ErrorResponse = require("../helpers/ErrorResponse");
module.exports = {
  addVideoToCourse: async (req, res, next) => {
    const { idCourse, arrayVideo } = req.body;
    // console.log(req.body);
    const course = await courseModel.findById(idCourse);
    const newArrayVideo = arrayVideo.filter((i) => !course?.videos.includes(i));

    let result = await courseModel.findByIdAndUpdate(
      { _id: idCourse },
      { $push: { videos: { $each: newArrayVideo } } }
    );
    return res.status(200).json(result);
  },
  createVideo: async (req, res, next) => {
    let { ...body } = req.body;
    term = await videoModel.create(body);
    return res.status(201).json(term);
  },
  getLastLestVideo: async (req, res, next) => {
    try {
      let course = await videoModel.find().sort({ createdAt: -1 }).limit(40);
      return res.status(200).json(course);
    } catch (error) {
      console.log(error);
    }
  },
  getVideo: async (req, res, next) => {
    const query = req?.query?.title || "";
    try {
      let video = await videoModel
        .find({ title: { $regex: `${query}`, $options: "i" } })
        .sort({ createdAt: -1 });
      return res.status(200).json(video);
    } catch (error) {
      console.log(error);
    }
  },
  getVideoById: async (req, res, next) => {
    let id = req.params.id;
    let video = await videoModel.findById(id);
    if (!video) {
      throw new ErrorResponse(404, "not found video");
    }
    return res.status(200).json(video);
  },
  updateVideoById: async (req, res, next) => {
    let id = req.params.id;
    let { ...body } = req.body;
    let video = await videoModel.findByIdAndUpdate(id, body, { new: true });
    if (!video) {
      throw new ErrorResponse(404, "Not found video");
    }
    return res.status(200).json(video);
  },
  removeVideoFromCourse: async (req, res, next) => {
    const { idCourse, arrayVideo } = req.body;

    let result = await courseModel.updateOne(
      { _id: idCourse },
      {
        $pullAll: {
          videos: arrayVideo,
        },
      }
    );
    return res.status(200).json(result);
  },
  deleteVideo: async (req, res, next) => {
    const { arrayId } = req.body;

    let video = await videoModel.deleteMany({
      _id: {
        $in: arrayId,
      },
    });
    return res.status(200).json(video);
  },
};
