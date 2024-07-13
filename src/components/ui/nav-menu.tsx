'use client'

import React from "react";
import ConnectButton from "@/components/W3R/ConnectButton";

const Navbar: React.FC = () => {

    return (
        <nav className="flex justify-between items-center p-8">
            {/*TODO: Add logo*/}
            <p className="text-2xl font-bold">
                CIRCUIT
            </p>
            <div
                className="absolute left-1/2 transform -translate-x-1/2
                 flex gap-8 rounded-3xl bg-foreground px-8 py-2.5 text-background">
                <a href="/docs" className="">docs</a>
                <a href="/trade" className="">trade</a>
                <a href="/explore" className="">explore</a>
                <a href="/pool" className="">pool</a>
            </div>
            <ConnectButton/>
        </nav>
    );
};

export default Navbar;