import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoute.js";
const app = express();
import cors from "cors";

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hi The App is working Succesfully</h1>");
});

//CORS Middleware For CORS Policy
app.use(cors());

//Middleware for Parsing Request Body
app.use(express.json());

//Routes fro book model
app.use("/books", bookRoutes);

//Connection With Database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
