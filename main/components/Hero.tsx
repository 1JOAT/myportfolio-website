import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Full Stack Developer</span>
        <h1 className={styles.title}>
          <span className={styles.name}>Praise Oke</span>
          <span className={styles.job}>Building <mark>exceptional</mark> digital experiences</span>
        </h1>
        <p className={styles.description}>
          I design and develop applications that deliver elegant solutions with cutting-edge technologies.
        </p>
        <div className={styles.cta}>
          <a href="#experience" className={styles.primaryBtn}>View My Experience</a>
          <a href="#contact" className={styles.secondaryBtn}>Get In Touch</a>
          <a href="/cv/praise-oke-cv.pdf" download className={styles.cvBtn}>
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
