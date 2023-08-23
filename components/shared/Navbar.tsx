import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./Mobile-Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

let apiLimitCount: number;
const apiCount = async () => {
    apiLimitCount = await getApiLimitCount();
};

apiCount();

export default function Navbar() {
    return (
        <div className="flex items-center py-2 px-4">
            <MobileSidebar apiLimitCount={apiLimitCount} />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}
