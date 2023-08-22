import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimitCount = async () => {
    const { userId } = auth();
    if (!userId) return;
    const userApiLimitCount = await prismadb.userApiLimit.findUnique({
        where: {
            userId,
        },
    });
    if (userApiLimitCount) {
        await prismadb.userApiLimit.update({
            where: {
                userId,
            },
            data: { count: userApiLimitCount.count + 1 },
        });
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userId,
                count: 1,
            },
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();
    if (!userId) return false;
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId,
        },
    });
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) return true;
    return false;
};
