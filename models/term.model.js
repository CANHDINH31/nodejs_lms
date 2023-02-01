const mongoose = require("mongoose");

const termSchema = mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://images.newscientist.com/wp-content/uploads/2021/12/01155751/pri211807004-2.jpg",
    },
    description: {
      type: String,
      default: "Không có mô tả",
    },
    title: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "course",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("term", termSchema);
