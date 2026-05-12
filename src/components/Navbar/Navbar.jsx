import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '#about' },
    { name: 'Work', path: '#work' },
    { name: 'Skills', path: '#skills' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <div className={styles.logo}>
          <Link to="/">Raj Mishra</Link>
        </div>

        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className={styles.hireBtn}>
            Hire Me &rarr;
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#contact" 
              className={styles.mobileHireBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              Hire Me &rarr;
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
