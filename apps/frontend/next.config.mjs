/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        VNC_URL: process.env.VNC_URL,
        BACKEND_URL: process.env.BACKEND_URL,
    }
};

export default nextConfig;
