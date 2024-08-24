require("dotenv").config();
const mongoose = require("mongoose");

const mongooseURI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
