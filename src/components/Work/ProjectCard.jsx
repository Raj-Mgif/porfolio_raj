import React, { useRef } from 'react';
import styles from './Work.module.css';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);

  return (
    <div ref={cardRef} className={styles.projectCard}>
      <div className={styles.cardHeader}>
        <span className={styles.projectNumber}>{project.id}</span>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <span className={styles.projectCategory}>{project.category}</span>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <p className={styles.projectDesc}>{project.description}</p>
          
          <ul className={styles.highlights}>
            {project.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          
          <div className={styles.stackWrapper}>
            {project.stack.map((tech, idx) => (
              <span key={idx} className={styles.techPill}>{tech}</span>
            ))}
          </div>
          
          <div className={styles.metricsRow}>
            <span className={styles.metricAccent}>{project.metrics.value}</span>
            <span className={styles.metricLabel}>{project.metrics.label}</span>
          </div>
          
          <div className={styles.linksRow}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                Live Site <ArrowUpRight size={16} />
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
              View Source <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        
        <div className={styles.cardImageWrapper}>
          <div className={styles.imageReveal}>
            {project.image ? (
              <img src={project.image} alt={project.title} className={styles.projectImg} />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>Project Preview</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
