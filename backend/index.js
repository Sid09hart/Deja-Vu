import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import memeRoutes from './routes/memeRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/memes', memeRoutes);

app.use('/',(req,res)=>{
    res.send("server is working");
    console.log("server is ok 🎉🎉");
    
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port  http://localhost:${PORT}`);
});