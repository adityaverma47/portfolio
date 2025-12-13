import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  Heart,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', icon: GithubLogo, href: 'https://github.com/bugSlayer555/' },
  { name: 'LinkedIn', icon: LinkedinLogo, href: 'https://www.linkedin.com/in/adityaverma47' },
  { name: 'Twitter', icon: TwitterLogo, href: '#' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer animation
      gsap.fromTo(
        '.footer-content',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Particle animation
      const particles = particlesRef.current?.querySelectorAll('.particle');
      particles?.forEach((particle, i) => {
        gsap.to(particle, {
          y: -100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: i * 0.5,
          ease: 'power1.out',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 overflow-hidden border-t border-border/30"
    >
      {/* Background particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-primary/50"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Glow orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="footer-content">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo and Tagline */}
            <div className="space-y-4">
              <a href="#home" className="inline-block">
                <span className="text-2xl font-bold tracking-tighter">
                  <span className="text-foreground">UI</span>
                  <span className="gradient-text">Wizard</span>
                </span>
              </a>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                Crafting immersive digital experiences with cutting-edge technologies.
                Focused on performance, accessibility, and modern design.
              </p>
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary-sm transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon size={20} weight="light" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-foreground">Sitemap</h4>
                <ul className="space-y-2">
                  {footerLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-foreground">Services</h4>
                <ul className="space-y-2">
                  {['Web Development', 'UI/UX Design', '3D Visuals', 'Consulting'].map((item) => (
                    <li key={item} className="text-muted-foreground text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-foreground">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-muted-foreground text-sm">adityaverma4769@gmail.com</li>
                  <li className="text-muted-foreground text-sm">+91 7905902205</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
              © 2024 Made with
              <Heart size={16} weight="fill" className="text-primary animate-pulse" />
              by Aditya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
