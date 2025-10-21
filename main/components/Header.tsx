'use client';

import { useState, useEffect } from 'react';
import data from "@/data/data.json";
import { useTheme } from "@/lib/theme-context";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const { personal, navigation } = data;
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navigation.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigation]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <a href="#home" className={styles.logoLink}>
              <span className={styles.logoText}>{personal.nickname}</span>
              <div className={styles.logoGlow}></div>
            </a>
          </div>

          <nav className={styles.nav}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.href.substring(1) ? styles.active : ''}`}
              >
                <span>{item.name}</span>
                <div className={styles.navUnderline}></div>
              </a>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <button
              className={`${styles.themeToggle} ${theme === 'dark' ? styles.dark : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <div className={styles.themeIcon}>
                {theme === 'dark' ? (
                  <svg className={styles.sunIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                ) : (
                  <svg className={styles.moonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </div>
              <div className={styles.themeGlow}></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
