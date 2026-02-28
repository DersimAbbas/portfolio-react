import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  useProjects,
  useAddTech,
  useUpdateTech,
  useDeleteTech,
} from '../../../hooks/useTechs';
import ProjectCard from '../../../components/cards/ProjectCard/ProjectCard';
import { TechsModel } from '../../../types';
import styles from './AdminProjects.module.css';

export default function AdminProjects() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const cloudsLoaded = useRef(false);

  const { data: projects = [] } = useProjects();
  const addTech = useAddTech();
  const updateTech = useUpdateTech();
  const deleteTech = useDeleteTech();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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

  const handleAddProject = async () => {
    const newProject: Partial<TechsModel> = {
      project: 'New Project',
      technologies: 'New Technology, skill1, skill2, skill3',
      githubUrl: 'https://github.com/example',
      image: 'favicon.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      techExperience: '0 months',
      skillLevel: 1,
      level: 'Beginner',
    };
    await addTech.mutateAsync(newProject);
  };

  const handleUpdateProject = async (project: TechsModel) => {
    await updateTech.mutateAsync(project);
  };

  const handleDeleteProject = async (project: TechsModel) => {
    await deleteTech.mutateAsync(project.id);
  };

  // Filter to show only projects
  const filteredProjects = projects.filter((s) => s.project !== null);

  return (
    <>
      <div id="cloud-js" className={styles.cloudBg}></div>

      <div
        className="container-fluid p-5"
        style={{ zIndex: 500, position: 'relative' }}
      >
        <div className="text-center fw-semibold">
          <h2>Projects Dashboard</h2>
          <p className="fs-4">Manage your projects</p>
          <button
            className="btn btn-success m-2"
            onClick={() => navigate('/admin')}
          >
            Go back
          </button>
        </div>

        {/* Projects Grid */}
        <div
          className="row row-cols-auto row-cols-md-1 row-cols-lg-2 g-3 d-flex justify-content-start mx-auto"
          style={{ maxWidth: '1000px' }}
        >
          {filteredProjects.map((skill) => (
            <div key={skill.id} className="col px-2">
              <ProjectCard
                skill={skill}
                isAuthorized={true}
                onUpdate={handleUpdateProject}
                onDelete={handleDeleteProject}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Button */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleAddProject}>
          Add Project
        </button>
      </div>
    </>
  );
}
