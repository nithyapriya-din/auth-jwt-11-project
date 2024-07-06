import express from "express";
import dotenv from "dotenv";
import { router as authRoute } from "./routes/auth.js";
import { router as postRoute } from "./routes/posts.js";
import { dbConnect } from "./db/Connection.js";

const app = express();
dotenv.config();
dbConnect();

// middlewares
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  // console.clear();
  console.log(`Server is listening on port ${PORT}!`);
});
