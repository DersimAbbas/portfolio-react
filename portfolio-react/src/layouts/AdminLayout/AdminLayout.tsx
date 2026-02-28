import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <main>
      <div className={`${styles.adminContent} gradient-sky-bg min-vh-100`}>
        <Outlet />
      </div>
    </main>
  );
}
