import { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback } from 'react';
import { TechsModel } from '../../../types';

export interface DemoModalHandle {
  showDemoModal: (project: TechsModel) => void;
}

const DemoModal = forwardRef<DemoModalHandle>((_, ref) => {
  const [selectedProject, setSelectedProject] = useState<TechsModel | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    showDemoModal: (project: TechsModel) => {
      setSelectedProject(project);
      setIsVisible(true);
    },
  }));

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setSelectedProject(null);
  }, []);

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

  return (
    <div
      className="modal fade"
      id="projectdemo"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {selectedProject?.project}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>
          <div className="modal-body">
            {selectedProject?.demoUrl && (
              <iframe
                src={selectedProject.demoUrl}
                title="Project Demo"
                style={{ width: '100%', height: '60vh', border: 'none' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

DemoModal.displayName = 'DemoModal';

export default DemoModal;
