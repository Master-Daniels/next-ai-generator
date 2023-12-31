import { checkApiLimit, increaseApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();
        const { prompt } = await request.json();

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free Trial has expired", { status: 403 });
        }

        const output = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt,
                },
            }
        );
        if (isPro) await increaseApiLimitCount();

        return NextResponse.json(output);
    } catch (e: any) {
        console.log("[VIDEO_ERROR]: ", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
