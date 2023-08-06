/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
        ],
    },

}

module.exports = nextConfig
