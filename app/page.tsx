'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const highlights = [
	{ label: 'Internship experiences', value: '3' },
	{ label: 'International publications', value: '4' },
	{ label: 'First-author publications', value: '3' },
	{ label: 'Hackathon finish', value: '1st Place' },
];

const experiences = [
	{
		role: 'Data Engineer Intern, RD',
		company: 'GoFreight',
		period: 'Sep 2025 - Mar 2026',
		summary:
			'Built production dbt models and analytics layers on Snowflake, improving both pipeline reliability and downstream decision speed.',
		bullets: [
			'Architected and deployed 10+ dbt models for downstream BI and reporting.',
			'Optimized 3 core fact models and reduced build time by 60%.',
			'Designed 4 Metabase dashboards that turned operational data into usable business views.',
		],
	},
	{
		role: 'Software Engineer Intern, IT',
		company: 'TSMC',
		period: 'Jul 2025 - Aug 2025',
		summary:
			'Worked on document intelligence and search workflows, combining Java backend systems with LLaMA-based processing.',
		bullets: [
			'Developed an auto-summarization, tagging, and org-ID pipeline for 100K documents.',
			'Designed a Trie-based matcher that ran 70% faster than the prior regex approach.',
			'Cut LLaMA token usage by 95% through pre-extraction and filtering logic.',
		],
	},
	{
		role: 'Software Engineer Intern, RD',
		company: 'QuickClick',
		period: 'Jun 2022 - Jan 2023',
		summary:
			'Shipped backend product features in a user-facing fintech environment with production traffic and strict correctness expectations.',
		bullets: [
			'Built a cashflow verification module serving 10,000+ users.',
			'Delivered rebate and coupon modules with Node.js for large-scale user operations.',
		],
	},
];

const publications = [
	{
		title: 'From Thought to Action: An Interactive Platform for Inspecting Strategic Reasoning in LLMs',
		venue: '2026 AAMAS Workshop Paper',
		role: '3rd author',
	},
	{
		title: 'SAMPLE: A Spatial/Channel-wise Attention GCN with MLP and Periodic Linear Encoding for Land Boundary Demarcation System',
		venue: '2026 WWW Demo Paper',
		role: '1st author',
	},
	{
		title: 'GRIDS: A Geospatial AI System for Land Boundary Demarcation',
		venue: '2025 ICDM Workshop Paper',
		role: '1st author',
	},
	{
		title: 'MT-redis',
		venue: 'Linux Foundation Open Source Summit 2025',
		role: '3rd author',
	},
];

const projects = [
	{
		name: 'GRIDS',
		meta: 'First-author · 2025 IEEE ICDM Demo Paper',
		stack: 'Python, React, PyTorch, AWS, MySQL',
		description:
			'Full-stack AI system for land boundary demarcation built with the Tainan City Government. Reduced processing time by 70% while holding prediction error within 10%.',
	},
	{
		name: 'Vision AI Assistant',
		meta: '1st Place · TSMC IT CareerHack 2025',
		stack: 'Python Flask, React, Gemini, LLaMA, SAM2, DINO, Diffusion, GCP',
		description:
			'Built an agentic vision assistant across 10+ project types, reaching 88% accuracy and reducing inference time by 50-80%.',
	},
	{
		name: 'mt-redis',
		meta: 'Co-author · Linux Foundation Open Source Summit 2025',
		stack: 'C, RCU, benchmarking, Linux perf',
		description:
			'Benchmarked multi-threaded Redis variants and found throughput gains from QSBR and CPU affinity tuning under 8-thread workloads.',
	},
	{
		name: 'ImagicNation LLM TextBook',
		meta: '1st Place NCCU MIS 2024 · 3rd Place International ICT 2023',
		stack: 'Next.js, Node.js, Docker, MySQL, AWS',
		description:
			'Built backend infrastructure for a generative textbook platform using GPT-4 and DALL·E 3 to create child-friendly story content.',
	},
];

const skillGroups = [
	{
		title: 'Data Platforms',
		items: ['Python', 'SQL', 'Snowflake', 'dbt', 'Dagster', 'Metabase', 'ELT pipelines'],
	},
	{
		title: 'Backend Systems',
		items: ['Java', 'Spring Boot', 'Node.js', 'TypeScript', 'MySQL', 'MongoDB', 'Firebase'],
	},
	{
		title: 'Applied AI',
		items: ['LLM pipelines', 'PyTorch', 'Computer Vision', 'Prompting', 'RAG-style workflows', 'Vertex AI'],
	},
	{
		title: 'Infra',
		items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Linux', 'Testing'],
	},
];

const sections = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'publications', label: 'Publications' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'skills', label: 'Core stack' },
	{ id: 'education', label: 'Education' },
];

function SectionHeader({ title }: { title: string }) {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">{title}</h2>
			<div className="ml-4 h-px flex-1 bg-[color:var(--line)]" />
		</div>
	);
}

