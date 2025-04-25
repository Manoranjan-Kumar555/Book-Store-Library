// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors")

// Load environment variables from .env file
dotenv.config();

const connection = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;

    if (!mongoURL) {
      throw new Error("❌ MONGO_URL is not defined in environment variables.");
    }

    const mongoDbConnection = await mongoose.connect(mongoURL);

    console.log("✅ MongoDB connected successfully!");
    console.log(`🔗 Connected to MongoDB at host: ${mongoDbConnection.connection.host}`.bgGreen.white.bold);
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

connection();
// ✅ CommonJS export
module.exports = connection;
