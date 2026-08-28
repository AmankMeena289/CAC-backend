import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

//for do not altering the setting of DNS in my pc , i run this at google server
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


// Configure dotenv for environment variables
dotenv.config({
  path: "./.env",
});

// Connect to MongoDB Atlas and start the Express server
connectDB()
  .then(() => {
    // Optional event listener for express application errors
    app.on("error", (error) => {
      console.error("Express App Error: ", error);
      throw error;
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed !!! ", err);
  });