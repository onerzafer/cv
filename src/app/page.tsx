import React from 'react';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { GlobeEuropeAfricaIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { CallToAction } from '@/components/call-to-action';
import Image from 'next/image';

export const metadata = {
  title: 'Öner Zafer - Senior React Engineer',
  description:
    'Experienced senior React engineer with expertise in frontend development, TDD, and agile software development.',
  keywords:
    'React, frontend engineer, TDD, agile software development, remote work',
  authors: {
    name: 'Öner Zafer',
  },
};

const keySkills = [
  'React',
  'JavaScript',
  'TypeScript',
  'Redux',
  'CSS3',
  'HTML5',
  'Tailwind CSS',
  'GraphQL',
  'RESTful APIs',
  'Git',
  'Unit Testing (Jest, Enzyme, Testing Library)',
  'Responsive Design',
  'Agile Development',
  'CI/CD',
  'Remote Work',
];

const skills = [
  'Angular',
  'Vue',
  'Next.js',
  'React Native',
  'Webpack',
  'Babel',
  'Sass/Less',
  'Performance Optimization',
  'Code Review',
  'DevOps',
  'Microservices',
  'Serverless',
  'Cloud Platforms (AWS, Azure)',
  'Database Systems (SQL, NoSQL)',
  'Containerization (Docker, Kubernetes)',
  'Security Best Practices',
  'Design Patterns',
  'Architectural Principles',
  'Technical Leadership',
  'Team Collaboration',
  'Problem Solving',
  'Communication Skills',
  'Agile Project Management',
  'Client Interaction',
  'Documentation',
  'Presentation Skills',
  'Mentoring',
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
                <p className="text-lg italic">Senior React Engineer</p>
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
                  Hire me
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
              Over the course of nearly 20 years, I have amassed extensive
              experience as an engineer. Throughout this period, I witnessed the
              emergence of frontend frameworks and had the opportunity to work
              with numerous ones. Specifically, I have been serving as a
              Frontend engineer for the past 11 years, with a particular focus
              on React since 2018. My enthusiasm for React remains unwavering,
              although I am proficient in other frameworks as well.
            </p>
            <p>
              Throughout my career, I have delivered successful projects while
              working with diverse companies, teams, and roles. Notable
              experiences include contributions to popular streaming services,
              food delivery platforms, e-commerce solutions, and video content
              management systems. Additionally, I co-founded and served as a
              tech lead for a startup, gaining valuable insights into the entire
              startup journey.
            </p>
            <p>
              My proficiency in web development and frontend engineering allows
              me to develop robust and user-friendly applications, consistently
              meeting project deadlines. Alongside my technical skills, I
              possess strong mentorship capabilities, guiding and empowering
              junior engineers for collective success.
            </p>
            <p>
              Having excelled in remote work environments, I am adept at
              leveraging communication and collaboration tools to ensure
              seamless coordination. I thrive in inclusive teams and am
              committed to creating positive work environments.
            </p>
            <p>
              If you are a forward-thinking company seeking a senior or lead
              React engineer for remote work, let&#39;s connect. Together, we
              can create exceptional user experiences and drive technological
              advancements.
            </p>
            <p>
              I am excited to contribute my skills to your team&#39;s success.
            </p>
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
            <h2 className="text-xl font-bold mb-4">What do I provide?</h2>
            <ul className="list-decimal pl-6">
              <li>
                Provide expert guidance and mentorship in React and related
                technologies.
              </li>
              <li>
                Lead and inspire the team, fostering collaboration and high
                morale.
              </li>
              <li>
                Take ownership of projects and ensure their successful
                execution.
              </li>
              <li>
                Contribute to architectural design for scalable and maintainable
                solutions.
              </li>
              <li>
                Identify and resolve complex technical challenges efficiently.
              </li>
              <li>
                Drive process improvement initiatives for increased efficiency.
              </li>
              <li>
                Share knowledge and mentor junior developers for collective
                growth.
              </li>
              <li>
                Stay updated with the latest React trends to introduce new ideas
                and techniques.
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-6 bg-slate-100 dark:bg-slate-800">
            <h2 className="text-xl font-bold mb-4">How do I work?</h2>
            <div>
              I have a company in Turkey, and I can work as a B2B contractor.
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
              Ask for CV
            </CallToAction>
            <CallToAction subject="Can we get your rates?">
              Ask for quote
            </CallToAction>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
