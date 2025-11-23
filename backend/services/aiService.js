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

        console.log("⏳ Loading AI Models (Quantized)...");

        // ✨ MEMORY OPTIMIZATION: Force 'q8' (8-bit) quantization
        // This reduces RAM usage by ~75% vs full precision
        const options = { 
            quantized: true,
            dtype: 'q8' 
        };

        // 1. Text Brain
        this.tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch32', options);
        this.textModel = await CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32', options);

        // 2. Vision Brain
        this.processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch32', options);
        this.visionModel = await CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32', options);

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
        const image = await RawImage.read(imageUrl);
        const inputs = await this.processor(image);
        const { image_embeds } = await this.visionModel(inputs);
        return Array.from(image_embeds.data);
    }
}

export const aiService = new AIService();