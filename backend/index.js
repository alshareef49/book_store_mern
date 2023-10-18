import express, { request, response } from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();
//middleware for parsing json
app.use(express.json());

//middleware for handling cors POLICY
//method 1: Allow all origin with default of cors(*)
// app.use(cors());
//method2: Allow custom Origin
app.use(cors({
  origin:'http"//localhost:3000',
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type']
}))

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to mern stack tutorial");
});

app.use('/books',booksRoute);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
