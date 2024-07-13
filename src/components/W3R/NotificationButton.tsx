'use client'

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { ApiResponse, Notification } from '@/types';
import { sendNotification } from '@/lib/notifications';

const NotifyButton: React.FC = () => {
    const { address } = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ApiResponse | null>(null);

    const handleNotify = async () => {
        if (!address) {
                alert('Please connect your wallet first');
            return;
        }

        setIsLoading(true);
        try {
            const notification: Notification = {
                type: '3d671a2f-1277-46ad-b2e8-aa58d308be0f',
                title: 'New Notification',
                body: 'This is a test notification from our app',
                url: 'https://lazy-lp.vercel.app/'
            };

            const accounts = [`eip155:1:${address}`];
            const response = await sendNotification(notification, accounts);
            setResult(response);
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleNotify} disabled={isLoading || !address}>
                {isLoading ? 'Sending...' : 'Send Notification'}
            </button>
            {result && (
                <div>
                    <h3>Notification Result:</h3>
                    <p>Sent: {result.sent.length}</p>
                    <p>Failed: {result.failed.length}</p>
                    <p>Not Found: {result.not_found.length}</p>
                </div>
            )}
        </div>
    );
};

export default NotifyButton;