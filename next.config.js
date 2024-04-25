/** @type {import('next').NextConfig} */
// const nodeExternals = require('webpack-node-externals');

const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: process.env.API_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
        FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    },
    images: {
        domains: [
            'res.cloudinary.com',
            'lh3.googleusercontent.com',
            'scontent.fsgn2-8.fna.fbcdn.net',
            'platform-lookaside.fbsbx.com',
            'scontent.fsgn21-1.fna.fbcdn.net',
            'images.unsplash.com',
            'cf.quizizz.com',
            'global-uploads.webflow.com',
            'demos.creative-tim.com'
        ]
    },

    webpack: (config) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            bufferutil: 'commonjs bufferutil',
            'supports-color': 'commonjs supports-color'
        });
        return config;
    }
};

module.exports = nextConfig;
