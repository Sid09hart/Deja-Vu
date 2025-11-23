import express from 'express';
import { upload } from '../services/cloudinary.js'; // The file setup in Phase 1
import { uploadMeme, searchMemes } from '../controllers/memeController.js';

const router = express.Router();

// POST /api/memes/upload
// 'image' is the key name for the file input
router.post('/upload', upload.single('image'), uploadMeme);

// Search Route (NEW)
router.get('/search', searchMemes);
export default router;