'use client'

import {
    initWeb3InboxClient,
    usePrepareRegistration,
    useRegister,
    useSubscribe,
    useSubscription,
    useUnsubscribe,
    useWeb3InboxAccount,
    useWeb3InboxClient,
} from '@web3inbox/react'
import {useSignMessage, useAccount} from 'wagmi'

import Notifications from './Notifications'

export default function NotificationModule() {

    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN!;

    const {address} = useAccount()
    const {signMessageAsync} = useSignMessage()

    const {prepareRegistration} = usePrepareRegistration()
    const {register, isLoading: isRegistering} = useRegister()
    initWeb3InboxClient({projectId, domain: appDomain}).then(
        () => {
            console.log('W3I Client initialized')
        }
    )
    const {data: w3iClient, isLoading: w3iClientIsLoading} = useWeb3InboxClient()
    const {isRegistered} = useWeb3InboxAccount(`eip155:1:${address}`)

    const handleRegistration = async () => {
        try {
            const {message, registerParams} = await prepareRegistration()
            const signature = await signMessageAsync({message: message})
            await register({registerParams, signature})
        } catch (registerIdentityError: any) {
            console.error(registerIdentityError)
        }
    }

    const {subscribe, isLoading: isSubscribing} = useSubscribe()
    const {unsubscribe, isLoading: isUnsubscribing} = useUnsubscribe()
    const {data: subscription} = useSubscription()
    const isSubscribed = Boolean(subscription)

    return (
        <>
            {w3iClientIsLoading ? (
                <div>Loading W3I Client</div>
            ) : (
                <div>
                    <div className="flex flex-row gap-4 justify-center items-center ">
                        <button onClick={handleRegistration} disabled={isRegistered}>
                            {isRegistered ? 'Registered' : 'Register'}
                        </button>
                        <button
                            onClick={() => (isSubscribed ? unsubscribe() : subscribe())}
                            disabled={isSubscribing || isUnsubscribing}
                        >
                            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}