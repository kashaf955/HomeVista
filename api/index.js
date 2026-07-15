import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.js'
import path from "path";

mongoose.connect(process.env.MONGO_URI,{
  dbName: "HomeVista",
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

  const __dirname = path.resolve();

const app = express();  
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ 
    success: false,
    statusCode, 
    message });
});