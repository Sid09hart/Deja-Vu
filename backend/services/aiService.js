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

        console.log("⏳ Loading AI Models (Optimized)...");

        // 1. Text Brain
        this.tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch32');
        this.textModel = await CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32', {
            quantized: true
        });

        // 2. Vision Brain
        this.processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch32');
        this.visionModel = await CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32', {
            quantized: true
        });

        console.log("✅ AI Models Ready!");
    }

    async getTextEmbedding(text) {
        await this.init();
        const inputs = this.tokenizer([text], { padding: true, truncation: true });
        const { text_embeds } = await this.textModel(inputs);
        return Array.from(text_embeds.data);
    }

    async getImageEmbedding(imageUrl) {
        await this.init();
        
        // 1. Read Image
        const image = await RawImage.read(imageUrl);
        
        // 2. Process Image
        // The processor returns an object like { pixel_values: Tensor, ... }
        const image_inputs = await this.processor(image);
        
        // 3. Run Vision Model
        // We explicitly pass the object which contains 'pixel_values'
        const { image_embeds } = await this.visionModel(image_inputs);
        
        return Array.from(image_embeds.data);
    }
}

export const aiService = new AIService();