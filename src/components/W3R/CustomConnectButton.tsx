import React from "react";
import {useWeb3Modal} from '@web3modal/wagmi/react'

const CustomConnectButton = ({className}: { className?: string }) => {
    const {open} = useWeb3Modal();

    return (
        <button
            onClick={() => open()}
            className={`${className}`}
        >
            Connect Wallet
        </button>
    );
};

export default CustomConnectButton;