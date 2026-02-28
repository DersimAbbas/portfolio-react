import { useRef, useEffect } from 'react';
import { useProjects } from '../../hooks/useTechs';
import ProjectCard from '../../components/cards/ProjectCard/ProjectCard';
import DemoModal, {
  DemoModalHandle,
} from '../../components/modals/DemoModal/DemoModal';
import NavigateButtons from '../../components/common/NavigateButtons/NavigateButtons';
import DevOpsTerminal from '../../components/common/DevOpsTerminal/DevOpsTerminal';
import { TechsModel } from '../../types';
import styles from './Projects.module.css';

export default function Projects() {
  const demoModalRef = useRef<DemoModalHandle>(null);
  const cloudsLoaded = useRef(false);

  const { data: projects = [] } = useProjects();

  // Load cloud.js particles
  useEffect(() => {
    if (cloudsLoaded.current) return;
    cloudsLoaded.current = true;

    const loadClouds = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const particlesJS = (window as any).particlesJS;
      if (particlesJS) {
        particlesJS.load('cloud-js', '/cloud.json', () => {
          console.log('Cloud particles loaded');
        });
      }
    };

    setTimeout(loadClouds, 100);
  }, []);

  const handleDemoClicked = (skill: TechsModel) => {
    demoModalRef.current?.showDemoModal(skill);
  };

  // Filter to only show projects
  const filteredProjects = projects.filter((s) => s.project !== null);

  return (
    <>
      <div id="cloud-js" className={styles.cloudBg}></div>

      <DemoModal ref={demoModalRef} />

      <div
        className="container-fluid p-5"
        style={{ zIndex: 200, position: 'relative' }}
      >
        <div className="text-center mb-4">
          <h2>My Projects since my DevOps journey began</h2>
          <p className="fs-4">
            From 2024/08/20 - {new Date().toISOString().split('T')[0]}
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="row row-cols-auto row-cols-md-1 row-cols-lg-3 g-3 gap-3 d-flex justify-content-center mx-auto"
          style={{ maxWidth: '1500px' }}
        >
          {filteredProjects.map((skill) => (
            <div key={skill.id} className="col px-2">
              <ProjectCard skill={skill} onDemoClicked={handleDemoClicked} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center mt-3 mb-5">
        <NavigateButtons />
      </div>

      <DevOpsTerminal />
    </>
  );
}
