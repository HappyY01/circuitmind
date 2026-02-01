import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/components/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CircuitMinds - Master Circuit Theory with AI",
    description: "Educational simulation platform for Electrical Engineering students to learn, calculate, and visualize Kirchhoff's Current Law (KCL) and Kirchhoff's Voltage Law (KVL)",
    keywords: ["circuit theory", "KCL", "KVL", "electrical engineering", "education", "simulation"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                {children}
                <ToasterProvider />
            </body>
        </html>
    );
}
