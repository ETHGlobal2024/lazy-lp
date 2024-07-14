/** @type {import('next').NextConfig} */

const BE_API = "https://d727-213-214-42-42.ngrok-free.app";

const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${BE_API}/:path*`,
            }
        ];
    },
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
    reactStrictMode: true,
}

export default nextConfig;
