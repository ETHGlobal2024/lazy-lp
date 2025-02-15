'use client'

import React, {ReactNode} from 'react'
import {config, projectId} from '@/config'

import {createWeb3Modal} from '@web3modal/wagmi/react'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import {State, WagmiProvider} from 'wagmi'

import {zircuitTestnet} from 'viem/chains'

// Setup queryClient
const queryClient = new QueryClient()
if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
    defaultChain: zircuitTestnet,
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeVariables: {
        '--w3m-accent': 'hsl(var(--primary-20))',
    },
})

export default function Web3ModalProvider({
                                              children,
                                              initialState
                                          }: {
    children: ReactNode
    initialState?: State
}) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}
