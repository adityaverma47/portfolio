import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';

export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tech: string[];
    features?: string[];
    challenges?: string;
    liveLink?: string;
    repoLink?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'FinAcc Dashboard',
        description: 'Modern accounting platform with real-time analytics and financial insights.',
        longDescription: 'FinAcc Dashboard is a comprehensive financial management tool designed for businesses to track their expenses, income, and overall financial health in real-time. It features interactive charts, customizable reports, and multi-user support.',
        image: project1,
        tech: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
        features: [
            'Real-time financial analytics dashboard',
            'Expense tracking and categorization',
            'Invoice generation and management',
            'Multi-currency support'
        ],
        liveLink: 'https://finaccoutsourcings.com',
        repoLink: 'https://github.com/example/finacc'
    },
    {
        id: 2,
        title: 'Prana Healthcare',
        description: 'Healthcare management system with patient care and operational efficiency.',
        longDescription: 'Prana Healthcare is a digital ecosystem for hospitals and clinics. It streamlines patient appointments, medical records management, and doctor scheduling, improving the overall efficiency of healthcare providers.',
        image: project2,
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        features: [
            'Patient appointment scheduling',
            'Electronic Health Records (EHR)',
            'Doctor availability management',
            'Telemedicine integration'
        ],
        liveLink: 'https://pranahealthcare.vercel.app/',
        repoLink: 'https://github.com/example/prana'
    },
    {
        id: 3,
        title: 'Zyero Lead',
        description: 'AI-powered lead generation platform for B2B businesses.',
        longDescription: 'Zyero Lead is an intelligent lead generation and management platform that helps B2B companies identify, qualify, and engage with potential clients. It uses advanced algorithms to scrape and analyze data, providing actionable insights for sales teams.',
        image: project3,
        tech: ['React', 'Python', 'Django', 'PostgreSQL'],
        features: [
            'AI-driven lead scoring',
            'Automated email outreach',
            'CRM integration (HubSpot, Salesforce)',
            'Real-time analytics dashboard'
        ],
        liveLink: 'https://zyerolead.com/',
        repoLink: 'https://github.com/example/zyerolead'
    },
];
