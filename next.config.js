/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	reactStrictMode: true,
	output: "standalone",
};

module.exports = nextConfig;
