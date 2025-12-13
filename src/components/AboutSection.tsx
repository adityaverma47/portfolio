import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.png';
import {
  Code,
  PaintBrush,
  Lightning,
  Atom,
  FigmaLogo,
  GithubLogo,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML', icon: Code, color: '#E34F26' },
  { name: 'CSS', icon: PaintBrush, color: '#1572B6' },
  { name: 'JavaScript', icon: Lightning, color: '#F7DF1E' },
  { name: 'React', icon: Atom, color: '#61DAFB' },
  { name: 'Figma', icon: FigmaLogo, color: '#F24E1E' },
  { name: 'GitHub', icon: GithubLogo, color: '#FFFFFF' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skills stagger animation
      gsap.fromTo(
        '.skill-item',
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="profile-glow">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass-strong p-2">
                  <img
                    src={profileImage}
                    alt="Aditya - Web Developer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-primary/30 rounded-full animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/20 rounded-full" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a passionate web developer with expertise in creating modern, responsive,
              and user-friendly web applications. With a strong foundation in frontend
              technologies and a keen eye for design, I bring ideas to life through clean
              code and stunning visuals.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              My journey in web development started with curiosity and has evolved into a
              dedication to crafting exceptional digital experiences. I stay updated with
              the latest trends and technologies to deliver cutting-edge solutions.
            </p>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Tech Stack</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-item skill-icon flex flex-col items-center gap-2 p-4 glass rounded-xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <skill.icon size={32} weight="light" style={{ color: skill.color }} />
                    <span className="text-xs text-muted-foreground">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
