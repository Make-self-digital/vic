import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // Allow all paths
      },
    ],
  },
  /* config options here */
};

export default nextConfig;

// * Middleware matcher config
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
