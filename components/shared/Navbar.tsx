import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./Mobile-Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

let apiLimitCount: number;
const apiCount = async () => {
    apiLimitCount = await getApiLimitCount();
};

// apiCount();

export default async function Navbar() {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
    return (
        <div className="flex items-center py-2 px-4">
            <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}
