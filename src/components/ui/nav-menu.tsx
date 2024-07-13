'use client'

import React from "react";
import ConnectButton from "@/components/W3R/ConnectButton";

const Navbar: React.FC = () => {

    return (
        <nav className="flex justify-between items-center p-8">
            {/*TODO: Add logo*/}
            <p className="text-2xl font-bold">
                LAZY PEGGY
            </p>
            <ConnectButton/>
        </nav>
    );
};

export default Navbar;