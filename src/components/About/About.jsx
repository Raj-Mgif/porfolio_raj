import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { ArrowUpRight } from 'lucide-react';
import styles from './About.module.css';
import { personal, stats } from '../../data/portfolio';

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    // Reveal text
    if (textRef.current) {
      const split = new SplitType(textRef.current, { types: 'words' });
      gsap.from(split.words, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }

    // Number counting animation
    countersRef.current.forEach((counter, i) => {
      if (counter) {
        const target = parseFloat(counter.getAttribute('data-target'));
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          ease: 'power3.out',
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`section section-cream`} id="about">
      <div className={`${styles.container} container`}>
        <div className={styles.leftCol}>
          <span className="label">ABOUT</span>
          <h2 ref={textRef} className={styles.heading}>
            <span className={styles.italic}>I build backends</span><br />
            that don't break.
          </h2>
          
          <div className={styles.bio}>
            {personal.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          
          <a 
            href={personal.resume} 
            download="Raj_Kumar_Mishra_Resume.pdf"
            className={styles.resumeFrameWrapper}
          >
            <div className={styles.resumeOverlay}>
              <span className={styles.overlayText}>Download Resume &rarr;</span>
            </div>
            <iframe 
              src={`${personal.resume}#view=FitH&toolbar=0&navpanes=0`} 
              className={styles.resumeFrame} 
              title="Resume Preview"
              tabIndex="-1"
            />
          </a>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <div className={styles.statValue}>
                  <span 
                    ref={el => countersRef.current[idx] = el}
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span className={styles.suffix}>{stat.suffix}</span>
                </div>
                <div className={styles.statLabelWrapper}>
                  <div className={styles.statLabel}>{stat.label}</div>
                  {stat.link && (
                    <a 
                      href={stat.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.statLinkBtn}
                      title={`View ${stat.label}`}
                    >
                      View <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
