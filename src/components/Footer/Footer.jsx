import React from 'react';
import styles from './Footer.module.css';
import { personal } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.topRow}>
          <h2 className={styles.name}>{personal.name.toUpperCase()}</h2>
          <div className={styles.links}>
            <a href={personal.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`mailto:${personal.email}`}>Email</a>
          </div>
        </div>
        
        <div className={styles.bottomRow}>
          <p>Built with Node.js passion &middot; {personal.location} &middot; 2026</p>
          <p>&copy; {new Date().getFullYear()} {personal.name}</p>
        </div>
      </div>
    </footer>
  );
}
