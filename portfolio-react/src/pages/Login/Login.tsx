import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoginDto } from '../../types';

export default function Login() {
  const [loginModel, setLoginModel] = useState<LoginDto>({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const success = await login(loginModel);
      if (success) {
        navigate('/admin');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setErrorMessage(`Login failed: ${(error as Error).message}`);
    }
  };

  return (
    <div className="container-fluid p-5">
      <h3 className="text-center">Admin Login</h3>

      <div className="d-flex justify-content-center mx-auto">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={loginModel.username}
              onChange={(e) =>
                setLoginModel((prev) => ({ ...prev, username: e.target.value }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={loginModel.password}
              onChange={(e) =>
                setLoginModel((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            {errorMessage && (
              <p className="text-danger text-center mt-2">{errorMessage}</p>
            )}
          </div>

          <div className="m-5 px-5">
            <button type="submit" className="btn btn-success">
              Authenticate
            </button>
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-center mt-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/')}
          style={{ zIndex: 20 }}
        >
          Home Page
        </button>
      </div>
    </div>
  );
}
