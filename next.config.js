// @ts-check

const proxyApis = [
  {
    source: "/www.fruityvice.com/:slug*",
    destination: "https://www.fruityvice.com/:slug*",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [...proxyApis];
  },
  headers: async () => {
    // safe to use wildcard CORS for APIs not behind firewall
    // https://stackoverflow.com/a/43154277
    const corsHeaders = Object.entries({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    }).map(([key, value]) => ({ key, value }));
    return [
      ...proxyApis.map(({ source }) => ({ source, headers: corsHeaders })),
    ];
  },
};

module.exports = nextConfig;
