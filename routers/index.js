const termRouter = require("./term.router");
const courseRouter = require("./course.router");
const videoRouter = require("./video.router");
const documentRouter = require("./document.router");
const socialRouter = require("./social.router");
const errorHandle = require("../middlewares/errorHandle");
module.exports = (app) => {
  app.use("/api/term", termRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/video", videoRouter);
  app.use("/api/document", documentRouter);
  app.use("/api/social", socialRouter);
  app.use(errorHandle);
};
