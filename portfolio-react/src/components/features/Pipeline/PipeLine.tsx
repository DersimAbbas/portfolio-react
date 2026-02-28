import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import { PipelineStage } from '../../../types';
import { useTerminal } from '../../../contexts/TerminalContext';
import styles from './PipeLine.module.css';

export interface PipeLineHandle {
  startPipeline: () => Promise<void>;
}

interface PipeLineProps {
  pipelineStages: PipelineStage[];
}

const PipeLine = forwardRef<PipeLineHandle, PipeLineProps>(
  ({ pipelineStages }, ref) => {
    const [stages, setStages] = useState<PipelineStage[]>(
      pipelineStages.map((s) => ({ ...s, isActive: false, showDetails: false }))
    );
    const [isRunning, setIsRunning] = useState(false);
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [currentJobStatus, setCurrentJobStatus] = useState(
      'Waiting to start pipeline...'
    );
    const [progress, setProgress] = useState(0);
    const { addLog } = useTerminal();
    const progressBarRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      startPipeline: async () => {
        // Reset pipeline state
        setStages(
          pipelineStages.map((s) => ({ ...s, isActive: false, showDetails: false }))
        );
        setCurrentJobStatus('Waiting to start pipeline...');
        setProgress(0);

        await new Promise((r) => setTimeout(r, 250));
        addLog('[INFO] Starting pipeline...');
        setIsRunning(true);
        setShowProgressBar(true);

        const stageDuration = 1500;
        const totalStages = pipelineStages.length;

        for (let i = 0; i < totalStages; i++) {
          // Activate current stage
          setStages((prev) =>
            prev.map((s, idx) => (idx === i ? { ...s, isActive: true } : s))
          );

          // Animate progress
          const targetProgress = ((i + 1) / totalStages) * 100;
          await animateProgress(targetProgress, stageDuration);
          await new Promise((r) => setTimeout(r, stageDuration));

          addLog(`[INFO] Completed stage: ${pipelineStages[i].project}`);
        }

        setCurrentJobStatus('Pipeline execution completed successfully!');
        addLog('[INFO] Build successful! All stages completed.');
        await new Promise((r) => setTimeout(r, 300));

        setShowProgressBar(false);
        setProgress(0);
        setIsRunning(false);
      },
    }));

    const animateProgress = (target: number, duration: number): Promise<void> => {
      return new Promise((resolve) => {
        const start = progress;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progressFraction = Math.min(elapsed / duration, 1);
          const currentProgress = start + (target - start) * progressFraction;

          setProgress(currentProgress);

          if (progressFraction < 1) {
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(animate);
      });
    };

    const toggleDetails = (stageId: string) => {
      setStages((prev) =>
        prev.map((s) =>
          s.id === stageId ? { ...s, showDetails: !s.showDetails } : s
        )
      );
    };

    const sortedStages = [...stages].sort((a, b) => a.order - b.order);

    if (!pipelineStages || pipelineStages.length === 0) {
      return <p>No pipeline stages available.</p>;
    }

    return (
      <div>
        {/* Pipeline Stages */}
        <div className="stages d-flex flex-wrap justify-content-center align-items-center">
          {sortedStages.map((stage, idx) => (
            <div key={stage.id} className="d-flex align-items-center">
              <div
                className={`${styles.stageCard} mx-3 text-center ${
                  stage.isActive ? styles.activeStage : ''
                }`}
                style={{ position: 'relative' }}
              >
                <h5>{stage.project}</h5>
                <p>{stage.description}</p>
                <button
                  className="btn btn-link"
                  onClick={() => toggleDetails(stage.id)}
                >
                  {stage.showDetails ? 'Hide' : 'Read More'}
                </button>
                {stage.showDetails && (
                  <div className="stage-details mt-2 p-2 border rounded">
                    <p>{stage.details}</p>
                  </div>
                )}
              </div>
              {/* Connector line between stages */}
              {isRunning && idx < sortedStages.length - 1 && (
                <div className={styles.stageConnector}></div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {showProgressBar ? (
          <div className="d-flex justify-content-center mt-3">
            <div className="progress" style={{ height: '24px', width: '50%' }}>
              <div
                ref={progressBarRef}
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ) : (
          <div className="progress-label text-center pt-3">
            <h5>{currentJobStatus}</h5>
          </div>
        )}
      </div>
    );
  }
);

PipeLine.displayName = 'PipeLine';

export default PipeLine;
