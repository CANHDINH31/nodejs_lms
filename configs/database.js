const mongoose = require("mongoose");
const configuration = require("./configuration");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(configuration.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối db thành công");
  } catch (error) {
    console.log("error db: " + error.message);
  }
};

module.exports = connectDB;
