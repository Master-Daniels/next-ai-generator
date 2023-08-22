import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import ModalProvider from "@/components/providers/ModalProvider";

export const metadata: Metadata = {
    title: "AI-Generator",
    description: "AI-Generator Built with Nextjs 13",
};

export default function RootLayout({ children }: { children: React.ReactNode | string }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <ModalProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
