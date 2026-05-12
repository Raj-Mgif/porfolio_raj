import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Skills.module.css';
import { skills } from '../../data/portfolio';

// Flatten all skills into one continuous array for the marquee
const ALL_SKILLS = Object.values(skills).flat();

// Experience mapping (realistic estimates for CSE student)
const skillExperience = {
  "React": 3, "Node.js": 3, "Express": 3, "MongoDB": 2, "Next.js": 2, 
  "Python": 3, "Go": 1, "AWS": 1, "Docker": 1, "Kubernetes": 1,
  "PostgreSQL": 2, "Redis": 1, "Tailwind CSS": 3, "GSAP": 1, "Three.js": 1,
  "REST APIs": 3, "Redux": 2, "Mongoose": 2, "Prisma": 1, "CI/CD": 1, "Git": 3
};

const getExperience = (skill) => {
  const years = skillExperience[skill] || 2;
  return `${years} Year${years > 1 ? 's' : ''} Experience`;
};

export default function Skills() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const [tween, setTween] = useState(null);

  useGSAP(() => {
    const groups = gsap.utils.toArray(`.${styles.skillGroup}`);
    
    groups.forEach((group) => {
      gsap.from(group, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
        }
      });
    });

    // Infinite Marquee Animation
    if (marqueeRef.current) {
      const t = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 80, // Much slower
        repeat: -1,
      });
      setTween(t);
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section" id="skills">
      
      {/* Massive Full-Width Tech Marquee */}
      <div 
        className={styles.marqueeContainer}
        onMouseEnter={() => tween && tween.pause()}
        onMouseLeave={() => tween && tween.play()}
      >
        <div className={styles.marqueeTrack} ref={marqueeRef}>
          {/* Content duplicated twice for seamless loop */}
          <div className={styles.marqueeContent}>
            {ALL_SKILLS.map((skill, idx) => (
              <span key={`loop1-${idx}`} title={getExperience(skill)} style={{cursor: 'pointer'}}>
                {skill} <span className={styles.star}>✦</span>
              </span>
            ))}
          </div>
          <div className={styles.marqueeContent}>
            {ALL_SKILLS.map((skill, idx) => (
              <span key={`loop2-${idx}`} title={getExperience(skill)} style={{cursor: 'pointer'}}>
                {skill} <span className={styles.star}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.container} container`}>
        <div className={styles.leftCol}>
          <h2 className={styles.heading}>Technical Arsenal</h2>
          <p className={styles.desc}>
            Tools I've picked up, broken, and learned to trust over time.
          </p>
        </div>
        
        <div className={styles.rightCol}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillGroup}>
              <h4 className={styles.categoryLabel}>{category}</h4>
              <div className={styles.pillContainer}>
                {items.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className={styles.skillPill}
                    title={getExperience(skill)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
