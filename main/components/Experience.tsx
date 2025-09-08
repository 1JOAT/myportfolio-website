import styles from "@/styles/Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <h2 className={styles.title}>Work Experience</h2>
      <div className={styles.timeline}>
        <div className={styles.item}>
          <span className={styles.date}>May 2025 – Present</span>
          <h3>Software Engineer — Marketsmate Enterprise</h3>
          <p>
            Building innovative software solutions with React, Next.js, and Paystack
            integrations.
          </p>
        </div>

        <div className={styles.item}>
          <span className={styles.date}>2023 – May 2025</span>
          <h3>Software Developer — Landcraft</h3>
          <p>
            Worked on scalable applications, team leadership, and advanced
            optimization algorithms.
          </p>
        </div>

        <div className={styles.item}>
          <span className={styles.date}>2024 – Present</span>
          <h3>Software Developer — Infinity Forex Academy</h3>
          <p>
            Contributed to multiple websites focusing on frontend & backend
            integration. Optimized database queries.
          </p>
        </div>
      </div>
    </section>
  );
}
