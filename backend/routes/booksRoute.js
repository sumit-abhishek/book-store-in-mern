import express from "express";
import { Book } from "../models/bookModels.js";
const router = express.Router();

//Route for Adding A Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: "Send all required fields: Name, Author and Publish Year",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

//Routes for Getting All Books from Database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

//Route for getting one book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.send({ message: "No Such Book is found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

//Route for Updating book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: "Send all required fields: Name, Author and Publish Year",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "No Book with this id is Found" });
    }
    return res.status(200).send({ message: "Book updated Succesfully" });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

//Route for Deleting book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "No Book with this id is Found" });
    }
    return res.status(200).send({ message: "Book Delete Succesfully" });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

export default router;
