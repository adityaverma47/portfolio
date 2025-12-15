
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Certificate } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    {
        id: 1,
        degree: 'Bachelor of Technology in Computer Science',
        institution: 'Lovely Professional University',
        year: '2022 - 2026',
        description: 'Specialized in Cloud Computing and DevOps. Gaining expertise in modern cloud infrastructure, containerization, CI/CD pipelines, scalable application deployment, and full-stack web development.',
        icon: GraduationCap,
    },
    {
        id: 2,
        degree: 'AWS Certification',
        institution: 'Amazon Web Services',
        year: '2024',
        description: '',
        icon: Certificate,
    },
    {
        id: 3,
        degree: 'Human Computer Interaction',
        institution: 'NPTEL',
        year: 'January 2025',
        description: 'Professional certification in user interface design principles, usability testing, and interaction design methodologies.',
        icon: BookOpen,
    },
];

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Timeline items animation
            const items = timelineRef.current?.querySelectorAll('.education-item');
            items?.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="education"
            ref={sectionRef}
            className="section-padding relative overflow-hidden bg-secondary/30"
        >
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Heading */}
                <div ref={headingRef} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        My academic journey and professional certifications.
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

                    {educationData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`education-item relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Content */}
                            <div className="flex-1 md:w-1/2">
                                <div className="glass p-6 rounded-2xl hover:border-primary/50 transition-colors duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <item.icon size={24} className="text-primary" />
                                        <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                                            {item.year}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{item.degree}</h3>
                                    <p className="text-foreground font-medium mb-2">{item.institution}</p>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>

                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full transform -translate-x-[7px] md:-translate-x-1/2 mt-6 z-10" />

                            {/* Empty Space for alternate side */}
                            <div className="hidden md:block flex-1 md:w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
