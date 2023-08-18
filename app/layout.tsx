import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI-Generator",
    description: "AI-Generator Built with Nextjs 13",
};

export default function RootLayout({ children }: { children: React.ReactNode | string }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
