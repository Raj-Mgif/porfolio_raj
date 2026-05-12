import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './TypographyCollage.module.css';

const rowsData = [
  { text: "FULL STACK", dir: -1, style: 'primary' },
  { text: "AI/ML", dir: 1, style: 'secondary' },
  { text: "UI/UX", dir: -1, style: 'primary' },
  { text: "CLOUD", dir: 1, style: 'primary' }
];

export default function TypographyCollage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray(`.${styles.rowTrack}`);
    
    rows.forEach((row, i) => {
      const direction = rowsData[i].dir;
      gsap.to(row, {
        xPercent: direction * 40, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Smooth parallax velocity scrub!
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.collageSection} id="collage">
      <div className={styles.collageWrapper}>
        {rowsData.map((row, idx) => (
          <div key={idx} className={styles.row}>
            <div 
              className={styles.rowTrack} 
              style={{ 
                left: row.dir === 1 ? '-50%' : '0%' // Offset opposite-moving tracks so they don't start blank
              }}
            >
              {/* Duplicate items to create a very long line of text */}
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className={styles.itemBlock}>
                  <span className={styles[row.style]}>{row.text}</span>
                  <span className={styles.shapeDark}>✦</span>
                  <span className={styles.shapeLight}>✤</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
