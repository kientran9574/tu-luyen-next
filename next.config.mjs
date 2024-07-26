/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
                pathname: "/f/**",
            },
        ],
    },
    reactStrictMode: false,
};
export default nextConfig;
