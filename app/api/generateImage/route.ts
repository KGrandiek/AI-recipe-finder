import { OpenAI } from "openai";
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you set this in your .env file
});

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { prompt } = body;
    
        if (!prompt || typeof prompt !== "string") {
          return NextResponse.json({ error: "Valid prompt is required" }, { status: 400 });
        }
    
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt,
          n: 1,
          size: "1024x1024",
        });
    
        if (!response.data || !Array.isArray(response.data) || !response.data[0]?.url) {
          return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
        }
        const imageUrl = response.data[0].url; // Extract generated image URL
    
        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error) {
        console.error("Error generating image:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}