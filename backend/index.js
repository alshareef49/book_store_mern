import express from "express";
import { PORT,mongoDBUrl } from "./config.js"
import mongoose from "mongoose";

const app = express();

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(200).send('Welcome to mern stack tutorial');
})

// app.listen(PORT,()=>{
//     console.log(`App is listening on PORT ${PORT}`);
// });

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