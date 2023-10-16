import express from "express";
import { PORT,mongoDBUrl } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(200).send('Welcome to mern stack tutorial');
})

app.post('/books',async (request,response)=>{
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:'Send all required fields: title,author and publishYear'});
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
})

mongoose
    .connect(mongoDBUrl)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT,()=>{
            console.log(`App is listening on PORT ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });