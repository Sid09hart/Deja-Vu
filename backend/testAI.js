import { aiService } from './services/aiService.js';

async function test() {
    console.log("🧪 Starting AI Test...");
    
    try {
        const text = "A funny cat";
        console.log(`\n📝 Analyzing text: "${text}"...`);
        
        // Calling the specific TEXT function (no pixel_values error!)
        const vector = await aiService.getTextEmbedding(text);
        
        console.log(`🎉 Success! Generated Vector with ${vector.length} dimensions.`);
        console.log("First 5 numbers:", vector.slice(0, 5));
        
    } catch (error) {
        console.error("❌ AI Test Failed:", error);
    }
}

test();