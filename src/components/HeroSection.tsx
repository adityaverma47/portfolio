import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from '@phosphor-icons/react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate headline
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Animate subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // Animate CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    // Animate Spline
    tl.fromTo(
      splineRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 spotlight" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating orbs */}
      <div className="hero-orb absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="hero-orb absolute bottom-1/4 right-1/3 w-96 h-96 bg-glow-secondary/10 rounded-full blur-3xl" />
      <div className="hero-orb absolute top-1/2 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight opacity-0"
            >
              Hi, I'm{' '}
              <span className="gradient-text glow-text">Aditya</span>
              <br />
              <span className="text-foreground">Web Developer</span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0"
            >
              Crafting immersive digital experiences with cutting-edge technologies.
              Transforming ideas into beautiful, functional web applications.
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-primary animate-pulse-glow"
              >
                Hire Me
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-foreground font-semibold rounded-full transition-all duration-300 hover:bg-secondary"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Right - Spline 3D */}
          <div
            ref={splineRef}
            className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] lg:h-[600px] opacity-0"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <iframe
                src="https://my.spline.design/robotfollowcursorforlandingpagemc-QirHRIsRhgnUTQXixP2Dn0GE/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="pointer-events-auto scale-[1.6]"
                title="3D Robot Model"
                loading="lazy"
              />
            </div>
            {/* Gradient overlay to hide watermark */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            {/* Specific mask for Spline watermark in bottom right */}
            <div className="absolute bottom-0 right-0 w-40 h-16 bg-background pointer-events-auto cursor-default z-20" />
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection;
