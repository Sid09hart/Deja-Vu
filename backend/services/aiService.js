import { 
    AutoTokenizer, 
    CLIPTextModelWithProjection, 
    AutoProcessor, 
    CLIPVisionModelWithProjection, 
    RawImage 
} from '@xenova/transformers';

class AIService {
    constructor() {
        this.tokenizer = null;
        this.textModel = null;
        this.processor = null;
        this.visionModel = null;
    }

    async init() {
        if (this.textModel && this.visionModel) return;

        console.log("⏳ Loading AI Models... (First run takes time)");

        // 1. Load the Text Brain (For search queries)
        this.tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch32');
        this.textModel = await CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32');

        // 2. Load the Vision Brain (For image uploads)
        this.processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch32');
        this.visionModel = await CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32');

        console.log("✅ AI Models Ready!");
    }

    // Specific function for TEXT inputs
    async getTextEmbedding(text) {
        await this.init();
        const inputs = this.tokenizer([text], { padding: true, truncation: true });
        const { text_embeds } = await this.textModel(inputs);
        return Array.from(text_embeds.data);
    }

    // Specific function for IMAGE inputs
    async getImageEmbedding(imageUrl) {
        await this.init();
        const image = await RawImage.read(imageUrl);
        const inputs = await this.processor(image);
        const { image_embeds } = await this.visionModel(inputs);
        return Array.from(image_embeds.data);
    }
}

export const aiService = new AIService();