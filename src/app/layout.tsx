import type {Metadata} from "next";
import "./globals.css";
import {Inter as FontSans} from "next/font/google"

import Web3ModalProvider from '@/context'
import {ThemeProvider} from "@/components/ui/theme-providor";
import {config} from "@/config";

import {headers} from "next/headers";
import {cookieToInitialState} from "wagmi";
import {cn} from "@/lib/utils";

export const metadata: Metadata = {
    title: "Lazy LP",
    description: "AI powered liquidity provision",
};

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(config, headers().get('cookie'))
    return (
        <html lang="en">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <Web3ModalProvider initialState={initialState}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >{children}
            </ThemeProvider>
        </Web3ModalProvider>
        </body>
        </html>
    );
}
