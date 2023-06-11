/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/html/googlee73412404e862c11.html',
        destination: '/googlee73412404e862c11.html',
      },
    ];
  },
};

module.exports = nextConfig;
