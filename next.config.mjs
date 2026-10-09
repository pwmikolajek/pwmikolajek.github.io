/** @type {import('next').NextConfig} */
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: repoBasePath,
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
