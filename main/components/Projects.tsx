import styles from "@/styles/Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.title}>Featured Projects</h2>

      <div className={styles.project}>
        <h3>EtherLens — Web3 Smart Wallet Analytics</h3>
        <p>
          Transforms raw on-chain data into digestible insights for users & traders.
          Real-time wallet analytics with actionable metrics.
        </p>
        <a
          href="https://the-ether-lens.vercel.app/"
          target="_blank"
          rel="noopener"
          className={styles.btn}
        >
          View Project
        </a>
      </div>

      <div className={styles.project}>
        <h3>Chatz — AI-Native Chat Platform</h3>
        <p>
          Conversational MVP with Retrieval-Augmented Generation (RAG) and Qdrant.
          Context-aware chatting & hyper-realistic TTS.
        </p>
        <a
          href="https://chatz-frontend.onrender.com/"
          target="_blank"
          rel="noopener"
          className={styles.btn}
        >
          View Project
        </a>
      </div>

      <div className={styles.project}>
        <h3>TabZen — Smart Tab Management</h3>
        <p>
          A Chrome extension that makes tab management effortless with intelligent
          organization and sleek UI.
        </p>
        <a
          href="https://github.com/1JOAT/tabzen-extension"
          target="_blank"
          rel="noopener"
          className={styles.btn}
        >
          View on GitHub
        </a>
      </div>
    </section>
  );
}
