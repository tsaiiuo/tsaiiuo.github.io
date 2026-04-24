import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserSite = repoName.endsWith('.github.io');
const basePath = isGithubPages && repoName && !isUserSite ? `/${repoName}` : '';

const nextConfig: NextConfig = {
	output: 'export',
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	basePath,
	assetPrefix: basePath || undefined,
};

export default nextConfig;
