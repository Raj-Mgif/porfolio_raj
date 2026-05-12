import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Achievement.module.css';
import { achievement } from '../../data/portfolio';

export default function Achievement() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`section section-dark ${styles.achievementSection}`}>
      <div className={`${styles.container} container`}>
        <div className={styles.bgNumber}>{achievement.year}</div>
        
        <div className={styles.content}>
          <span className="label">ACHIEVEMENT</span>
          <h2 className={styles.heading}>
            {achievement.name} <br />
            <span className={styles.accentText}>{achievement.result}</span>
          </h2>
          
          <div className={styles.detailsRow}>
            <span>{achievement.role}</span>
            <span className={styles.dot}>&middot;</span>
            <span>{achievement.teamSize}-Member Team</span>
            <span className={styles.dot}>&middot;</span>
            <span>{achievement.duration}</span>
          </div>
          
          <p className={styles.desc}>{achievement.description}</p>
        </div>
      </div>
    </section>
  );
}
