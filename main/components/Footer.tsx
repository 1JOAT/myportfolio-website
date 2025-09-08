import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Praise Oke (JOAT). All rights reserved.</p>
    </footer>
  );
}
