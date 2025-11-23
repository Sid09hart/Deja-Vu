import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import memeRoutes from './routes/memeRoutes.js';
import { aiService } from './services/aiService.js'; // ✨ Import AI Service

dotenv.config();

const app = express();

// Allow requests from your specific frontend
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Connect to Database
connectDB();

// ✨ PRELOAD AI MODEL ON STARTUP
// This ensures the heavy model is ready BEFORE the user clicks search
(async () => {
    try {
        console.log("🚀 deeply pre-loading AI models...");
        await aiService.init(); 
        console.log("✅ AI Models Ready for Requests!");
    } catch (err) {
        console.error("⚠️ AI Preload Failed:", err);
    }
})();

// Routes
app.use('/api/memes', memeRoutes);

// Health Check (Keep Alive)
app.get('/', (req, res) => {
    res.send("Meme Engine is Online 🟢");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});