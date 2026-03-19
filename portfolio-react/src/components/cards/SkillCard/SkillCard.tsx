import { useState } from 'react';
import { TechsModel } from '../../../types';
import { getTechBackgroundClass } from '../../../utils/techColorMap';
import { getTechCategory } from '../../../utils/techCategoryMap';
import styles from './SkillCard.module.css';

interface SkillCardProps {
  skill: TechsModel;
  isAuthorized?: boolean;
  onSkillClicked?: (skill: TechsModel) => void;
  onSkillUpdate?: (skill: TechsModel) => void;
  onDelete?: (id: string) => void;
}

export default function SkillCard({
  skill,
  isAuthorized = false,
  onSkillClicked,
  onSkillUpdate,
  onDelete,
}: SkillCardProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedSkill, setEditedSkill] = useState({ ...skill });

  // Store original values for cancel
  const [originalSkill] = useState({ ...skill });

  const bgClass = getTechBackgroundClass(skill.technologies);

  const handleCardClick = () => {
    if (!isEdit && onSkillClicked) {
      onSkillClicked(skill);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSkillUpdate) {
      onSkillUpdate(editedSkill);
    }
    setIsEdit(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEdit(false);
    setEditedSkill({ ...originalSkill });
  };

  const handleToggleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(skill.id);
    }
  };

  return (
    <div
      className={`card skill-card border border-secondary shadow-sm ${bgClass} text-light rounded ${styles.skillCard}`}
      style={{ zIndex: 500 }}
      onClick={handleCardClick}
    >
      {/* Card Header */}
      <div className="card-header d-flex justify-content-between text-dark">
        <h5 className="fw-bold">{skill.technologies}</h5>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <span className="badge fs-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', color: '#fff' }}>{getTechCategory(skill.technologies)}</span>
      </div>

      {/* Card Footer */}
      <div className="card-footer border-0">
        {isAuthorized && (
          <>
            {isEdit ? (
              <form onSubmit={handleUpdate} onClick={(e) => e.stopPropagation()}>
                <div>
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Tech Name"
                    value={editedSkill.technologies}
                    onChange={(e) =>
                      setEditedSkill({ ...editedSkill, technologies: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Experience"
                    value={editedSkill.techExperience || ''}
                    onChange={(e) =>
                      setEditedSkill({ ...editedSkill, techExperience: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mb-1"
                    placeholder="Skill Level"
                    value={editedSkill.skillLevel}
                    onChange={(e) =>
                      setEditedSkill({
                        ...editedSkill,
                        skillLevel: Number(e.target.value),
                      })
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Image"
                    value={editedSkill.image || ''}
                    onChange={(e) =>
                      setEditedSkill({ ...editedSkill, image: e.target.value })
                    }
                  />
                </div>
                <div>
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
                </div>
              </form>
            ) : (
              <div className="d-flex justify-content-center mx-auto">
                <button
                  type="button"
                  className="btn btn-primary btn-sm me-1"
                  onClick={handleToggleEdit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
