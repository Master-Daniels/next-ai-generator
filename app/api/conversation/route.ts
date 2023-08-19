import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai: OpenAI = new OpenAI();

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();
        const { messages } = await request.json();

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!messages) return new NextResponse("Messages are required", { status: 400 });
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
        });

        return NextResponse.json(response.choices);
    } catch (e: any) {
        console.log("[CONSERVATION_ERROR]: ", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
