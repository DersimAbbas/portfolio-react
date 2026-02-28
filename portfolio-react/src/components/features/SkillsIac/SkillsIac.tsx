import { TechsModel } from '../../../types';
import styles from './SkillsIac.module.css';

interface SkillsIacProps {
  skills: TechsModel[];
}

export default function SkillsIac({ skills }: SkillsIacProps) {
  // Filter to only show skills (not projects)
  const filteredSkills = skills.filter((s) => s.project === null);

  return (
    <div
      className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-8 d-flex justify-content-center g-2"
      style={{ maxWidth: '1500px' }}
    >
      {filteredSkills.map((skill) => (
        <div key={skill.id} className="col">
          <div
            className="card bg-dark text-light rounded mb-1"
            style={{ maxWidth: '320px' }}
          >
            <div className="card-body">
              <pre className={styles.codeBlock}>
                <code>
                  <span className={styles.tfKeyword}>resource</span>{' '}
                  <span className={styles.tfString}>
                    "tech_skill_{skill.technologies.toLowerCase()}"
                  </span>{' '}
                  {'{'}
                  {'\n    '}
                  <span className={styles.tfProperty}>name</span>
                  {'        = '}
                  <span className={styles.tfString}>
                    "{skill.technologies}"
                  </span>
                  {'\n    '}
                  <span className={styles.tfProperty}>experience</span>
                  {'  = '}
                  <span className={styles.tfString}>
                    "{skill.techExperience}"
                  </span>
                  {'\n    '}
                  <span className={styles.tfProperty}>skill_level</span>
                  {' = '}
                  <span className={styles.tfString}>"{skill.level}"</span>
                  {'\n}'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
