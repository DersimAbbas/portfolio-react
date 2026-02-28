import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TechsModel } from '../../../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface ChartModalHandle {
  showSkillModal: (skill: TechsModel) => void;
}

interface ChartModalProps {
  onCloseModal?: () => void;
}

const ChartModal = forwardRef<ChartModalHandle, ChartModalProps>(
  ({ onCloseModal }, ref) => {
    const [selectedSkill, setSelectedSkill] = useState<TechsModel | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      showSkillModal: (skill: TechsModel) => {
        setSelectedSkill(skill);
        setIsVisible(true);
      },
    }));

    const handleClose = useCallback(() => {
      setIsVisible(false);
      setSelectedSkill(null);
      onCloseModal?.();
    }, [onCloseModal]);

    // Handle Bootstrap modal via vanilla JS
    useEffect(() => {
      if (isVisible && modalRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bootstrap = (window as unknown as { bootstrap: any }).bootstrap;
        if (bootstrap) {
          const modal = new bootstrap.Modal(modalRef.current);
          modal.show();

          // Listen for modal hidden event
          modalRef.current.addEventListener('hidden.bs.modal', handleClose);
        }
      }
    }, [isVisible, handleClose]);

    const buildChartData = () => {
      if (!selectedSkill) {
        return { labels: [], datasets: [] };
      }

      // Extract months from experience string (e.g., "12 months" -> 12)
      const experienceMonths =
        parseInt(selectedSkill.techExperience.replace(/\D/g, ''), 10) || 1;

      const labels: string[] = [];
      const skillValues: number[] = [];

      for (let i = 1; i <= experienceMonths; i++) {
        labels.push(`${i} Month${i > 1 ? 's' : ''}`);

        let level: number;
        if (experienceMonths === 1) {
          level = selectedSkill.skillLevel;
        } else {
          // Linear interpolation: month 1 is level 1, final month is skillLevel
          level =
            1 +
            ((selectedSkill.skillLevel - 1) * (i - 1)) / (experienceMonths - 1);
        }
        skillValues.push(level);
      }

      return {
        labels,
        datasets: [
          {
            label: selectedSkill.technologies,
            data: skillValues,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            pointRadius: 5,
            pointHoverRadius: 8,
            tension: 0.1,
          },
        ],
      };
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: selectedSkill
            ? `${selectedSkill.technologies} Skill Progress`
            : '',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Experience Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Skill Level',
          },
          min: 0,
          max: 10,
        },
      },
    };

    return (
      <div
        className="modal fade"
        id="skillprogress"
        tabIndex={-1}
        aria-hidden="true"
        aria-labelledby="skillprogressLabel"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content text-white">
            <div className="modal-header text-center">
              <h5 className="modal-title text-dark fw-bold text-center">
                Total Progress For Skill {selectedSkill?.technologies}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
              />
            </div>
            <div
              className="modal-body"
              style={{ maxWidth: '800px', minWidth: '320px' }}
            >
              {selectedSkill && (
                <Line data={buildChartData()} options={chartOptions} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ChartModal.displayName = 'ChartModal';

export default ChartModal;
