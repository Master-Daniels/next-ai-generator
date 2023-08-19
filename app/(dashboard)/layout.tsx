import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode | string }) {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex flex-col fixed inset-y-0 z-[80] bg-gray-900 w-72">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
