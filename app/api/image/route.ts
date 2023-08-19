import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai: OpenAI = new OpenAI();

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();
        const { prompt, amount = 1, resolution = "512x512" } = await request.json();

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        if (!prompt || !amount || !resolution) return new NextResponse("missing required fields.", { status: 400 });

        const response = await openai.images.generate({
            prompt,
            n: +amount,
            size: resolution,
        });
        return NextResponse.json(response.data);
    } catch (e: any) {
        console.log("[IMAGE_ERROR]: ", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
