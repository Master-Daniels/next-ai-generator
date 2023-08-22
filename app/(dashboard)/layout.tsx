import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function DashboardLayout({ children }: { children: React.ReactNode | string }) {
    const apiLimitCount = await getApiLimitCount();
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex flex-col fixed inset-y-0 bg-gray-900 w-72">
                <Sidebar apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
