import data from "@/data/data.json";
import styles from "@/styles/Experience.module.css";

export default function Experience() {
  const { experience } = data;

  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>

        <div className={styles.timeline}>
          {experience.map((job, index) => (
            <div key={job.id} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineDate}>
                <span className={styles.dateStart}>{job.period.split(' - ')[0]}</span>
                <span className={styles.dateEnd}>{job.period.split(' - ')[1]}</span>
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <div className={styles.company}>{job.company}</div>
                <p className={styles.jobDescription}>{job.description}</p>
                <div className={styles.techTags}>
                  {job.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
