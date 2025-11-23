import { 
    AutoTokenizer, 
    CLIPTextModelWithProjection, 
    AutoProcessor, 
    CLIPVisionModelWithProjection, 
    RawImage,
    env
} from '@xenova/transformers';

// Skip local model checks to save startup time/resources on Render
env.allowLocalModels = false;
env.useBrowserCache = false;

class AIService {
    constructor() {
        this.tokenizer = null;
        this.textModel = null;
        this.processor = null;
        this.visionModel = null;
    }

    // 1. Startup: Load ONLY Text Model (Small & Fast)
    // This ensures the Search Bar works immediately.
    async init() {
        if (this.textModel) return;

        console.log("⏳ Loading Text Model (Search Brain)...");
        
        // Quantized = smaller memory footprint
        this.tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch32');
        this.textModel = await CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32', {
            quantized: true
        });

        console.log("✅ Text Model Ready!");
    }

    // 2. On-Demand: Load Vision Model (Only when needed)
    async initVision() {
        if (this.visionModel) return;

        console.log("📷 Loading Vision Model (Upload Brain)...");
        
        this.processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch32');
        this.visionModel = await CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch32', {
            quantized: true
        });
        
        console.log("✅ Vision Model Ready!");
    }

    async getTextEmbedding(text) {
        // Ensure Text brain is ready
        await this.init();
        
        const inputs = this.tokenizer([text], { padding: true, truncation: true });
        const { text_embeds } = await this.textModel(inputs);
        return Array.from(text_embeds.data);
    }

    async getImageEmbedding(imageUrl) {
        // Ensure Vision brain is ready (Lazy Load)
        await this.initVision();
        
        const image = await RawImage.read(imageUrl);
        const image_inputs = await this.processor(image);
        
        // Explicitly pass the pixel_values to avoid "input_ids" error
        const { image_embeds } = await this.visionModel(image_inputs);
        return Array.from(image_embeds.data);
    }
}

export const aiService = new AIService();