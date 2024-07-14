import {defaultWagmiConfig} from '@web3modal/wagmi/react/config'

import {cookieStorage, createStorage} from 'wagmi'
import {mainnet, sepolia} from 'wagmi/chains'
import {ChainDetail} from "../contract/abi";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
    name: 'LazyLP',
    description: 'AI powered liquidity provision',
    url: 'lazy-lp.vercel.app', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [ChainDetail] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    auth: {
        email: true, // default to true
        socials: ['google', 'x', 'github', 'discord', 'apple'],
        showWallets: true, // default to true
        walletFeatures: true // default to true
    }
})
