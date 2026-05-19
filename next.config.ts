import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN access from mobile for dev testing (e.g. http://192.168.0.2:3000).
  // Only used in `next dev`; no effect on production.
  allowedDevOrigins: ["192.168.0.2"],
};

export default nextConfig;
