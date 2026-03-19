import { useEffect, useRef } from 'react';
import NavigateButtons from '../../components/common/NavigateButtons/NavigateButtons';
import DevOpsTerminal from '../../components/common/DevOpsTerminal/DevOpsTerminal';
import styles from './Home.module.css';

export default function Home() {
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const particlesLoaded = useRef(false);

  // Typewriter effect
  useEffect(() => {
    const text =
      'Empowering Continuous Delivery, Automation, and Cloud Scalability with Modern DevOps Practices.';
    const element = typewriterRef.current;
    if (!element) return;

    element.innerHTML = '';
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const typeNext = () => {
      if (cancelled) return;
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        timeoutId = setTimeout(typeNext, 40);
      }
    };

    // Start with a small delay
    timeoutId = setTimeout(typeNext, 250);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  // Load particles.js
  useEffect(() => {
    if (particlesLoaded.current) return;
    particlesLoaded.current = true;

    const loadParticles = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const particlesJS = (window as any).particlesJS;
      if (particlesJS) {
        particlesJS.load('particles-js', '/particles.json', () => {
          console.log('Particles.js loaded');
        });
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(loadParticles, 100);
  }, []);

  return (
    <>
      <div id="particles-js" className={styles.particles}></div>

      <div
        className="container-fluid pt-5 text-white text-center"
        style={{ zIndex: 500, position: 'relative' }}
      >
        <div className="d-flex flex-column align-items-center">
          {/* Profile Image */}
          <img
            src="/images/Dersim2_converted.webp"
            crossOrigin="anonymous"
            className={`rounded-circle animate__animated animate__fadeInLeft m-3 m-md-5 ${styles.profileImage}`}
            alt="Dersim Abbas Profile"
            style={{ maxWidth: '250px' }}
          />

          {/* Social Links */}
          <div
            className="d-flex justify-content-center gap-4"
            style={{ zIndex: 500 }}
          >
            <a
              className="link-info fs-2"
              href="https://www.linkedin.com/in/dersimabbas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin link-primary"></i>
            </a>
            <a
              className="link-info fs-2"
              href="https://www.github.com/dersimabbas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github link-light"></i>
            </a>
            <a
              className="link-info fs-2"
              href="mailto:dersim.abbas99@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-envelope-at link-light"></i>
            </a>
          </div>

          {/* Title */}
          <p className="display-6 text-light">
            Hi! I'm Dersim Abbas - Cloud / DevOps Engineer
          </p>

          {/* Typewriter Tagline */}
          <p
            ref={typewriterRef}
            className={`${styles.typewriterText} text-break fs-4`}
            id="typewriter"
          ></p>

          {/* Description */}
          <p className="mb-4 fs-4 text-light">
            From CI/CD pipelines to Infrastructure as Code
            <br />
            I help bridge the gap between Development and Operations.
          </p>
          <p className="card-text text-light fs-4 firacode">
            I thrive on solving complex problems and automating workflows
            building -<br />
            scalable cloud environments and robust CI/CD pipelines.
          </p>
          <p className="card-text text-light fs-5">
            When I'm not immersed in DevOps, I enjoy playing the piano and
            exploring creative tech projects.
            <br />
            For more Information use the built in{' '}
            <strong className="text-success">Terminal</strong> or the buttons
            below.
          </p>

          {/* Navigation Buttons */}
          <div
            className="p-2 d-flex flex-wrap justify-content-center gap-2"
            style={{ zIndex: 50 }}
          >
            <NavigateButtons />
          </div>
        </div>
      </div>

      <DevOpsTerminal />
    </>
  );
}
