import React, { useRef } from 'react';
import styles from './Hero.module.css';
import HeroCanvas from './HeroCanvas';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    let split;
    if (headlineRef.current) {
      split = new SplitType(headlineRef.current, { types: 'words' });
      gsap.from(split.words, {
        y: '100%',
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.3
      });
    }

    gsap.from([bodyRef.current, ctaRef.current], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.9
    });

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });

    return () => {
      if (split) split.revert();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.hero} id="home">
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <span className={`${styles.label} label`}>FULL STACK DEVELOPER | ML DEVELOPER</span>
          
          <h1 ref={headlineRef} className={styles.headline}>
            <span className={styles.italicWord}>Crafting</span><br />
            <span className={styles.italicWord}>Scalable</span><br />
            <span className={styles.accentWord}>Systems.</span>
          </h1>
          
          <p ref={bodyRef} className={styles.body}>
            Backend-focused Full Stack Developer passionate about building 
            scalable web applications, secure authentication systems, and 
            high-performance digital products.
          </p>
          
          <div ref={ctaRef} className={styles.ctaRow}>
            <a href="#work" className={styles.primaryBtn}>
              View Work &rarr;
            </a>
            <a href="https://github.com/Raj-Mgif" target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>
              GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        
        <div className={styles.canvasContainer}>
          <HeroCanvas />
        </div>
      </div>
      
      <div className={styles.scrollIndicatorWrapper}>
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>SCROLL</span>
          <div ref={scrollIndicatorRef} className={styles.scrollDot}></div>
        </div>
      </div>
    </section>
  );
}
