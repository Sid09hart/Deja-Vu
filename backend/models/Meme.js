import mongoose from 'mongoose';

const memeSchema = new mongoose.Schema({
    imageUrl: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    }, 
    // This is the "AI Meaning" (Vector)
    embedding: {
        type: [Number], 
        required: true,
        index: true // Important for performance
    }
}, { timestamps: true });

const Meme =  mongoose.model('Meme', memeSchema);
export default Meme;