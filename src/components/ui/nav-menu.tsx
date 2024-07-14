'use client'

import React from "react";
import ConnectButton from "@/components/W3R/ConnectButton";
import NotificationModule from "@/components/W3R/NotificationModule";

const Navbar: React.FC = () => {

    return (
        <nav className="flex justify-between items-center p-8">
            <p className="text-2xl font-bold">
                LAZY PEGGY
            </p>
            <div className="flex flex-row justify-center items-center gap-4">
                <NotificationModule/>
                <ConnectButton/>
            </div>
        </nav>
    );
};

export default Navbar;