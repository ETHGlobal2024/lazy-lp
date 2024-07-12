export interface Notification {
    type: string;
    title: string;
    body: string;
    url: string;
}

export interface ApiResponse {
    sent: string[];
    failed: string[];
    not_found: string[];
}