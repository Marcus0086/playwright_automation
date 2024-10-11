/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        VNC_URL: process.env.VNC_URL,
        BACKEND_URL: process.env.BACKEND_URL,
    }
};

export default nextConfig;
