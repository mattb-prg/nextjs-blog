const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withOptimizedImages({
    handleImages: ['ico', 'png', 'jpg', 'jpeg', 'webp', 'svg'],
    responsive: {
        adapter: require("responsive-loader/sharp"),
        sizes: [320, 640, 960, 1200, 1800, 2400]
    },
    images: {
        disableStaticImages: true,
    },
})