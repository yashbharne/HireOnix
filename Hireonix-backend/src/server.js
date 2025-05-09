require("dotenv").config();
const connectDb = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("DB URL should be defined");
    }
    await connectDb();

    app.listen(PORT, () => {
      console.log("Server started", PORT);
    });
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};
startServer();
