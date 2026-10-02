import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '192.168.1.3',
    'crevice-marshland-disinfect.ngrok-free.dev'
  ],
};

export default nextConfig;
