import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Roles.module.css';

import imgFullstack from '../../assets/role_fullstack.png';
import imgCloud from '../../assets/role_cloud.png';
import imgSaas from '../../assets/role_saas.png';
import imgUiux from '../../assets/role_uiux.png';

const rolesData = [
  {
    title: "Full Stack\nDevelopment",
    desc: "I build end-to-end web applications, from user-facing interfaces to backend systems that handle real traffic. My focus is clean architecture, predictable APIs, and code that's easy to maintain long after launch.",
    img: imgFullstack,
  },
  {
    title: "Cloud Infra-\nArchitecture",
    desc: "I design cloud setups that are secure, scalable, and cost-aware. From deployments to monitoring, I focus on systems that stay reliable under pressure and boring in the best way possible.",
    img: imgCloud,
  },
  {
    title: "SaaS Platform\nDevelopment",
    desc: "I help turn products into platforms; handling authentication, subscriptions, role-based access, and scalable data models. Built for growth, not rewrites every six months.",
    img: imgSaas,
  },
  {
    title: "UI / UX\nEngineering",
    desc: "I design interfaces that feel intuitive without being loud. Every interaction is intentional built with accessibility, responsiveness, and performance in mind, so users don't have to think about how things work.",
    img: imgUiux,
  }
];

export default function Roles() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray(`.${styles.roleRow}`);
    
    rows.forEach((row, i) => {
      // Horizontal animation from right to left as requested
      gsap.from(row, {
        x: 150,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={`section ${styles.rolesSection}`} id="roles">
      <div className="container">
        {rolesData.map((role, idx) => (
          <div key={idx} className={styles.roleRow}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>{role.title}</h2>
              <p className={styles.desc}>{role.desc}</p>
            </div>
            <div className={styles.imageContent}>
              <img src={role.img} alt={role.title.replace('\n', ' ')} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
