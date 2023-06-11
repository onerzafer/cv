/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/googlee73412404e862c11.html',
        destination: '/html/googlee73412404e862c11.html',
      },
    ];
  },
};

module.exports = nextConfig;
