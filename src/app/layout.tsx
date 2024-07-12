import type {Metadata} from "next";
import "./globals.css";

import Web3ModalProvider from '@/context'
import {config} from "@/config";

import {headers} from "next/headers";
import {cookieToInitialState} from "wagmi";

export const metadata: Metadata = {
  title: "Lazy LP",
  description: "AI powered liquidity provision",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
      <html lang="en">
      <body>
      <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
      </html>
  );
}
