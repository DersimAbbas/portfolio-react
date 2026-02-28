import { useState } from 'react';
import { TechsModel, getTechnologiesList, getImageList } from '../../../types';
import ProjectCarousel from '../../features/ProjectCarousel/ProjectCarousel';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  skill: TechsModel;
  isAuthorized?: boolean;
  onDemoClicked?: (skill: TechsModel) => void;
  onUpdate?: (skill: TechsModel) => void;
  onDelete?: (skill: TechsModel) => void;
}

export default function ProjectCard({
  skill,
  isAuthorized = false,
  onDemoClicked,
  onUpdate,
  onDelete,
}: ProjectCardProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedSkill, setEditedSkill] = useState({ ...skill });

  // Store original values for cancel
  const [originalSkill] = useState({ ...skill });

  const images = getImageList(skill);
  const technologies = getTechnologiesList(skill);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(editedSkill);
    }
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditedSkill({ ...originalSkill });
  };

  return (
    <div
      className={`card skill-card border border-warning bg-dark text-light rounded ${styles.projectCard}`}
      style={{ zIndex: 500 }}
    >
      {/* Carousel */}
      <ProjectCarousel images={images} carouselId={skill.id} />

      {/* Card Body */}
      <div className="card-body text-center">
        <h3 className="card-title">{skill.project}</h3>
        <p className="card-text">{skill.description}</p>
      </div>

      {/* Technologies Badges */}
      <div className="card-footer d-flex justify-content-start mx-auto">
        {technologies.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-1">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="badge bg-primary text-white text-center"
                style={{ fontSize: '13px' }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Demo and GitHub Buttons */}
      <div className="d-flex justify-content-center gap-5 mt-1">
        {skill.demoUrl && (
          <button
            className="btn btn-outline-primary"
            onClick={() => onDemoClicked?.(skill)}
            style={{ maxHeight: '35px' }}
          >
            Demo
          </button>
        )}
        {skill.githubUrl && (
          <a
            href={skill.githubUrl}
            className="btn btn-outline-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-github"></i>
          </a>
        )}
      </div>

      {/* Admin Edit Controls */}
      <div className="card-footer d-flex justify-content-start mx-auto">
        {isAuthorized && (
          <>
            {isEdit ? (
              <form onSubmit={handleUpdate}>
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={editedSkill.project || ''}
                  onChange={(e) =>
                    setEditedSkill({ ...editedSkill, project: e.target.value })
                  }
                />

                <label className="form-label">Description:</label>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={editedSkill.description || ''}
                  onChange={(e) =>
                    setEditedSkill({ ...editedSkill, description: e.target.value })
                  }
                />

                <label className="form-label">Technologies Used</label>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={editedSkill.technologies}
                  onChange={(e) =>
                    setEditedSkill({ ...editedSkill, technologies: e.target.value })
                  }
                />

                <label className="form-label">Github link</label>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={editedSkill.githubUrl || ''}
                  onChange={(e) =>
                    setEditedSkill({ ...editedSkill, githubUrl: e.target.value })
                  }
                />

                <label className="form-label">Demo link</label>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={editedSkill.demoUrl || ''}
                  onChange={(e) =>
                    setEditedSkill({ ...editedSkill, demoUrl: e.target.value })
                  }
                />

                <label className="form-label">Image url</label>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={editedSkill.image || ''}
                  onChange={(e) =>
                    setEditedSkill({ ...editedSkill, image: e.target.value })
                  }
                />

                <button type="submit" className="btn btn-success btn-sm me-1">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary btn-md text-center me-1"
                  onClick={() => setIsEdit(true)}
                  style={{ maxHeight: '30px' }}
                >
                  Toggle
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-md"
                  onClick={() => onDelete?.(skill)}
                  style={{ maxHeight: '30px' }}
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
