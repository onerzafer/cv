/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/html/googlee73412404e862c11.html',
        destination: '/googlee73412404e862c11.html',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
