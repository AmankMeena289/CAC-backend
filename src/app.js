import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// 1. CORS Configuration (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// 2. Body Parser (Accepting JSON data with size limits to prevent server crashes)
app.use(express.json({ limit: "16kb" }));

// 3. URL-encoded Parser (Handles URL query params, encoded spaces e.g., %20, +)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// 4. Static Asset Provider (Serving public assets like PDFs/images from local server)
app.use(express.static("public"));

// 5. Cookie Parser (Enables CRUD operations on secure user browser cookies from server)
app.use(cookieParser());

export { app };