import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//post request to add book to database
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .send({
            message: "Send all required fields: title,author and publishYear",
          });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  
  //get request to get all books from database
  router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  
  //get request to get book by id from database
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  
  // update request
  router.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response
          .status(400)
          .send({
            message: "Send all required fields: title,author and publishYear",
          });
      }
      const { id } = request.params;
      const result = await Book.findByIdAndUpdate(id,request.body);
  
      if(!result){
          return response.status(404).send({message:'book not found'})
      }
      return response.status(200).send({message:'book updated successfully'})
  
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });
  
  // delete request
  router.delete('/:id', async (request,response)=>{
      try {
          const { id } = request.params;
          const result = await Book.findByIdAndDelete(id);
          if(!result){
              return response.status(404).send({message:'book not found'});
          }
          return response.status(200).send({message:'book deleted successfully'});
      } catch (error) {
          console.log(error.message);
          return response.status(500).send({message:error.message});
      }
  });

  export default router;