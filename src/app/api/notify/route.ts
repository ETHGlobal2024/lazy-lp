import {NextRequest, NextResponse} from 'next/server';
import {ApiResponse, Notification} from '@/types';

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const NOTIFY_API_SECRET = process.env.NOTIFY_API_SECRET as string;
console.log('PROJECT_ID', PROJECT_ID);
console.log('NOTIFY_API_SECRET', NOTIFY_API_SECRET);

interface RequestBody {
    notification: Notification;
    accounts: string[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body: RequestBody = await req.json();

        const response = await fetch(`https://notify.walletconnect.com/${PROJECT_ID}/notify`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${NOTIFY_API_SECRET}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}