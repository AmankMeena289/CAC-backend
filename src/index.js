import dotenv from "dotenv";
import dns from "dns";
import connectDB from "./db/index.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
console.log("DB_NAME:", process.env.DB_NAME);

connectDB();