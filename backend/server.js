// server.js
import express from "express";
import connectToDatabase from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import todoRoutes from "./Routes/todoRoutes.js";

import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", todoRoutes);

// Error handler middleware (must be defined after other middleware and routes)
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
