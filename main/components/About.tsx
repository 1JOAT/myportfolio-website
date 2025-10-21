import data from "@/data/data.json";
import styles from "@/styles/About.module.css";

export default function About() {
  const { about, techStack } = data;

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <div className="section-header">
              <h2 className="section-title">{about.title}</h2>
              <p className="section-subtitle">{about.subtitle}</p>
            </div>

            <div className={styles.content}>
              {about.content.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.stats}>
              {about.stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.skillsContainer}>
            <h3 className={styles.skillsTitle}>Tech Stack</h3>

            <div className={styles.techGrid}>
              {techStack.map((tech) => (
                <div key={tech} className={styles.techItem}>
                  <span className={styles.techName}>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
