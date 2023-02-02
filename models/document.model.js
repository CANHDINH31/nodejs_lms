const mongoose = require("mongoose");

const documentSchema = mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    firebase: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("document", documentSchema);
