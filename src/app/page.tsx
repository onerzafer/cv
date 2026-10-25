import React from 'react';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { GlobeEuropeAfricaIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { CallToAction } from '@/components/call-to-action';
import Image from 'next/image';

export const metadata = {
  title: 'Öner Zafer - Engineering Stream Head & Principal Engineer',
  description:
    'Principal engineer and stream head leading AI-native product teams. Shipped a new regulated product end to end with AI agents, and trained a fintech to work agent-first.',
  keywords:
    'engineering leadership, stream head, principal engineer, agentic development, AI-native engineering, React, Next.js, TypeScript, fintech, remote work',
  authors: {
    name: 'Öner Zafer',
  },
};

const keySkills = [
  'Agentic Development',
  'Spec-Driven Development',
  'Engineering Leadership',
  'React',
  'Next.js',
  'TypeScript',
  'Ruby on Rails',
  'GraphQL',
  'MCP & Agent Tooling',
  'Temporal Workflows',
  'Regulated Fintech',
  'Remote Work',
];

const skills = [
  'Coding agents (Junie, Zed, CLI agents)',
  'Context files & agent skills',
  'Agent review workflows',
  'On-device & hosted LLMs',
  'Tool use & memory (pgvector)',
  'Node.js',
  'Sorbet / Packwerk',
  'Supabase / Postgres',
  'Docker',
  'CI/CD & SonarQube',
  'Sentry / New Relic',
  'Jest & Playwright',
  'Tailwind CSS',
  'Security & GDPR',
  'Team Leadership',
  'Mentoring',
  'Hiring & Onboarding',
  'Technical Strategy',
];

const links = [
  {
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/öner-z-3a4b6632',
  },
  {
    title: 'Medium',
    url: 'https://medium.com/@onerzafer',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/onerzafer',
  },
];

const openFor = ['Full-time', 'Part-time', 'Contract', 'Consulting'];

const highlights = [
  {
    title: 'A new product, end to end with AI',
    text: 'A company experiment: one developer, with AI support, owns a new regulated product. It started from a kickoff and scribbles on a whiteboard. I designed the UX and UI, worked out the integration with a partner, and designed single sign-on between the two companies so customers need no extra login. The product is being prepared for launch. As a process the solo model failed, because the knowledge sat in one head and the work could not be repeated or parallelized, even with a knowledge hub. So I rolled out a shared SDLC and formed teams.',
  },
  {
    title: 'Worklab: the software factory I built to ship it',
    text: 'A folder-based kanban in Obsidian where each folder is a pipeline stage that runs a headless coding agent. Jira tickets are ingested, enriched, planned and split, built and tested, then land in my review with evidence such as screenshots. On my feedback it opens PRs and babysits them and the tickets. Every decision, plan and spec is kept as markdown, so the work is auditable. Hard rule: a PR merges only with green tests and a review with no open questions. A final stage quizzes me on what was built, so I can take over or maintain it at any time. Every night it reviews itself: it measures token cost, time to deployment and other KPIs, adjusts its own setup, and measures again the next evening. That cut token spend, swapped models, removed unneeded stages, improved the tests and shortened the wait on my desk. During the day it records my knowledge gaps and aims the quizzes at them, and it derives product facts into a wiki so every ticket can find its context. Agents message me, I message them, and they message each other to collaborate.',
  },
  {
    title: 'AI-native transformation',
    text: 'I advocated agent-first engineering, trained the company on it, and rolled out the AI-native SDLC from Anthropic to the teams: intent and spec first, then plans, then Jira tickets that agents keep up to date, with every artifact reviewed by a human. Five developers work this way. It turned solo work that stayed on a laptop and surfaced as huge PRs into shared work with small, flowing reviews, because the context is spread across the team and reviewers pair up with real knowledge of the change. The result is a repeatable, auditable practice that fits DORA and BaFin expectations. Shared agent guidance, workflows, skills and review rules live in the frontend repository, and a PR highlighter plugin I built speeds up review, the new bottleneck. It classifies each PR by impact radius, danger, customer exposure and money relevance, so the depth of review fits the risk: a quick scan of the key highlights or a full read.',
  },
  {
    title: 'Three products, three teams',
    text: 'As one of two stream heads I drive three products, including a back-office platform, and manage the teams behind them.',
  },
];

const experience = [
  {
    company: 'Whitebox GmbH',
    role: 'Stream Head',
    period: 'Aug 2026 to now',
    text: 'One of two stream heads. Driving three products and managing three teams in an AI-native way of working.',
  },
  {
    company: 'Whitebox GmbH',
    role: 'Principal Engineer',
    period: 'Jun 2023 to Aug 2026',
    text: 'Led the team technically, mentored, ran the agile ceremonies and the migration of a legacy system to modern React. Top frontend contributor for three years (800+ commits), release owner, and quality-gate builder: lint and naming rules, SonarQube as a breaking CI step, runtime env config, SCSS removal. Customer onboarding, identity verification and payment flows, and a new product line.',
  },
  {
    company: 'AgyleOS GmbH, Berlin',
    role: 'Technical Lead and Co-founder',
    period: 'Jan 2020 to May 2023',
    text: 'Co-founded a startup. Architected and built the frontend of a large-scale React HR application, ETL and data visualization on Airbyte and Cube.js with a self-developed formula language, and an SVG organigram builder. Built the team.',
  },
  {
    company: 'Movingimage, ATU, Shoop (Berlin)',
    role: 'Senior Frontend Engineer, Head of Frontend',
    period: 'Oct 2016 to Jan 2020',
    text: 'Video content management system and embeddable React video player at Movingimage, a car-part ordering app at ATU, and a web and mobile app plus a team of 5 as Head of Frontend at Shoop.',
  },
  {
    company: 'Yemeksepeti (Delivery Hero), IKON Interactive',
    role: 'Senior Software Developer',
    period: 'Sep 2012 to Oct 2016',
    text: 'The main food ordering app and a gamification panel, and smart TV, set-top-box and mobile apps for a major streaming service.',
  },
  {
    company: 'Boğaziçi University, freelance',
    role: 'Web developer and designer',
    period: '2002 to 2012',
    text: 'Dozens of websites on a self-built CMS and Drupal. M.S. in Software Engineering and B.Sc. in Physics, Boğaziçi University.',
  },
];

const writing = [
  {
    title: 'Understanding Micro Frontends',
    text: 'Over 50K reads on Hackernoon, and a talk at BerlinJS (around 100 attendees, 2019). Also a Redux-with-RxJS series.',
    url: 'https://hackernoon.com/understanding-micro-frontends-b1c11585a297',
  },
];

const projects = [
  {
    title: 'Sifir AI',
    text: 'A side venture: make it a product, or fail and learn. An AI agency that ran the whole website-building workflow by talking to the customer over chat or voice, on durable Temporal agents (concierge, designer, coder) in sandboxed containers. Research agents helped me turn what an award jury rewards into a rubric that estimates a site\'s value, so each request was classified by tone and industry norms and held to a "$10K look". I turned design principles from architects and industrial designers, including space as a design element, into scoring formulas and calibrated them on over 1,000 award-winning sites until they matched my taste. Automated loops improved prompts and agent design until a cheap model satisfied that taste about 80% of the time, and controlled experiments (one agent or separate designer and coder, visual measurement, blind visual tests) verified or falsified each hypothesis. Bigger players moved faster than a side project could, so I shut it down and kept the learnings.',
  },
  {
    title: 'Composer',
    text: 'Born from Sifir. Agents may only pick components from a catalog and write JSON, and Composer compiles it to a custom-looking site, replacing browser testing with code-level JSON verification. Generated sites scored at $5K+ on my rubric, at roughly a dollar or less per site. MCP server, drift detection and a skill pack.',
    url: 'https://github.com/onerzafer/composer',
  },
  {
    title: 'Kingdom',
    text: 'A medieval strategy and tactics game where you command armies of thousands of simulated soldiers by free text or voice instead of a command list. A language model turns orders and tone into actions; the world and battle simulation stay deterministic code, and the model is never in the simulation loop.',
  },
  {
    title: 'Zero to Agentic Workflows',
    text: 'A hands-on course that takes people from a first system prompt to autonomous agent loops.',
    url: 'https://github.com/onerzafer/zero-to-agentic-workflows',
  },
];

const Home = () => {
  return (
    <>
      <div className="dark:bg-gray-900 bg-gray-100 min-h-screen pb-24 text-slate-800 dark:text-white transition ease-in-out duration-500">
        <div className="container mx-auto max-w-2xl space-y-6 px-6">
          <div className="h-auto aspect-[2] overflow-hidden -mb-6">
            <Image
              src="/oner-light_small.png"
              alt="Öner Zafer"
              className="w-full aspect-[2] object-contain dark:invert"
              width={2048}
              height={2048}
            />
          </div>
          <div className="relative border-t border-black/10 dark:border-white/10">
            <div className="flex align-middle justify-end gap-2 absolute -top-10 left-0 px-2 font-light text-xs text-slate-500">
              <DarkModeToggle />
            </div>
            <div className="flex align-middle justify-end gap-2 absolute -top-10 right-0 px-2 font-light text-xs text-slate-500">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded hover:bg-slate-300 hover:shadow-2xl bg-slate-600 text-white shadow transition"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="flex align-middle justify-center gap-2 h-40">
              <div className="pt-10 pb-6 flex-1">
                <h1 className="text-3xl font-bold">Öner Zafer</h1>
                <p className="text-lg italic">
                  Stream Head &amp; Principal Engineer
                </p>
                <p className="text-lg flex align-middle justify-start gap-1 text-slate-500">
                  <MapPinIcon className="h5- w-5" /> Istanbul, Turkey
                </p>
                <p className="text-lg flex align-middle justify-start gap-1">
                  <GlobeEuropeAfricaIcon className="h5- w-5" /> Open for remote
                </p>
              </div>
              <div className="flex justify-center items-center h-full gap-1">
                <CallToAction subject="Can we get your CV?">
                  Ask for CV
                </CallToAction>
                <CallToAction subject="We need you!" primary>
                  Hire me!
                </CallToAction>
              </div>
            </div>
          </div>
          <div className="flex align-middle justify-start gap-1 flex-wrap">
            {keySkills.map((skill) => (
              <div
                key={skill}
                className="bg-emerald-500 text-white font-light py-1 px-2 rounded"
              >
                {skill}
              </div>
            ))}
          </div>
          <div className="flex align-middle justify-start gap-1 flex-wrap">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-slate-300 text-slate-600 dark:bg-slate-600 dark:text-slate-300 font-light py-1 px-2 rounded"
              >
                {skill}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p>
              I have been building for the web for more than twenty years, since
              2002, mostly on the frontend, and I have not written a line of
              code by hand for the past year. I work agent-first: I write the
              specs, the context and the guardrails, and coding agents do the
              typing. It changed what one engineer can ship, and what a team can
              be.
            </p>
            <p>
              At Whitebox, a regulated German fintech, I joined as principal
              engineer in 2023 and became stream head in August 2026. I ran the
              company experiment of one developer owning a new product end to
              end with AI support. It worked, so I onboarded more developers,
              formed teams and spread the practice. Today I drive three products
              and manage three teams.
            </p>
            <p>
              I also build my own agent systems: a multi-tenant agent platform,
              a compiler that turns LLM-written specs into code, and a course on
              agentic workflows.
            </p>
            <p>
              If you want to move your engineering to an AI-native way of
              working, or need someone who can lead teams and still ship,
              let&#39;s connect.
            </p>
          </div>
          <div className="rounded-lg p-6 bg-slate-100 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">Highlights</h2>
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item.title}>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg p-6 bg-slate-100 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <ul className="space-y-4">
              {experience.map((item) => (
                <li key={item.role}>
                  <h3 className="font-bold">
                    {item.role}, {item.company}{' '}
                    <span className="font-light text-slate-500">
                      {item.period}
                    </span>
                  </h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg p-6 bg-slate-100 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">Own projects</h2>
            <ul className="space-y-4">
              {projects.map((item) => (
                <li key={item.title}>
                  <h3 className="font-bold">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg p-6 bg-slate-100 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">Writing &amp; talks</h2>
            <ul className="space-y-4">
              {writing.map((item) => (
                <li key={item.title}>
                  <h3 className="font-bold">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg p-6 bg-slate-50 dark:bg-slate-600">
            <h2 className="text-xl font-bold mb-4">I&#39;m open for</h2>
            <div className="flex align-middle justify-start gap-1 flex-wrap">
              {openFor.map((open) => (
                <div
                  key={open}
                  className="bg-blue-500 text-white font-light py-1 px-2 rounded"
                >
                  {open}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg p-6 bg-slate-100 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">How do I work?</h2>
            <div>
              I work fully remote, with European teams and time zones, and I
              know German work culture and regulation from years at a German
              company. I invoice monthly through my own company in Turkey, based
              on hours worked, up to 40 hours a week. Hands-on or leading, both
              fine.
            </div>
            <h2 className="text-xl font-bold mb-4 mt-6">Benefits</h2>
            <ul className="list-disc pl-6">
              <li>Less paper work for you</li>
              <li>Shorter notice period</li>
              <li>More flexibility</li>
              <li>Less risk</li>
              <li>Less cost</li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4 pt-12">
            Need an expert? I&#39;m available immediately!
          </h2>
          <div className="flex justify-start items-center h-full gap-1">
            <CallToAction subject="We need you!" primary>
              Hire me!
            </CallToAction>
            <CallToAction subject="Can we get your CV?">
              Ask for the CV
            </CallToAction>
            <CallToAction subject="Can we get your rates?">
              Ask for a quote
            </CallToAction>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
