import styles from "@/styles/Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.title}>Get In Touch</h2>
      <p className={styles.text}>
        Let’s build something great together. Reach out via email or connect with me
        on socials.
      </p>

      <div className={styles.links}>
        <a href="mailto:praiseoke.dev@gmail.com" className={styles.btn}>
          Email Me
        </a>
        <a href="https://github.com/1JOAT" target="_blank" rel="noopener" className={styles.btn}>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/praise-oke-673a7823a/" target="_blank" rel="noopener" className={styles.btn}>
          LinkedIn
        </a>
      </div>
    </section>
  );
}
