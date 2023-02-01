const termRouter = require("./term.router");
const courseRouter = require("./course.router");
const videoRouter = require("./video.router");
const errorHandle = require("../middlewares/errorHandle");
module.exports = (app) => {
  app.use("/api/term", termRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/video", videoRouter);
  app.use(errorHandle);
};
