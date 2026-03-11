import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/moc/matthew-cv",
        destination: "https://mattio.space/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
