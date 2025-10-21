'use client';

import { useState, useRef, useEffect } from 'react';
import data from "@/data/data.json";
import styles from "@/styles/Projects.module.css";

export default function Projects() {
  const { projects } = data;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getMousePosition = (index: number) => {
    if (!hoveredCard || hoveredCard !== projects[index].id) return { x: 0, y: 0 };

    const card = cardRefs.current[index];
    if (!card) return { x: 0, y: 0 };

    const rect = card.getBoundingClientRect();
    return {
      x: ((mousePosition.x - rect.left) / rect.width) * 100,
      y: ((mousePosition.y - rect.top) / rect.height) * 100,
    };
  };

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${styles.title}`}>
            <span className={styles.titleMain}>Featured Projects</span>
            <span className={styles.titleBg}>Projects</span>
          </h2>
          <p className="section-subtitle">Some of my recent work</p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => {
            const mousePos = getMousePosition(index);
            const isHovered = hoveredCard === project.id;

            return (
              <div
                key={project.id}
                ref={(el) => { if (el) cardRefs.current[index] = el; }}
                className={`${styles.projectCard} ${isHovered ? styles.hovered : ''}`}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${-(mousePos.y - 50) / 10}deg) rotateY(${(mousePos.x - 50) / 10}deg) translateZ(20px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                }}
              >
                <div className={styles.cardGlow}></div>
                <div className={styles.cardGradient}></div>

                <div className={styles.projectContent}>
                  <div className={styles.projectHeader}>
                    <div className={styles.projectIcon}>
                      {project.type === 'github' ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      )}
                    </div>
                    <div className={styles.projectBadge}>
                      <span>{project.type === 'github' ? 'Open Source' : 'Live Demo'}</span>
                    </div>
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.projectFooter}>
                    <div className={styles.projectStats}>
                      <div className={styles.stat}>
                        <span className={styles.statValue}>✨</span>
                        <span className={styles.statLabel}>Featured</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statValue}>🚀</span>
                        <span className={styles.statLabel}>Active</span>
                      </div>
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener"
                      className={`${styles.projectBtn} ${isHovered ? styles.btnHovered : ''}`}
                    >
                      <span>
                        {project.type === 'github' ? 'View Code' : 'View Project'}
                      </span>
                      <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7"/>
                        <path d="M7 7h10v10"/>
                      </svg>
                      <div className={styles.btnRipple}></div>
                    </a>
                  </div>
                </div>

                <div className={styles.cardReflection}></div>
                <div className={styles.cardParticles}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.particle}
                      style={{
                        left: `${20 + i * 15}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
