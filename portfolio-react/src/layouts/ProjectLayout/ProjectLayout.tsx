import { Outlet } from 'react-router-dom';
import styles from './ProjectLayout.module.css';

export default function ProjectLayout() {
  return (
    <main>
      <div className={`${styles.content} ibmplex gradient-sky-bg min-vh-100`}>
        <Outlet />
      </div>
    </main>
  );
}
