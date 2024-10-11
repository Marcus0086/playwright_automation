/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        VNC_URL: process.env.VNC_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        BACKEND_URL_INTERNAL: process.env.BACKEND_URL_INTERNAL,
    }
};

export default nextConfig;
