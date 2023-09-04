import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import ModalProvider from "@/components/providers/ModalProvider";
import ToasterProvider from "@/components/providers/ToasterProvider";
import CrispProvider from "@/components/providers/CrispProvider";

export const metadata: Metadata = {
    title: "AI-Generator",
    description: "Best AI-Generator Built with Nextjs 13",
};

export default function RootLayout({ children }: { children: React.ReactNode | string }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <CrispProvider />
                <body>
                    <ModalProvider />
                    <ToasterProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
