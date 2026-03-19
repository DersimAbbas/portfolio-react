import { useState, useRef } from 'react';
import { usePipelineStages } from '../../hooks/useTechs';
import PipeLine, {
  PipeLineHandle,
} from '../../components/features/Pipeline/Pipeline';
import NavigateButtons from '../../components/common/NavigateButtons/NavigateButtons';
import DevOpsTerminal from '../../components/common/DevOpsTerminal/DevOpsTerminal';
import styles from './About.module.css';

export default function About() {
  const [show, setShow] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const pipelineRef = useRef<PipeLineHandle>(null);

  const { data: stages = [] } = usePipelineStages();

  const handlePipeline = async () => {
    setShow(false);
    setShow(true);
    setIsRunning(true);
    await new Promise((r) => setTimeout(r, 50));
    await pipelineRef.current?.startPipeline();
    setIsRunning(false);
  };

  return (
    <>
      <img
        src="/images/Devopsbackground.png"
        className={styles.infinityImage}
        alt="devops-background"
      />

      <div className="container-fluid p-5">
        <h1 className="text-center">About Me</h1>
        <p className="text-center fs-4">
          Some background information about my journey...
        </p>

        {/* Pipeline Component */}
        {show && stages.length > 0 && (
          <div className="my-5" style={{ zIndex: 500 }}>
            <PipeLine ref={pipelineRef} pipelineStages={stages} />
          </div>
        )}

        {/* Start Pipeline Button */}
        <div className="d-flex justify-content-center mt-5">
          <div className="mx-auto" style={{ zIndex: 500 }}>
            <button
              className="btn btn-success"
              onClick={handlePipeline}
              disabled={isRunning}
            >
              Start Pipeline
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex flex-wrap justify-content-center mt-5 gap-3 pb-5" style={{ zIndex: 500 }}>
        <NavigateButtons />
      </div>

      <DevOpsTerminal />
    </>
  );
}
