import Meme from '../models/Meme.js';
import { aiService } from '../services/aiService.js';

export const uploadMeme = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No image uploaded" });
        console.log("📤 Uploaded to Cloudinary:", req.file.path);

        // 1. Generate Vector
        console.log("🧠 Generating Vector...");
        const vector = await aiService.getImageEmbedding(req.file.path);

        // 2. DUPLICATE CHECK (The AI Way)
        const duplicates = await Meme.aggregate([
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "embedding",
                    "queryVector": vector,
                    "numCandidates": 5,
                    "limit": 1
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "imageUrl": 1,
                    "score": { "$meta": "vectorSearchScore" }
                }
            },
            {
                "$match": {
                    "score": { "$gt": 0.99 } // If > 99% match, it's a duplicate
                }
            }
        ]);

        if (duplicates.length > 0) {
            console.log("⚠️ Duplicate found. Skipping save.");
            return res.status(200).json({ 
                message: "Meme already exists!", 
                ...duplicates[0] 
            });
        }

        // 3. Save if unique
        const newMeme = await Meme.create({
            imageUrl: req.file.path,
            description: req.body.description || "",
            embedding: vector
        });

        console.log("💾 Saved new meme!");
        res.status(201).json(newMeme);

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Failed to process meme" });
    }
};

export const searchMemes = async (req, res) => {
    try {
        const queryText = req.query.q;
        if (!queryText) return res.status(400).json({ error: "Query required" });

        console.log(`🔍 Searching: "${queryText}"`);
        const vector = await aiService.getTextEmbedding(queryText);

        const results = await Meme.aggregate([
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "embedding",
                    "queryVector": vector,
                    "numCandidates": 100,
                    "limit": 50
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "imageUrl": 1,
                    "description": 1,
                    "score": { "$meta": "vectorSearchScore" }
                }
            },
            {
                // FILTER: Only return good matches (> 60%)
                "$match": {
                    "score": { "$gt": 0.62 } 
                }
            }
        ]);

        console.log(`✅ Found ${results.length} relevant matches`);
        res.json(results);

    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ error: "Search failed" });
    }
};