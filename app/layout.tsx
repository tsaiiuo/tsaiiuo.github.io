import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Min-Huan Tsai | Data & Backend Engineer',
	description:
		'Portfolio of Min-Huan Tsai, a data and backend engineer focused on production-grade pipelines, applied AI systems, and scalable software.',
	keywords: [
		'Min-Huan Tsai',
		'Data Engineer',
		'Backend Engineer',
		'Machine Learning Engineer',
		'Software Engineer',
		'Python',
		'Java',
		'TypeScript',
		'SQL',
		'dbt',
		'Snowflake',
		'React',
		'Next.js',
		'AWS',
		'Kubernetes',
		'LLM',
	],
	authors: [{ name: 'Min-Huan Tsai' }],
	creator: 'Min-Huan Tsai',
	openGraph: {
		title: 'Min-Huan Tsai | Data & Backend Engineer',
		description: 'Production-focused engineer with experience across data platforms, LLM systems, and high-impact product delivery.',
		siteName: 'Min-Huan Tsai Portfolio',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'Min-Huan Tsai | Data & Backend Engineer',
		description: 'Production-focused engineer with experience across data platforms, LLM systems, and high-impact product delivery.',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
