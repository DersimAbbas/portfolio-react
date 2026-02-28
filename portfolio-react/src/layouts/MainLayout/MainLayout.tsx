import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <main>
      <div className={`${styles.content} min-vh-100`}>
        <Outlet />
      </div>
    </main>
  );
}
