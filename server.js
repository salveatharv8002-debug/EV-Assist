import express from "express";import cors from "cors";import dotenv from "dotenv";import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";import requestRoutes from "./routes/requests.js";
dotenv.config();const app=express();app.use(cors({origin:"http://localhost:5174"}));app.use(express.json());
app.get("/api/health",(req,res)=>res.json({ok:true,service:"EV Assist API"}));
app.use("/api/auth",authRoutes);app.use("/api/requests",requestRoutes);
const port=process.env.PORT||5000;
async function start(){try{if(process.env.MONGO_URI){await mongoose.connect(process.env.MONGO_URI);console.log("MongoDB connected")}}catch(e){console.log("MongoDB connection error:",e.message)}
app.listen(port,()=>console.log(`EV Assist API: http://localhost:${port}`))}
start();
