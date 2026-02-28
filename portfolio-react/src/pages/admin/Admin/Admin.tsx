import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Admin.module.css';

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const cloudsLoaded = useRef(false);
  const weatherLoaded = useRef(false);

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

  // Load OpenWeatherMap widget
  useEffect(() => {
    if (weatherLoaded.current || !isAuthenticated) return;
    weatherLoaded.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (!win.myWidgetParam) {
      win.myWidgetParam = [];
    }
    win.myWidgetParam.push({
      id: 15,
      cityid: '2711537',
      appid: '5f547e530c9e01e06ac39e2efeab164c',
      units: 'metric',
      containerid: 'openweathermap-widget-15',
    });

    const script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src =
      '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
    document.body.appendChild(script);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <p>Loading..</p>;
  }

  return (
    <>
      <div
        className="container-fluid p-5"
        style={{ zIndex: 3000, position: 'relative' }}
      >
        <div className="text-center text-dark fw-bold">
          <h1>Admin Page</h1>
          <p className="fs-5">
            Welcome to the Admin Panel! now do whatever you want king.
          </p>
          <h3>Todays Weather</h3>
        </div>

        {/* Weather Widget */}
        <div className="d-flex justify-content-center mt-3">
          <div id="openweathermap-widget-15"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-center mt-3 gap-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate('skills')}
          >
            Manage Skills
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate('projects')}
          >
            Manage Projects
          </button>
        </div>

        {/* Logout Button */}
        <div className="d-flex justify-content-center m-5">
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div id="cloud-js" className={styles.cloudBg}></div>
    </>
  );
}
