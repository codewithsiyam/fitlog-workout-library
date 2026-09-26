/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The FitLog API can serve workout images from any host.
    // A single hardcoded hostname here (e.g. only "img.magnific.com")
    // makes next/image throw "hostname is not configured" for every
    // other image URL, which crashes the Library grid, the detail
    // page, and the My Plan cards. Allowing any https host keeps
    // <Image> working no matter which CDN the API happens to use.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
