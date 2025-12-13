import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );

    // Animate progress bar
    tl.to(
      progressRef.current,
      {
        width: '100%',
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100);
          setPercent(progress);
        }
      },
      '-=0.3'
    );

    // Fade out preloader
    tl.to(
      preloaderRef.current,
      {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
          onComplete();
        }
      },
      '+=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Background orbs */}
      <div className="orb w-96 h-96 bg-primary -top-20 -left-20" />
      <div className="orb w-64 h-64 bg-glow-secondary bottom-20 right-20" style={{ animationDelay: '2s' }} />

      <div ref={logoRef} className="flex flex-col items-center gap-6 z-10">
        {/* Logo */}
        <div className="relative">
          <span className="text-5xl md:text-7xl font-bold tracking-tighter">
            <span className="text-foreground">UI</span>
            <span className="gradient-text">Wizard</span>
          </span>
          <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full -z-10" />
        </div>

        {/* Progress container */}
        <div className="progress-container">
          <div ref={progressRef} className="progress-bar" />
        </div>

        {/* Percentage */}
        <span ref={percentRef} className="text-muted-foreground text-sm font-medium tracking-wider">
          Loading {percent}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
