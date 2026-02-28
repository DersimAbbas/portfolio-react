import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  useTechs,
  useAddTech,
  useUpdateTech,
  useDeleteTech,
} from '../../../hooks/useTechs';
import SkillCard from '../../../components/cards/SkillCard/SkillCard';
import { TechsModel } from '../../../types';
import styles from './AdminSkills.module.css';

export default function AdminSkills() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const cloudsLoaded = useRef(false);

  const { data: skills = [] } = useTechs();
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

  const handleAddSkill = async () => {
    const newSkill: Partial<TechsModel> = {
      technologies: 'New Technology',
      techExperience: '0 years',
      skillLevel: 1,
      image: 'favicon.png',
      level: 'Beginner',
    };
    await addTech.mutateAsync(newSkill);
  };

  const handleUpdateSkill = async (skill: TechsModel) => {
    await updateTech.mutateAsync(skill);
  };

  const handleDeleteSkill = async (id: string) => {
    await deleteTech.mutateAsync(id);
  };

  // Filter to show only skills (not projects)
  const filteredSkills = skills.filter((s) => s.project === null);

  return (
    <>
      <div id="cloud-js" className={styles.cloudBg}></div>

      <div
        className="container-fluid p-5"
        style={{ zIndex: 500, position: 'relative' }}
      >
        <div className="text-center">
          <h3>Skills Dashboard</h3>
          <p className="fs-4 fw-semibold">Manage Skills Here</p>
          <button
            className="btn btn-success m-2"
            onClick={() => navigate('/admin')}
          >
            Go back
          </button>
        </div>

        {/* Skills Grid */}
        <div
          className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-8 g-2 d-flex justify-content-start mx-auto"
          style={{ maxWidth: '1000px' }}
        >
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="col pb-2">
              <SkillCard
                skill={skill}
                isAuthorized={true}
                onSkillUpdate={handleUpdateSkill}
                onDelete={handleDeleteSkill}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add Skill Button */}
      <div className="d-flex justify-content-center" style={{ zIndex: 55 }}>
        <button
          className="btn btn-success border-bg-success"
          onClick={handleAddSkill}
        >
          Add skill
        </button>
      </div>
    </>
  );
}
