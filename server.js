//const can be replace with import in es6  (just use type:module in package.json)
import express from "express";
import dotenv, { config } from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cors from "cors"

const app=express();

// config database
connectDB();

// middleware 
app.use(cors());
app.use(express.json())  //for handling json req
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category', categoryRoutes);

dotenv.config({path:'./.env'})

app.get("/",(req,res)=>{
   res.send("hello in my app")
})

const PORT= process.env.PORT || 8080;

//server listening
app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
})
