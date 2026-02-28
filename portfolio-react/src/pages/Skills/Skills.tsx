import { useState, useRef, useEffect } from 'react';
import { useTechs } from '../../hooks/useTechs';
import SkillCard from '../../components/cards/SkillCard/SkillCard';
import ChartModal, {
  ChartModalHandle,
} from '../../components/modals/ChartModal/ChartModal';
import SkillsIac from '../../components/features/SkillsIac/SkillsIac';
import NavigateButtons from '../../components/common/NavigateButtons/NavigateButtons';
import DevOpsTerminal from '../../components/common/DevOpsTerminal/DevOpsTerminal';
import { TechsModel } from '../../types';
import styles from './Skills.module.css';

export default function Skills() {
  const [showIaC, setShowIaC] = useState(false);
  const chartModalRef = useRef<ChartModalHandle>(null);
  const cloudsLoaded = useRef(false);

  const { data: skills = [] } = useTechs();

  // Filter to only show skills (not projects) with skill level > 1
  const filteredSkills = skills.filter(
    (s) => s.project === null && s.skillLevel > 1
  );

  // Load cloud.js particles
  useEffect(() => {
    if (cloudsLoaded.current) return;
    cloudsLoaded.current = true;

    const loadClouds = () => {
      const particlesJS = (window as any).particlesJS;
      if (particlesJS) {
        particlesJS.load('cloud-js', '/cloud.json', () => {
          console.log('Cloud particles loaded');
        });
      }
    };

    setTimeout(loadClouds, 100);
  }, []);

  const handleSkillClick = (skill: TechsModel) => {
    chartModalRef.current?.showSkillModal(skill);
  };

  const toggleIaCView = () => {
    setShowIaC(!showIaC);
  };

  return (
    <>
      <div id="cloud-js" className={styles.cloudBg}></div>

      <ChartModal ref={chartModalRef} />

      <div
        className="container-fluid p-5"
        style={{ zIndex: 500, position: 'relative' }}
      >
        <div className="text-center">
          <h3>Technology Dashboard</h3>
          <p className="fs-4">
            Technologies acquired from 2024 -{' '}
            {new Date().toISOString().split('T')[0]}
          </p>
        </div>

        {/* Skills Grid */}
        <div
          className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-8 g-2 d-flex justify-content-start mx-auto"
          style={{ maxWidth: '1000px' }}
        >
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="col pb-2">
              <SkillCard skill={skill} onSkillClicked={handleSkillClick} />
            </div>
          ))}
        </div>

        {/* IaC View */}
        <div className="d-flex justify-content-center">
          {showIaC && <SkillsIac skills={skills} />}
        </div>

        {/* Toggle IaC Button */}
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-warning m-5"
            style={{ zIndex: 10 }}
            onClick={toggleIaCView}
          >
            Show skills As IAC
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-center gap-4 mb-2">
          <NavigateButtons />
        </div>
      </div>

      <DevOpsTerminal />
    </>
  );
}
