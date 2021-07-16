import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./router.js";
import cors from "cors";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://user:qwer@cluster0.z66eh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", userRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true });
    app.listen(PORT, () => console.log("server started on port " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
