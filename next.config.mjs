/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
    reactStrictMode: true,
}

export default nextConfig;
