import styles from "@/styles/About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.title}>About Me</h2>
      <p>
        I'm Praise Oke, aka JOAT — a passionate full stack developer with expertise in
        building modern web & mobile applications. My focus is creating experiences
        that balance performance, scalability, and creativity.
      </p>

      <div className={styles.stats}>
        <div>
          <span className={styles.value}>3+</span>
          <span className={styles.label}>Years Experience</span>
        </div>
        <div>
          <span className={styles.value}>15+</span>
          <span className={styles.label}>Projects</span>
        </div>
        <div>
          <span className={styles.value}>9+</span>
          <span className={styles.label}>Happy Clients</span>
        </div>
      </div>
    </section>
  );
}
