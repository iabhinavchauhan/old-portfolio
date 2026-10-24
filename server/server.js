import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.get('/api/health',(req,res)=>res.json({ok:true,message:'Portfolio API is running'}));
app.use('/api/contact',contactRoutes);
app.use('/api/projects',projectRoutes);

const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI)
 .then(()=>app.listen(PORT,()=>console.log(`API running on ${PORT}`)))
 .catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1)});
