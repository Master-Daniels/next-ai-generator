import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./Mobile-Sidebar";

export default function Navbar() {
    return (
        <div className="flex items-center p-4 bg-violet-500">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}