import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Work.module.css';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/portfolio';

export default function Work() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Clip-path section reveal
    gsap.from(sectionRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
      }
    });

    // Project cards stagger reveal
    const cards = gsap.utils.toArray(`.${styles.projectCard}`);
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`section section-dark ${styles.workSection}`} id="work">
      <div className="container">
        <div className={styles.header}>
          <span className="label">SELECTED WORK</span>
          <h2 className={styles.heading}>What I've Built</h2>
        </div>
        
        <div className={styles.projectsList}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
