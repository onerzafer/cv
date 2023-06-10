import React from 'react';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { HireMe } from '@/components/hire-me';
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

const skills = [
  'React',
  'JavaScript',
  'TypeScript',
  'Redux',
  'GraphQL',
  'Next.js',
  'React Native',
  'Webpack',
  'Babel',
  'HTML5',
  'CSS3',
  'Sass/Less',
  'RESTful APIs',
  'Git',
  'Unit Testing (Jest, Enzyme, Testing Library)',
  'Responsive Design',
  'Agile Development',
  'Performance Optimization',
  'Code Review',
  'CI/CD',
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
  'Remote Work',
  'Coaching',
  'Interviewing',
  'Recruiting',
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

const openFor = [
  'Full-time',
  'Part-time',
  'Contract',
  'Consulting',
  'Mentoring',
  'Coaching',
  'Interviewing',
  'Recruiting',
];

const Home = () => {
  return (
    <>
      <div className="dark:bg-gray-900 bg-gray-100 min-h-screen pb-24 text-slate-800 dark:text-white transition ease-in-out duration-500">
        <div className="container mx-auto max-w-2xl space-y-6 px-6">
          <div className="h-[30rem] overflow-hidden -mb-6">
            <Image
              src="/oner-light.png"
              alt="Öner Zafer"
              className="w-full object-contain -mb-6 dark:invert"
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
            <div className="flex align-middle justify-center gap-2 h-36">
              <div className="pt-10 pb-6 flex-1">
                <h1 className="text-3xl font-bold">Öner Zafer</h1>
                <p className="text-lg opacity-70">Senior React Engineer</p>
                <p className="text-lg flex align-middle justify-start gap-1">
                  <MapPinIcon className="h5- w-5" /> Istanbul, Turkey
                </p>
              </div>
              <div className="flex justify-center items-center h-full">
                <HireMe />
              </div>
            </div>
          </div>
          <div className="flex align-middle justify-start gap-1 flex-wrap">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-emerald-500 text-white font-light py-1 px-2 rounded"
              >
                {skill}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p>
              With nearly 20 years of experience in frontend engineering, I
              bring a wealth of knowledge in React, TDD, and agile software
              development. As a senior or lead React engineer, I am seeking
              fully remote positions where I can utilize my expertise to drive
              impactful projects.
            </p>
            <p>
              My proficiency in React allows me to develop robust and
              user-friendly applications, consistently meeting project
              deadlines. Alongside my technical skills, I possess strong
              mentorship capabilities, guiding and empowering junior engineers
              for collective success.
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
              I am excited to contribute my skills and leadership to your
              team&#39;s success.
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
            <ul className="list-disc pl-6">
              <li>
                I prefer remote work as it allows for a healthy work-life
                balance and maximizes my productivity.
              </li>
              <li>
                I operate as a B2B contractor through my limited liability
                company in Turkey.
              </li>
              <li>
                Working remotely, I have experience in leveraging communication
                and collaboration tools effectively.
              </li>
              <li>
                Through my limited liability company, I can invoice the company
                based on B2B contractor agreements.
              </li>
              <li>
                This arrangement provides flexibility, efficiency, and
                compliance with local regulations.
              </li>
              <li>
                It streamlines administrative processes and ensures professional
                invoicing and clear financial records.
              </li>
            </ul>
          </div>
          <h2 className="text-3xl font-bold mb-4 pt-12">
            I&#39;m available immediately!
          </h2>
          <HireMe />
        </div>
      </div>
    </>
  );
};

export default Home;
