import { Link, useLocation } from 'react-router-dom';

export default function NavigateButtons() {
  const location = useLocation();
  const currentRoute = location.pathname.toLowerCase().replace(/^\//, '');

  return (
    <>
      {currentRoute !== 'projects' && (
        <Link to="/projects" className="btn btn-outline-success btn-lg">
          Projects
        </Link>
      )}
      {currentRoute !== 'skills' && (
        <Link to="/skills" className="btn btn-outline-success btn-lg">
          Skills
        </Link>
      )}
      {currentRoute !== '' && (
        <Link to="/" className="btn btn-outline-success btn-lg">
          Home
        </Link>
      )}
      {currentRoute !== 'about' && (
        <Link to="/about" className="btn btn-outline-success btn-lg">
          About
        </Link>
      )}
    </>
  );
}