export default function Home() {
	const [activeSection, setActiveSection] = useState('overview');
	const [readProgress, setReadProgress] = useState(0);

	useEffect(() => {
		const elements = sections
			.map((section) => document.getElementById(section.id))
			.filter((element): element is HTMLElement => Boolean(element));

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible[0]?.target.id) {
					setActiveSection(visible[0].target.id);
				}
			},
			{
				rootMargin: '-18% 0px -55% 0px',
				threshold: [0.15, 0.3, 0.5, 0.7],
			},
		);

		elements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const updateReadProgress = () => {
			const scrollTop = window.scrollY;
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
			setReadProgress(Math.max(0, Math.min(100, Math.round(progress))));
		};

		updateReadProgress();
		window.addEventListener('scroll', updateReadProgress, { passive: true });
		window.addEventListener('resize', updateReadProgress);

		return () => {
			window.removeEventListener('scroll', updateReadProgress);
			window.removeEventListener('resize', updateReadProgress);
		};
	}, []);

	return (
		<main className="relative overflow-hidden">
			<div className="pointer-events-none fixed left-4 top-0 z-30 hidden h-screen xl:flex xl:w-12 xl:items-center xl:justify-center">
				<div className="flex h-[70vh] w-full flex-col items-center justify-center gap-3">
					<div className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)]/92 px-2 py-1 font-[family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)] backdrop-blur">
						{readProgress}%
					</div>
					<div className="relative h-full w-[4px] overflow-hidden rounded-full bg-black/8">
						<div
							className="absolute inset-x-0 top-0 rounded-full bg-[color:var(--accent)] transition-[height] duration-300"
							style={{ height: `${readProgress}%` }}
						/>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
				<div className="sticky top-3 z-20 mb-4 lg:hidden">
					<div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)]/95 p-3 shadow-[0_16px_50px_rgba(33,33,33,0.08)] backdrop-blur">
						<div className="mb-3 flex items-center justify-between">
							<p className="font-[family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
								Reading progress
							</p>
							<span className="text-sm font-semibold">{readProgress}%</span>
						</div>
						<div className="mb-3 h-1.5 overflow-hidden rounded-full bg-black/8">
							<div
								className="h-full rounded-full bg-[color:var(--accent)] transition-[width] duration-300"
								style={{ width: `${readProgress}%` }}
							/>
						</div>
						<nav className="flex gap-2 overflow-x-auto pb-1">
							{sections.map((section) => {
								const isActive = activeSection === section.id;
								return (
									<a
										key={section.id}
										href={`#${section.id}`}
										className={`shrink-0 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.14em] transition ${
											isActive
												? 'border-[color:var(--accent)] bg-[color:var(--accent)] text-white'
												: 'border-[color:var(--line)] bg-white/70 text-[color:var(--muted)]'
										}`}
									>
										{section.label}
									</a>
								);
							})}
						</nav>
					</div>
				</div>

				<div className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_20px_80px_rgba(33,33,33,0.08)] backdrop-blur">
					<div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.45fr]">
						<section className="border-b border-[color:var(--line)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
							<div className="flex h-full flex-col gap-8 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-auto">
								<div className="space-y-8">
									<div className="inline-flex rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
										Data x backend x applied AI
									</div>
									<div className="overflow-hidden rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)]">
										<div className="relative aspect-[4/5] w-full">
											<Image src="/min-huan-tsai.jpg" alt="Min-Huan Tsai portrait" fill priority className="object-cover object-center" />
										</div>
										<div className="flex items-center justify-between border-t border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
											<span>Personal portrait</span>
											<span>San Francisco</span>
										</div>
									</div>
									<div className="space-y-3">
										<p className="font-[family:var(--font-ibm-plex-mono)] text-sm uppercase tracking-[0.2em] text-[color:var(--accent)]">Min-Huan Tsai</p>
										<p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
											I like systems work where performance, correctness, and actual deployment matter: pipeline latency, model cost,
											search quality, and user-facing reliability.
										</p>
										<h1 className="max-w-lg text-5xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">
											High-leverage engineering over surface-level demos.
										</h1>
									</div>
									<div className="grid gap-3 sm:grid-cols-2">
										<a href="mailto:tsaiiuo1@gmail.com" className="rounded-2xl bg-[color:var(--foreground)] px-5 py-4 text-sm text-white">
											Email
											<div className="mt-1 font-[family:var(--font-ibm-plex-mono)] text-xs text-white/70">tsaiiuo1@gmail.com</div>
										</a>
										<a href="https://github.com/tsaiiuo" target="_blank" rel="noreferrer" className="rounded-2xl border border-[color:var(--line)] bg-white/80 px-5 py-4 text-sm">
											GitHub
											<div className="mt-1 font-[family:var(--font-ibm-plex-mono)] text-xs text-[color:var(--muted)]">github.com/tsaiiuo</div>
										</a>
										<a href="https://www.linkedin.com/in/min-huan-tsai-410139227/" target="_blank" rel="noreferrer" className="rounded-2xl border border-[color:var(--line)] bg-white/80 px-5 py-4 text-sm">
											LinkedIn
											<div className="mt-1 font-[family:var(--font-ibm-plex-mono)] text-xs text-[color:var(--muted)]">professional profile</div>
										</a>
										<div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--accent-soft)] px-5 py-4 text-sm">
											Base
											<div className="mt-1 font-[family:var(--font-ibm-plex-mono)] text-xs text-[color:var(--muted)]">Taiwan, open to backend and data roles</div>
										</div>
									</div>
								</div>

								<div className="space-y-6">
									<div className="space-y-4">
										<SectionHeader title="At a glance" />
										<div className="grid grid-cols-2 gap-3">
											{highlights.map((item) => (
												<div key={item.label} className="rounded-2xl border border-[color:var(--line)] bg-white/70 p-4">
													<div className="text-2xl font-semibold tracking-[-0.04em]">{item.value}</div>
													<p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{item.label}</p>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</section>

						<section className="space-y-6 p-6 sm:p-8 lg:p-10">
							<div id="overview" className="scroll-mt-24 rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6">
							<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
								<div className="max-w-2xl">
									<p className="font-[family:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.24em] text-[color:var(--accent-warm)]">
										What I build
									</p>
									<h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">I build data products and software that hold up in production.</h2>
								</div>
								<p className="max-w-xl text-sm leading-7 text-[color:var(--muted)]">
									NCKU EE-CSIE master&apos;s student with internship experience at TSMC, GoFreight, and QuickClick. My work spans data engineering,
									backend systems, and applied AI, with four international publications, three internships, and a TSMC hackathon win.
								</p>
							</div>
						</div>

						<div id="experience" className="scroll-mt-24 space-y-4">
							<SectionHeader title="Experience" />
							<div className="space-y-4">
								{experiences.map((experience) => (
									<article key={`${experience.company}-${experience.role}`} className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/70 p-6">
										<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
											<div>
												<h3 className="text-2xl font-semibold tracking-[-0.04em]">{experience.role}</h3>
												<p className="mt-1 text-sm uppercase tracking-[0.16em] text-[color:var(--accent)]">{experience.company}</p>
											</div>
											<p className="font-[family:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
												{experience.period}
											</p>
										</div>
										<p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--muted)]">{experience.summary}</p>
										<div className="mt-5 grid gap-3 md:grid-cols-3">
											{experience.bullets.map((bullet) => (
												<div key={bullet} className="rounded-2xl bg-[color:var(--accent-soft)] px-4 py-3 text-sm leading-6">
													{bullet}
												</div>
											))}
										</div>
									</article>
								))}
							</div>
						</div>

						<div id="publications" className="scroll-mt-24 space-y-4">
							<SectionHeader title="Publications" />
							<div className="grid gap-4">
								{publications.map((publication) => (
									<article key={publication.title} className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/70 p-6">
										<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
											<div className="max-w-3xl">
												<h3 className="text-xl font-semibold leading-8 tracking-[-0.03em]">{publication.title}</h3>
												<p className="mt-2 text-sm uppercase tracking-[0.16em] text-[color:var(--accent)]">{publication.venue}</p>
											</div>
											<p className="font-[family:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
												{publication.role}
											</p>
										</div>
									</article>
								))}
							</div>
						</div>

						<div id="projects" className="scroll-mt-24 space-y-4">
							<SectionHeader title="Projects" />
							<div className="grid gap-4 xl:grid-cols-2">
								{projects.map((project) => (
									<article key={project.name} className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/70 p-6">
										<p className="font-[family:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.18em] text-[color:var(--accent-warm)]">
											{project.meta}
										</p>
										<h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{project.name}</h3>
										<p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{project.description}</p>
										<p className="mt-4 text-sm text-[color:var(--foreground)]">{project.stack}</p>
									</article>
								))}
							</div>
						</div>

						<div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
							<div id="skills" className="scroll-mt-24 space-y-4">
								<SectionHeader title="Core stack" />
								<div className="grid gap-4 md:grid-cols-2">
									{skillGroups.map((group) => (
										<div key={group.title} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
											<h3 className="text-lg font-medium">{group.title}</h3>
											<div className="mt-3 flex flex-wrap gap-2">
												{group.items.map((item) => (
													<span key={item} className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-sm text-[color:var(--muted)]">
														{item}
													</span>
												))}
											</div>
										</div>
									))}
								</div>
							</div>

							<div id="education" className="scroll-mt-24 space-y-4 rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--foreground)] p-6 text-white">
								<div>
									<p className="font-[family:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.2em] text-white/60">Education</p>
									<h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">NCKU EE-CSIE</h2>
									<p className="mt-2 text-sm leading-7 text-white/72">Master of Electrical Engineering-CSIE, GPA 4.25/4.3, expected June 2026.</p>
								</div>
								<div className="h-px bg-white/10" />
								<div>
									<h3 className="text-lg font-medium">NCCU MIS</h3>
									<p className="mt-2 text-sm leading-7 text-white/72">Bachelor of Management Information Systems, GPA 3.7/4.3.</p>
								</div>
								<div className="h-px bg-white/10" />
								<div>
									<h3 className="text-lg font-medium">Extra signal</h3>
									<p className="mt-2 text-sm leading-7 text-white/72">
										Linux Kernel Internals by Jserv (A+), Algorithms (A+), Data Structures (A+), TOEIC 880, plus open-source contribution to linmo.
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
				</div>
			</div>
		</main>
	);
}
