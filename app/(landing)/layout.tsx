export default async function LandingLayout({ children }: { children: React.ReactNode | React.ReactElement | string }) {
    return (
        <main className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto mx-w-screen-xl h-full w-full">{children}</div>
        </main>
    );
}
