import {Notification, ApiResponse} from '../types'

export async function sendNotification(notification: Notification, accounts: string[]): Promise<ApiResponse> {
    const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            notification,
            accounts
        })
    });

    console.log('response', response);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}